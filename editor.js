function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const clamp = () => Math.min(Math.max(num, min), max);

// The animation
let animation;

let draggingProgress = false;
let fileInput;

 // Progress bar
const progressBar = {
  height: 50,
  spacing: 10,
  iconSize: 30,
  timelineW: () => width - (progressBar.iconSize * 3 + progressBar.spacing * 5)
}

function base64ToBytes(base64) {
  const binString = window.atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function handleFile(file) {
  switch (file.type) {
    case "application":
      eval(new TextDecoder().decode(base64ToBytes(file.data.slice(37))));
      animation.loadEditorSettings();
      break;
    case "text":
      eval(file.data);
      animation.loadEditorSettings();
      break;
    default:
      break;
  }
}

function setup() {
  fileInput = createFileInput(handleFile);
  fileInput.hide();
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(31);

  // Progress bar
  push(); // Base
  {
    fill(24);
    rect(0, height - progressBar.height, width, progressBar.height);
  }
  pop();

  push(); // Elements
  {
    translate(progressBar.spacing, height - (progressBar.height - progressBar.spacing));
    fill(255);

    // Play button
    if (animation != undefined && animation.playing) {
      rect(0, 0, 10, progressBar.iconSize);
      rect(20, 0, 10, progressBar.iconSize);
    }
    else
      triangle(0, 0, 30, 15, 0, progressBar.iconSize)

    // Progress Bar
    timelineW = progressBar.timelineW();

    translate(progressBar.iconSize + progressBar.spacing, progressBar.spacing);
    rect(0, 0, timelineW, 10, 16);

    // Already finished component
    fill(86, 156, 214);
    rect(0, 0, (animation == undefined ? 0 : animation.progress * timelineW), 10, 16);

    // Draggable circle
    if (animation != undefined && draggingProgress) {
      animation.progress = (mouseX - (progressBar.iconSize + 2 * progressBar.spacing)) / timelineW;
      animation.progress = clamp(animation.progress, 0, 1);
    }

    fill(225);
    circle(((animation == undefined) ? 0 : animation.stepProgress() * timelineW), progressBar.spacing / 2, progressBar.iconSize * 0.5);

    // Upload icon
    translate(timelineW + progressBar.spacing, -progressBar.spacing);
    fill(255);
    triangle(0, 15, 15, 0, 30, 15);
    rect(10, 15, 10, 15);

    // Download icon
    translate(progressBar.spacing + progressBar.iconSize, 0);
    triangle(0, 15, 15, 30, 30, 15);
    rect(10, 0, 10, 15);
  }
  pop();

  // If the animation isn't loaded yet request the user to load the animation
  if (animation == undefined) {
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Please upload an animation file", width / 2, height / 2);
    pop();
    return;
  }

  // The height of the viewport
  const vwH = height - progressBar.height;

  // If this is true the limiter is the width, otherwise it's the height
  const lW = animation.disp.width / animation.disp.height > width / vwH;

  // Dimensions of the actual display
  const dims = 
    lW ? 
      [width, (width / animation.disp.width) * animation.disp.height] :
      [(vwH / animation.disp.height) * animation.disp.width, vwH];

  // Offset of the display based on the limiter
  const off = 
    lW ?
      [0, (vwH - dims[1]) / 2] :
      [(width - dims[0]) / 2, 0];

 animation.tick();
 image(animation.disp, off[0], off[1], dims[0], dims[1]);
}

function mouseMoved() {
  try {
    cursor(ARROW);
  }
  catch {
    return;
  }

  if (Math.sqrt(
        ((progressBar.iconSize + progressBar.spacing * 2 + ((animation == undefined) ? 0 : animation.stepProgress()) * progressBar.timelineW()) - mouseX) ** 2 +
        ((height - (progressBar.height - progressBar.spacing) + progressBar.spacing + progressBar.spacing / 2) - mouseY) ** 2
      ) < progressBar.iconSize * 0.5) {
        cursor("grab");
        return;
      }

  if (mouseY < height - progressBar.height || mouseY > height - progressBar.spacing)
    return;

  if (mouseX > progressBar.spacing && mouseX < progressBar.iconSize + progressBar.spacing) {
    cursor("grab");
    return;
  }
  if (mouseX > width - (progressBar.iconSize * 2 + progressBar.spacing * 2) && mouseX < width - (progressBar.iconSize + progressBar.spacing * 2)) {
    cursor("grab");
    return;
  }
  if (mouseX > width - (progressBar.iconSize + progressBar.spacing) && mouseX < width - progressBar.spacing) {
    cursor("grab");
    return;
  }
}

function mouseClicked() {
  if (mouseY < height - progressBar.height || mouseY > height - progressBar.spacing)
    return;

  if (animation != undefined && mouseX > progressBar.spacing && mouseX < progressBar.iconSize + progressBar.spacing) {
    animation.playing = !animation.playing;
    return;
  }
  if (mouseX > width - (progressBar.iconSize * 2 + progressBar.spacing * 2) && mouseX < width - (progressBar.iconSize + progressBar.spacing * 2)) {
    fileInput.elt.click();
    return;
  }
  if (mouseX > width - (progressBar.iconSize + progressBar.spacing) && mouseX < width - progressBar.spacing) {
    // make it so that this downloads the video
    //https://github.com/spite/ccapture.js/blob/master/README.md#using-the-code
    //https://github.com/andr-ew/ccapture.js-examples/blob/main/example_p5.html
    return;
  }
}

function mousePressed() {
  if (Math.sqrt(
        ((progressBar.iconSize + progressBar.spacing * 2 + ((animation == undefined) ? 0 : animation.stepProgress()) * progressBar.timelineW()) - mouseX) ** 2 +
        ((height - (progressBar.height - progressBar.spacing) + progressBar.spacing + progressBar.spacing / 2) - mouseY) ** 2
      ) < progressBar.iconSize * 0.5) {
        draggingProgress = true;
      }
}

function mouseReleased() {
  draggingProgress = false;
}