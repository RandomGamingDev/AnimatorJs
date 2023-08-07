# AnimatorJs
A javascript animation viewer based on a custom animation API primarily designed for p5.js

You can use the editor here: https://randomgamingdev.github.io/AnimatorJs/

If you want to modify it, for instance to by default add your own library, simply fork this repo, add it into [index.html](https://github.com/RandomGamingDev/AnimatorJs/blob/main/index.html) and then set up Github Pages.

This editor runs entirely without a backend and is a completely static site, which means that all computations and assets are on the client side.

Even though the library's primarily designed for p5.js, you can still upload libraries in the form of javascript files to load them into the animator.
To use your animation simply follow the template and extend the Animation class in [animator.js](https://github.com/RandomGamingDev/AnimatorJs/blob/main/animation.js). Once you're done creating your animation, you can simply take the file and the `Animation` class from [animator.js](https://github.com/RandomGamingDev/AnimatorJs/blob/main/animation.js) and drop it into your project and make `disp` point at the canvas that you want to draw on.

Write the actual code for the animation in the `animationFrame()` function of your class.\

Animation settings:
- Animator.disp is the display/canvas
- Animator.playing is whether or not the animation's playing
- Animator.progress is how much the animation's progressed
- Animator.step is the maximum change in values between animations and is based on progress with the "stepped progress" being obtained via `stepProgress()`
- Animator.speed is how fast the animation progresses per second, for instance `0.1` would progress at `0.1` per second
- Animator.loop is whether or not the animation loops

Editor settings
- Animator.smooth is whether or not the editor should smooth the resulting image
- Animator.framerate is the frame rate that the editor should run at (which shouldn't matter since deltaTime is being used)

You can use the animator at https://randomgamingdev.github.io/AnimatorJs

There's an example animation in [animation.js](https://github.com/RandomGamingDev/AnimatorJs/blob/main/animation.js)
