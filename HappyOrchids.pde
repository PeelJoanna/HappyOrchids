//MyVariables
PImage orchidMediumImage;
PImage wateringCanImage;
PImage orchidTallImage;
PImage logoImage;
PImage orchidDeadImage;
PImage overwateringImage;
PImage underwateringImage;

int waterLevel = 95;

void setup() {
   size(750, 800);
   wateringCanImage = loadImage("images/water.png");
   logoImage = loadImage("images/LogoHappyOrchidsHD.png");
   orchidTallImage = loadImage("images/Orchid-illustration-tall.png");
   orchidMediumImage = loadImage("images/Orchid-illustration-medium.png");
   orchidDeadImage = loadImage("images/Orchid-illustration-dead.png");
   overwateringImage = loadImage("images/Bubble-1-overwater.png");
   underwateringImage = loadImage("images/Bubble-1-underwater.png");
   
   frameRate(5);
}

void pipette() {
  pushMatrix();
  fill(255);
  stroke(153);
  rect(525,300,50,400,0,0,7,7);
  popMatrix();  
}

void waterPipette(int currentValue) {
  float maxHeight = 399;
  float height = map(currentValue, 0, 100, 0, maxHeight); 
  pushMatrix();
  noStroke();
  fill(#6CBAED);
  translate(0, maxHeight-height);
  rect(526,301,49,height,0,0,7,7);
  popMatrix();
}

// Displays the image at point (0, height/2) at half of its size
void displayImages() {
  image(wateringCanImage, 375, 120, wateringCanImage.width/3, wateringCanImage.height/3);
  image(logoImage, 50, 50, 85*1.5, 21*1.5);
  
  PImage orchid;
  if (waterLevel <= 0 || waterLevel > 95) {
    orchid = orchidDeadImage;
    noLoop();
  } else if (waterLevel <= 80) {
    orchid = orchidMediumImage;
  } else {
    orchid = orchidTallImage;
  }
  image(orchid, 100, 235, orchid.width/2, orchid.height/2);

  // Display Bubble underwatering
  if (waterLevel <= 0) {
    image(underwateringImage, 100, 235, underwateringImage.width/2, underwateringImage.height/2);
  }

  // Display Bubble overwatering
  if (waterLevel > 95) {
    image(overwateringImage, 100, 235, overwateringImage.width/2, overwateringImage.height/2);
  }
}

void draw() {
  background(255);
  waterLevel = waterLevel - 3;
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

void keyPressed(){
  // mark a new timer start time
  //start = millis();
  if (key == ' ') {
    waterLevel = waterLevel + 8;
  } else if (key == 'r') {
    waterLevel = 95;
    loop();
  }
}
