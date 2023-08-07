class Animation {
  constructor(disp, playing, progress, step, speed, loop, smooth, framerate) {
    // Animation settings
    this.disp = disp;
    this.playing = playing;
    this.progress = progress;
    this.step = step;
    this.speed = speed;
    this.loop = loop;

    // Editor settings
    this.smooth = smooth;
    this.framerate = framerate;
  }

  loadEditorSettings() {
    if (smooth)
      smooth();
    else
      noSmooth();
    frameRate(animation.framerate);
  }

  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  stepProgress() {
    return this.step == 0 ?
      this.progress :
      Math.floor(this.progress / this.step) * this.step;
  }

  tick() {
    this.animationFrame(this.stepProgress());

    if (this.playing)
      this.progress += (deltaTime / 1000) * this.speed;

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