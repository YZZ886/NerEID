"use strict";
(() => {
  const config = window.CDI_CONTENT;
  const $ = id => document.getElementById(id);
  const svgIcon = name => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("viewBox", "0 0 24 24");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#icon-" + name);
    svg.append(use);
    return svg;
  };

  const fields = {title:"paper-title",subtitle:"paper-subtitle",abstract:"abstract-text",methodCaption:"method-caption"};
  for (const [key,id] of Object.entries(fields)) {
    if (config[key] && $(id) && (key !== "abstract" || !$(id).textContent.trim())) $(id).textContent = config[key];
  }
  if (config.title) document.title = config.title;
  if (config.projectName && config.title.startsWith(config.projectName + ".")) {
    const name = document.createElement("span");
    name.className = "paper-name";
    name.textContent = config.projectName;
    const dot = document.createElement("i");
    dot.textContent = ".";
    name.append(dot);
    $("paper-title").replaceChildren(name, document.createTextNode(" " + config.title.slice(config.projectName.length+1).trim()));
  }
  if (config.authorDetails) {
    $("authors").replaceChildren();
    config.authorDetails.forEach((person,index) => {
      const name = document.createElement("span");
      name.className = "author-name";
      name.textContent = person.name;
      const marker = document.createElement("sup");
      marker.textContent = person.affiliation + person.marker;
      name.append(marker);
      $("authors").append(name);
      if (index < config.authorDetails.length-1) $("authors").append(document.createTextNode(", "));
    });
  }
  if (config.methodFigure) {
    const img = document.createElement("img");
    img.src = config.methodFigure;
    img.alt = "Figure 3. NerEID method framework";
    img.loading = "lazy";
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Expand Figure 3: NerEID framework");
    $("pipeline-slot").replaceChildren(img);
    $("pipeline-slot").classList.add("has-figure");
  }

  const globalButton = $("showcase-play-toggle");
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  let wantsPlayback = !motionPreference.matches;
  const states = [...document.querySelectorAll(".showcase-example")].map(row => ({
    row, video: row.querySelector("video"), button: row.querySelector(".row-play"),
    visible: false, manuallyPaused: false, generation: 0, starting: false
  }));
  function paintRow(state) {
    const isPlaying = !state.video.paused;
    state.button.replaceChildren(svgIcon(isPlaying ? "pause" : "play"));
    const label = document.createElement("span");
    label.textContent = isPlaying ? "Pause" : "Play";
    state.button.append(label);
    state.button.setAttribute("aria-label", (isPlaying ? "Pause " : "Play ") + state.video.getAttribute("aria-label"));
    state.button.setAttribute("aria-pressed", String(isPlaying));
  }
  function paintGlobal() {
    const isPlaying = states.some(state => !state.video.paused);
    const hasVisible = states.some(state => state.visible);
    const showPause = isPlaying || (wantsPlayback && !hasVisible);
    globalButton.replaceChildren(svgIcon(showPause ? "pause" : "play"), document.createTextNode(showPause ? "Pause videos" : "Play videos"));
    globalButton.setAttribute("aria-pressed", String(showPause));
    globalButton.setAttribute("aria-label", showPause ? "Pause showcase videos" : "Play visible showcase videos");
  }
  function pause(state) {
    state.generation++;
    if (!state.video.paused) state.pauseExpected = true;
    state.video.pause();
    paintRow(state);
  }
  async function play(state) {
    if (state.starting || !state.video.paused) return;
    const generation = ++state.generation;
    state.starting = true;
    state.video.muted = true;
    try {
      await state.video.play();
      if (generation !== state.generation || document.hidden || !state.visible || !wantsPlayback || state.manuallyPaused) state.video.pause();
    } catch (_) {
      if (generation === state.generation) $("showcase-status").textContent = "Select Play to start a video.";
    } finally {
      state.starting = false;
      paintRow(state);
      paintGlobal();
    }
  }
  function reconcile() {
    states.forEach(state => {
      if (wantsPlayback && state.visible && !document.hidden && !state.manuallyPaused) play(state);
      else pause(state);
    });
    paintGlobal();
  }
  const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const state = states.find(state => state.row === entry.target);
      if (state) state.visible = entry.isIntersecting;
    });
    reconcile();
  }, {threshold: 0.08}) : null;
  states.forEach(state => {
    state.video.defaultMuted = true;
    state.video.muted = true;
    state.video.addEventListener("play", () => {
      state.manuallyPaused = false;
      wantsPlayback = true;
      paintRow(state); paintGlobal();
    });
    state.video.addEventListener("pause", () => {
      if (state.pauseExpected) state.pauseExpected = false;
      else if (state.visible && !document.hidden) state.manuallyPaused = true;
      paintRow(state); paintGlobal();
    });
    state.video.addEventListener("error", () => {
      state.row.classList.add("video-unavailable");
      $("showcase-status").textContent = "A video could not be loaded. Its preview image is still available.";
    });
    state.button.addEventListener("click", () => {
      if (!state.video.paused) {
        state.manuallyPaused = true;
        pause(state);
      } else {
        state.manuallyPaused = false;
        state.visible = true;
        wantsPlayback = true;
        play(state);
      }
      paintGlobal();
    });
    if (observer) observer.observe(state.row);
    else state.visible = true;
    paintRow(state);
  });
  globalButton.addEventListener("click", () => {
    wantsPlayback = !(states.some(state => !state.video.paused) || (wantsPlayback && !states.some(state => state.visible)));
    if (wantsPlayback) states.forEach(state => state.manuallyPaused = false);
    reconcile();
  });
  document.addEventListener("visibilitychange", reconcile);
  window.addEventListener("pagehide", () => states.forEach(pause));
  if (motionPreference.addEventListener) motionPreference.addEventListener("change", event => {
    wantsPlayback = !event.matches;
    reconcile();
  });

  const viewer = $("figure-viewer");
  const viewerImage = $("viewer-image");
  function openFigure(img, caption, title) {
    viewerImage.src = img.currentSrc || img.src;
    viewerImage.alt = img.alt;
    $("viewer-title").textContent = title;
    $("viewer-caption").textContent = caption;
    viewer.querySelector(".viewer-scroll").classList.remove("zoomed");
    $("viewer-zoom").textContent = "View at 100%";
    viewer.showModal();
  }
  document.addEventListener("click", event => {
    const button = event.target.closest(".figure-open, .showcase-open");
    if (button) {
      const figure = button.closest("figure");
      const title = button.classList.contains("showcase-open") ? button.closest("article").querySelector("h3").textContent : "Original manuscript figure";
      openFigure(button.querySelector("img"), figure.querySelector("figcaption").textContent, title);
      return;
    }
    if (event.target.matches(".paper-framework img")) openFigure(event.target, config.methodCaption, "NerEID framework");
  });
  document.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches(".paper-framework img")) {
      event.preventDefault();
      openFigure(event.target, config.methodCaption, "NerEID framework");
    }
  });
  $("viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", event => { if (event.target === viewer) viewer.close(); });
  $("viewer-zoom").addEventListener("click", () => {
    const zoomed = viewer.querySelector(".viewer-scroll").classList.toggle("zoomed");
    $("viewer-zoom").textContent = zoomed ? "Fit to window" : "View at 100%";
  });
  reconcile();
})();
