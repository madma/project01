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
    if (context.isPointInPath(this.x, wellEl.height)) {
      this.bottomClear = false;
    } else {
      this.bottomClear = true;
    }
  }
};

var tetrominoI = function(ctx, s, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + s*4, y);
    ctx.lineTo(x + s*4, y + s);
    ctx.lineTo(x, y + s);
    ctx.closePath();
    ctx.fill();

}


// MODEL: Behavior


// VIEW

function draw() {
}

window.addEventListener("keyup", function(event) {
  switch (event.keyCode) {
    case 37: // ArrowLeft
      break;
    case 39: // ArrowRight
      break;
    default:
      return;
  }
});

function log(x) {
  console.log(x);
}


// USER INTERACTION

