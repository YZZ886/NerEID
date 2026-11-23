// Author-supplied turntable videos from E:/optica are grouped by filename prefix.
// Paper figures and quantitative results remain separate from the video assets.
window.CDI_CONTENT = {
  projectName: 'NerEID',
  title: 'NerEID. Revealing Where Phase Errors Hide in Multiview 3D Coherent Diffraction Imaging',
  subtitle: 'One shared geometry. Phase regenerated at every update.',
  authors: 'Zhengzao Yu · Xiang Ji · Weilu Liu · Yaolong Fa · Shicheng Wei · Yuhao Wang · Wenbo Wan · Qiegen Liu',
  authorDetails: [{"name":"Zhengzao Yu","affiliation":"1","marker":"†"},{"name":"Xiang Ji","affiliation":"1","marker":"†"},{"name":"Weilu Liu","affiliation":"2","marker":""},{"name":"Yaolong Fa","affiliation":"1","marker":""},{"name":"Shicheng Wei","affiliation":"2","marker":""},{"name":"Yuhao Wang","affiliation":"1","marker":"*"},{"name":"Wenbo Wan","affiliation":"1","marker":"*"},{"name":"Qiegen Liu","affiliation":"1","marker":"*"}],
  abstract: "In three-dimensional coherent diffraction imaging, different objects can produce nearly identical diffraction patterns when only a few orientations are measured. We ask how the choice of object representation affects the Fourier phase variations that can remain hidden in these measurements. Our method, NerEID, represents the object as a set of anisotropic Gaussians. A learned shape prior supplies the initial geometry, which is then refined against the diffraction intensities from all views. In perturbation tests, the Gaussian model reproduced a smaller fraction of imposed phase variations than a fixed voxel model. Across 20 simulated objects reconstructed from three diffraction views each, NerEID improved rendered-view PSNR by 5.70 dB over joint DDRM-PR. Five measured diffraction patterns from planar targets provide a separate experimental test in two dimensions. These results suggest that the object representation offers a practical way to restrict phase ambiguity in sparse-view CDI.",
  methodFigure: 'assets/paper/figure-03.webp',
  methodCaption: 'Figure 3. NerEID workflow. A detached morphology proposal initializes shared anisotropic Gaussian geometry; intensity fidelity and geometric regularization refine the state across views.',
  comparisons: [
  {
    "media": {
      "hio": {
        "src": "assets/videos/example-03-hio.mp4",
        "poster": "assets/videos/example-03-hio.webp"
      },
      "hiodnn": {
        "src": "assets/videos/example-03-hiodnn.mp4",
        "poster": "assets/videos/example-03-hiodnn.webp"
      },
      "ddrm": {
        "src": "assets/videos/example-03-ddrm.mp4",
        "poster": "assets/videos/example-03-ddrm.webp"
      },
      "ours": {
        "src": "assets/videos/example-03-ours-display.mp4",
        "poster": "assets/videos/example-03-ours-display.webp"
      }
    }
  },
  {
    "media": {
      "hio": {
        "src": "assets/videos/example-02-hio.mp4",
        "poster": "assets/videos/example-02-hio.webp"
      },
      "hiodnn": {
        "src": "assets/videos/example-02-hiodnn.mp4",
        "poster": "assets/videos/example-02-hiodnn.webp"
      },
      "ddrm": {
        "src": "assets/videos/example-02-ddrm.mp4",
        "poster": "assets/videos/example-02-ddrm.webp"
      },
      "ours": {
        "src": "assets/videos/example-02-ours-display.mp4",
        "poster": "assets/videos/example-02-ours-display.webp"
      }
    }
  },
  {
    "media": {
      "hio": {
        "src": "assets/videos/example-01-hio.mp4",
        "poster": "assets/videos/example-01-hio.webp"
      },
      "hiodnn": {
        "src": "assets/videos/example-01-hiodnn.mp4",
        "poster": "assets/videos/example-01-hiodnn.webp"
      },
      "ddrm": {
        "src": "assets/videos/example-01-ddrm.mp4",
        "poster": "assets/videos/example-01-ddrm.webp"
      },
      "ours": {
        "src": "assets/videos/example-01-ours-display.mp4",
        "poster": "assets/videos/example-01-ours-display.webp"
      }
    }
  }
],
  showcase: [
  {
    "object_id": 8,
    "name": "T-LESS 08",
    "input": "assets/showcase/08-input.png",
    "prediction": "assets/showcase/08-silhouette.png",
    "video": "assets/showcase/08-turntable.mp4",
    "poster": "assets/showcase/08-poster.webp"
  },
  {
    "object_id": 17,
    "name": "T-LESS 17",
    "input": "assets/showcase/17-input.png",
    "prediction": "assets/showcase/17-silhouette.png",
    "video": "assets/showcase/17-turntable.mp4",
    "poster": "assets/showcase/17-poster.webp"
  },
  {
    "object_id": 12,
    "name": "T-LESS 12",
    "input": "assets/showcase/12-input.png",
    "prediction": "assets/showcase/12-silhouette.png",
    "video": "assets/showcase/12-turntable.mp4",
    "poster": "assets/showcase/12-poster.webp"
  },
  {
    "object_id": 1,
    "name": "T-LESS 01",
    "input": "assets/showcase/01-input.png",
    "prediction": "assets/showcase/01-silhouette.png",
    "video": "assets/showcase/01-turntable.mp4",
    "poster": "assets/showcase/01-poster.webp"
  },
  {
    "object_id": 25,
    "name": "T-LESS 25",
    "input": "assets/showcase/25-input.png",
    "prediction": "assets/showcase/25-silhouette.png",
    "video": "assets/showcase/25-turntable.mp4",
    "poster": "assets/showcase/25-poster.webp"
  },
  {
    "object_id": 30,
    "name": "T-LESS 30",
    "input": "assets/showcase/30-input.png",
    "prediction": "assets/showcase/30-silhouette.png",
    "video": "assets/showcase/30-turntable.mp4",
    "poster": "assets/showcase/30-poster.webp"
  }
]
};
