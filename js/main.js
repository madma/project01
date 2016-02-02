console.log('main.js loaded!');

// MODEL: Data Model

// Canvas object, i.e. the "Well"
var $well = $("#well"); // canvas object to contain played tetrominoes
var wellEl = $well[0];
var wellWidth = wellEl.width;
var wellHeight = wellEl.height;
var context = wellEl.getContext("2d");
var canvasState; // array of indices of currently occupied pixels


var sideLength = wellEl.width/10;
var arrowPressed = "";
var raf;
var tetromino = {
  x: 0,
  y: 0,
  vy: 2,
  bottomClear: true,
  bottomTestPt: {},
  draw: function() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x+sideLength*4, this.y);
    context.lineTo(this.x+sideLength*4, this.y+sideLength);
    context.lineTo(this.x, this.y+sideLength);
    context.closePath();
    context.fill();
    if (context.isPointInPath(this.x, wellEl.height)) {
      this.bottomClear = false;
    } else {
      this.bottomClear = true;
    }

  }
};
var timer; // setInterval function that re-draws game at a given speed
var speed; // speed to call setInterval


// MODEL: Behavior
function getDrawnPixels(img) {
  imgData = img.data;

}


function makeTetromino(ctx) {
  var shapes = ["i", "j", "l", "o", "s", "t", "z"];
  var shape = Math.floor((Math.random()*shapes.length));
  switch (shapes[shape]) {
    default:
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(sideLength*4, 0);
      ctx.lineTo(sideLength*4, sideLength);
      ctx.lineTo(0, sideLength);
      ctx.closePath();
      ctx.fill();
  }
}

function moveTetromino() {

}

// makeTetromino(context);

// View

function draw() {
  if (tetromino.bottomClear) {
    context.clearRect(0, 0, wellEl.width, wellEl.height);
    tetromino.draw();
    tetromino.y += tetromino.vy;
    raf = window.requestAnimationFrame(draw);
  }
}

window.addEventListener("keyup", function(event) {
  if (event.defaultPrevented) {
    return;
  }
  console.log("added listener!");
  console.log(event.keyCode);
  switch (event.keyCode) {
    case 37:
      if (tetromino.x - sideLength >= 0) {
        tetromino.x -= sideLength;
      }
      arrowPressed = "Left";
      logIt("got Left", tetromino.x);
      break;
    case 39:
      if (tetromino.x + sideLength + sideLength*4 <= wellEl.width) {
        tetromino.x += sideLength;
      }
      arrowPressed = "Right";
      logIt("got Right", tetromino.x);
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);

function logIt(x) {
  console.log(x);
}


// User Interaction




/*
Pseudo-code

User starts a new game
  Well clears
  Initialize new tetromino
  Tetromino begins falling at velocity vy from just above the top center of the well
    Check that bottom, naked edges of tetromino do not collide with a played tetromino or bottom of well
      If collide:
        vy = 0
        Check that well still has room for a new tetromino
        If room:
          trigger next tetromino
      Else:
        y += vy
        draw()
    User keys left(-) or right(+) arrow
      Check that bounding box of Tetromino still within well
        If within:
          x += (+/-)well.width/10
          draw()

*/

