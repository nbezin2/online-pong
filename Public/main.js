var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");







//Global Variables
var mainM = new Menu();
var p1 = new Paddle(0, (canvas.height/2) - 30, 0, 20, 60);
var p2 = new Paddle(canvas.width - 20, (canvas.height/2) - 30, 0, 20, 60);
var ball = new Ball((canvas.width/2)-5, (canvas.height/2)-5, 2, 3, 10);
var p1U = false, p1D = false, p2U = false, p2D = false;

//keyDown and keyUp Handlers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.getElementById("myCanvas").addEventListener("click", mouseClick, false);

function mouseClick(e) {
  console.log("X Pos: " + e.clientX);
  console.log("Y Pos: " + e.clientY);
  if (mainM.getMode() == 0) { //Main menu selection
    if (e.clientX >= canvas.width/2 && e.clientX < canvas.width-canvas.width/2) {
      if (e.clientY > 0 && e.clientY <= canvas.height/2) {
        mainM.setMode(-1); //local chosen
      }
      else if (e.clientY > canvas.height/2 && e.clientY < canvas.height) {
        mainM.setMode(2); //online chosen
      }
    }
  }
}


function keyDownHandler(e) {
  if (e.key == "w" && p1U == false) {
    p1U = true;
    p1D = false;
  }
  if (e.key == "s" && p1D == false) {
    p1D = true;
    p1U = false;
  }

  if (e.key == "ArrowUp" && p2U == false) {
    p2U = true;
    p2D = false;
  }

  if (e.key == "ArrowDown" && p2D == false) {
    p2D = true;
    p2U = false;
  }
}

function keyUpHandler(e) {
  if (e.key == "w") {
    p1U = false;
  }

  if (e.key == "s") {
    p1D = false;
  }

  if (e.key == "ArrowUp") {
    p2U = false;
  }

  if (e.key == "ArrowDown") {
    p2D = false;
  }
}

//Check Paddle Collision
function checkHit() {
  //Left Paddle Collision
  if ((ball.getX() <= p1.getX()+p1.getW() && ball.getX() + ball.getW() >= p1.getX() + p1.getW()) && 
    (ball.getY() < p1.getY()+p1.getH() && ball.getY()+ball.getH() > p1.getY())) {
    ball.setX(p1.getX() + p1.getW())
    ball.hit(p1.getY(), p1.getX(), p1.getH(), p1.getW());
  }

  //Right Paddle Collision
  if ((ball.getX() + ball.getW() >= p2.getX() && ball.getX() <= p2.getX()) && 
    (ball.getY() < p2.getY()+p2.getH() && ball.getY()+ball.getH() > p2.getY())) {
    ball.setX(p2.getX() - ball.getW());
    ball.hit(p2.getY(), p2.getX(), p2.getH(), p2.getW());
  }
}

function getInput() {

  if (p1U && p1D) {
    p1.Stuck();
  }
  else if (p1U) {
    p1.Up();
  }
  else if (p1D) {
    p1.Down();
  }
  else {
    p1.Stuck();
  }

  if (p2U && p2D) {
    p2.Stuck();
  }
  else if (p2U) {
    p2.Up();
  }
  else if (p2D) {
    p2.Down();
  }
  else {
    p2.Stuck();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (mainM.getMode() == -1) {
    getInput();
    checkHit();
    p1.show();
    p2.show();
    p1.update();
    p2.update();
    ball.show();
    ball.update();
  }
  else {
    mainM.show();
  }
  console.log(mainM.getMode());
}

setInterval(draw, 10);
