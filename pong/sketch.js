// global var iables, able to be used in all functions
var ballX;              // x-location of the ball
var ballY;              // y-location of the ball
var ballSpeedX = 5;     // speed of the ball horizontally
var ballSpeedY = 2;     // speed of the ball vertically
var paddleHeight = 30;  // height of the paddle
var paddleColor = 100;        // color of the paddle
var score = 0;

function preload(){
    myFont = loadFont('fonts/press-start-2p/PressStart2P.ttf');
    docker = loadImage('docker.png');  
}
function setup() {
  createCanvas(windowWidth, windowHeight);   // canvas size
  textFont(myFont);
  noCursor();       // hides the mouse
  ballX = width/2;  // start the ball in the
  ballY = height/2; //   middle of the canvas
}

function draw() {
    
    background(15,15,15); // resets the background
    moveBall();      // ball moves in X and Y directions
    checkCollide();  // checks for collision with walls or paddle
    drawPaddle();    // re-draws paddle
    drawBall();      // re-draws ball
    fill(255);
    textSize(16);
    text('Score: '+ score , 40,40);
}

function moveBall() {
  ballX = ballX + ballSpeedX; // updates ball location horizontally
  ballY = ballY + ballSpeedY; // updates ball location vertically

  // monitor speed/direction of ball
//   console.log("ballSpeedX: " + ballSpeedX + ", ballSpeedY: " + ballSpeedY);
}

function checkCollide() {
  // left/right edge
  if (ballX < 0 || ballX > width) {
    ballSpeedX = ballSpeedX * -1; // switch X direction
  }

  // top edge
  if (ballY < 0) {
    ballSpeedY = ballSpeedY * -1; // switch Y direction
  }

  // paddle
  if (ballY > height-paddleHeight) { // past 'goal line'
    if (ballX > mouseX && ballX < mouseX + 90) { // within paddle
      ballSpeedY = ballSpeedY * -1; // switch Y direction
      score++;
    } else { // end game
      fill(255);
      text("GAME OVER!", width/2-80, height/2);
      noLoop();
    }
  }
}

function drawBall() {
  noStroke();
  fill(173,216,230);
  rect(ballX, ballY, 20, 20);
}

function drawPaddle() {
  stroke(paddleColor); // color of paddle border
  strokeWeight(4); // border thickness of 4px
  image(docker, mouseX, height-paddleHeight-25, 60, 60);

  // y-value is always at the bottom, minus height of paddle, minus border of paddle
//   rect(mouseX, height-paddleHeight-4, 200, paddleHeight);
}

function mousePressed() {
  // takes the values of mouseX between 0 and width and scales between 0-255
  paddleColor = map(mouseX, 0, width, 0, 255);
}

function keyPressed() {
  // changes ball/paddle to black/white
    if (key == 'b' || key == 'B') {
    fill(0);
  }
  if (key == 'w' || key == 'W') {
    fill(255);
  }
}
