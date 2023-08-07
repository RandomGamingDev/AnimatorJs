class ExampleAnimation extends Animation {
    constructor() {
        super(createGraphics(200, 100), false, 0, 0.1, 0.1, true, false, 60);
    }

    animationFrame(stepProgress) {
        this.disp.background(255);
        this.disp.fill(0);
        this.disp.rect(stepProgress * 200, 50, 30, 30);
    }
}
animation = new ExampleAnimation();