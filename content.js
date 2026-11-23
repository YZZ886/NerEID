// Author-supplied turntable videos from E:/optica are grouped by filename prefix.
// Paper figures and quantitative results remain separate from the video assets.
window.CDI_CONTENT = {
  projectName: 'NerEID',
  title: 'NerEID. Revealing Where Phase Errors Hide in Multiview 3D Coherent Diffraction Imaging',
  subtitle: 'One shared geometry. Phase regenerated at every update.',
  authors: 'Zhengzao Yu · Xiang Ji · Weilu Liu · Yaolong Fa · Shicheng Wei · Yuhao Wang · Wenbo Wan · Qiegen Liu',
  authorDetails: [{"name":"Zhengzao Yu","affiliation":"1","marker":"†"},{"name":"Xiang Ji","affiliation":"1","marker":"†"},{"name":"Weilu Liu","affiliation":"2","marker":""},{"name":"Yaolong Fa","affiliation":"1","marker":""},{"name":"Shicheng Wei","affiliation":"2","marker":""},{"name":"Yuhao Wang","affiliation":"1","marker":"*"},{"name":"Wenbo Wan","affiliation":"1","marker":"*"},{"name":"Qiegen Liu","affiliation":"1","marker":"*"}],
  abstract: "Coherent diffraction imaging recovers fine object structure from scattered waves without an imaging lens. Missing phase information can allow different structures to produce similar diffraction patterns, so agreement with measured intensities can conceal phase errors. Our local analysis reveals where such errors can hide: in object changes that barely affect the measured intensities yet remain expressible by the reconstruction model. This identifies the object representation as a means of restricting phase ambiguity, motivating a change in how reconstruction is performed. We introduce NerEID, which makes a shared three-dimensional geometry the basis of phase recovery. A learned shape prior initializes a nonnegative Gaussian object, which is then refined to explain the diffraction measurements from all views. Phase is regenerated from the current geometry at every iteration, replacing the reuse of an independently stored Fourier-phase field. Controlled comparisons with voxel representations examine the effect of this state design at comparable parameter counts. Experiments on simulated multiview diffraction data demonstrate a 5.70 dB PSNR and 0.0709 SSIM improvement over the strongest baseline (DDRM-PR). They also show robust performance under sparse-view and noisy conditions and lower intensity-constrained phase representability. These findings connect the analysis of hidden phase errors to geometric reconstruction, highlighting how object representation can constrain ambiguities that intensity agreement alone cannot resolve.",
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
