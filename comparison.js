"use strict";
(() => {
  const stage=document.getElementById("compare-stage");
  if(!stage) return;
  const range=document.getElementById("compare-slider");
  const ours=document.getElementById("comparison-ours");
  const baseline=document.getElementById("comparison-baseline");
  const toggle=document.getElementById("comparison-play-toggle");
  const names={hio:"HIO",hiodnn:"HIODNN",ddrm:"DDRM"};
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  let scene=0,method="hio",wanted=!reduced.matches,visible=false,generation=0,driftTimer;
  const clips=[ours,baseline];
  clips.forEach(video=>{video.muted=true;video.defaultMuted=true;});
  function paint(){
    const playing=clips.some(video=>!video.paused);
    toggle.textContent=playing?"Pause":"Play";
    toggle.setAttribute("aria-label",playing?"Pause both comparison videos":"Play both comparison videos");
    toggle.setAttribute("aria-pressed",String(playing));
  }
  function pause(){
    generation++;
    clips.forEach(video=>video.pause());
    clearInterval(driftTimer);
    paint();
  }
  async function play(){
    const current=++generation;
    if(!wanted||!visible||document.hidden){pause();return;}
    const outcomes=await Promise.allSettled(clips.map(video=>video.play()));
    if(current!==generation){if(!wanted||!visible||document.hidden)clips.forEach(video=>video.pause());return;}
    if(outcomes.some(outcome=>outcome.status==="rejected")){
      clips.forEach(video=>video.pause());
      document.getElementById("comparison-status").textContent="Press Play to start the comparison videos.";
    }
    clearInterval(driftTimer);
    if(clips.every(video=>!video.paused)){
      driftTimer=setInterval(()=>{
        if(ours.readyState<2||baseline.readyState<2||ours.seeking||baseline.seeking||!ours.duration||!baseline.duration)return;
        const target=ours.currentTime/ours.duration*baseline.duration;
        const difference=Math.abs(baseline.currentTime-target);
        if(Math.min(difference,baseline.duration-difference)>.12)baseline.currentTime=target;
      },400);
    }
    paint();
  }
  function update(){
    pause();
    const sample=String(scene+1).padStart(2,"0");
    for(const [video,key]of [[ours,"ours"],[baseline,method]]){
      const media=window.CDI_CONTENT.comparisons[scene].media[key];
      video.src=media.src;
      video.poster=media.poster;
      video.load();
    }
    baseline.setAttribute("aria-label",names[method]+" turntable video");
    document.getElementById("baseline-label").textContent=names[method];
    range.setAttribute("aria-valuetext",range.value+" percent Ours, "+(100-Number(range.value))+" percent "+names[method]);
    document.getElementById("comparison-description").textContent="Sample "+sample;
    document.querySelectorAll("[data-comparison-scene]").forEach(button=>{
      const active=Number(button.dataset.comparisonScene)===scene;
      button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
    });
    document.querySelectorAll("[data-comparison-method]").forEach(button=>{
      const active=button.dataset.comparisonMethod===method;
      button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
    });
    if(wanted&&visible&&!document.hidden)play();
  }
  document.querySelectorAll("[data-comparison-scene]").forEach(button=>button.addEventListener("click",()=>{scene=Number(button.dataset.comparisonScene);update();}));
  document.querySelectorAll("[data-comparison-method]").forEach(button=>button.addEventListener("click",()=>{method=button.dataset.comparisonMethod;update();}));
  range.addEventListener("input",()=>{
    const value=Math.max(0,Math.min(100,Number(range.value)));
    stage.style.setProperty("--split",value+"%");
    range.setAttribute("aria-valuetext",value+" percent Ours, "+(100-value)+" percent "+names[method]);
  });
  toggle.addEventListener("click",()=>{
    wanted=!clips.some(video=>!video.paused);
    if(wanted){visible=true;play();}else pause();
  });
  clips.forEach(video=>{
    video.addEventListener("play",paint);video.addEventListener("pause",paint);
    video.addEventListener("error",()=>{pause();document.getElementById("comparison-status").textContent="A comparison video could not be loaded.";});
  });
  if(typeof IntersectionObserver==="function"){
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(wanted&&visible&&!document.hidden)play();else pause();},{threshold:.1});
    observer.observe(stage);
  }else{visible=true;if(wanted)play();}
  document.addEventListener("visibilitychange",()=>{if(wanted&&visible&&!document.hidden)play();else pause();});
  window.addEventListener("pagehide",pause);
  if(reduced.addEventListener)reduced.addEventListener("change",event=>{wanted=!event.matches;if(wanted&&visible&&!document.hidden)play();else pause();});
  paint();
})();
