//MyVariables
var orchidMediumImage;
var wateringCanImage;
var orchidTallImage;
var logoImage;
var orchidDeadImage;
var bubbleUnderWateredImage;
var bubbleOverWateredImage;

var waterLevel = 95;

function preload() {
   wateringCanImage = loadImage("images/water.png");
   logoImage = loadImage("images/LogoHappyOrchidsHD.png");
   orchidTallImage = loadImage("images/Orchid-illustration-tall.png");
   orchidMediumImage = loadImage("images/Orchid-illustration-medium.png");
   orchidDeadImage = loadImage("images/Orchid-illustration-dead.png");
   bubbleUnderWateredImage = loadImage("images/Bubble-1-underwater.png");
   bubbleOverWateredImage = loadImage("images/Bubble-1-overwater.png");
}

function setup() {
  createCanvas(750, 800);
  frameRate(5);
}

function pipette() {
  push();
  fill(255);
  stroke(153);
  rect(525,300,50,400,0,0,7,7);
  pop();  
}

function waterPipette(currentValue) {
  var maxHeight = 399;
  var height = map(currentValue, 0, 100, 0, maxHeight); 
  push();
  noStroke();
  fill('#6CBAED');
  translate(0, maxHeight-height);
  rect(526,301,49,height,0,0,7,7);
  pop();
}

// Displays the image at point (0, height/2) at half of its size
function displayImages() {
  image(wateringCanImage, 375, 120, wateringCanImage.width/3, wateringCanImage.height/3);
  image(logoImage, 50, 50, 85*1.5, 21*1.5);
  
  var orchid;
  // if overwatered
  if (waterLevel > 95) {
    orchid = orchidDeadImage;
    image(bubbleOverWateredImage, 100, 120, bubbleOverWateredImage.width/3, bubbleOverWateredImage.height/3);
    noLoop();
  // if underwatered
  } else if (waterLevel <= 0) {
    orchid = orchidDeadImage;
    image(bubbleUnderWateredImage, 100, 120, bubbleUnderWateredImage.width/3, bubbleUnderWateredImage.height/3);
    noLoop();
  // if medium ok
  } else if (waterLevel <= 80) {
    orchid = orchidMediumImage;
  // if everything's perfect
  } else {
    orchid = orchidTallImage;
  }
  image(orchid, 100, 235, orchid.width/2, orchid.height/2);
}

function draw() {
  background(255);
  waterLevel = waterLevel - 5;
  if (waterLevel < 0) {
    waterLevel = 0;
  }
  pipette();
  waterPipette(waterLevel);

  displayImages();
  
  textSize(32);
  fill(0, 102, 153);
  if (waterLevel <= 0 || waterLevel > 95) {
    text("Game Over. Press r to play", width/4, height-20);
  } else {
    text("Press space to water me.", width/4, height-20);
  }
}

function keyPressed(){
  // mark a new timer start time
  //start = millis();
  if (key == ' ') {
    waterLevel = waterLevel + 8;
  } else if (key == 'r') {
    waterLevel = 95;
    loop();
  }
}
