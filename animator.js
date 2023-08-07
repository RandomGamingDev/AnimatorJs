class Animation {
  constructor(disp, playing, progress, step, speed, loop, smooth, framerate) {
    // Animation settings
    this.disp = disp;
    this.playing = playing;
    this.progress = progress;
    this.step = step;
    this.speed = speed;
    this.loop = loop;

    // Export to webm settings
    this.framerate = framerate; 

    // Editor settings
    this.smooth = smooth;
  }

  loadEditorSettings() {
    if (smooth)
      smooth();
    else
      noSmooth();
  }

  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  stepProgress() {
    return this.step == 0 ?
      this.progress :
      Math.floor(this.progress / this.step) * this.step;
  }

  tick(useDeltaTime) {
    this.animationFrame(this.stepProgress());

    if (this.playing)
      this.progress += useDeltaTime ?
        (deltaTime / 1000) * this.speed :
        (1 / this.framerate) * this.speed;

    if (this.loop) {
      this.progress %= 1;
      if (this.progress < 0)
        this.progress = 1 + this.progress;
    }
    else
      this.progress = this.clamp(progress, 0, 1);
  }

  animationFrame() {
    
  }
}