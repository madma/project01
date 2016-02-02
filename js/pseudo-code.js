/*
// MODEL DATA

canvasObj
width = canvasObj.width
height = canvasObj.height
context = canvasObj.getContext("2d")
currCanvasSnapshot =  context.getImageData(0, 0, width, height)
prevCanvasSnapshot
occupiedPixels // [indices of occupied pixels]
availablePixels = [indices of available] // start with all canvas pixels
gravity = 1; // fall velocity


// Algorithm
tetromino = firstTetromino

function getAvailablePix(img):
  data = img.data
  available = []
  occupied = []
  for (i = 0; i < data.length; i += 4)
    sum = data[i] + data[i+1] + data[i+2] + data[i+3]
    if (sum === 0) available.push(i/4)
    else occupied.push(i/4)

function nextTetromino():
  canvasSnapshot = getCanvasSnapshot()
  occupiedPixels = getOccupiedPixelsFrom(canvasSnapshot)
  tetromino = new Tetromino()
  tetromino.createTetrominoJustAboveCanvas
  draw()

function draw:
  while (tetromino.nextMoveValid):
    tetromino.nextMove
  else:
    nextTetromino()

// TETROMINO CLASS
var Tetromino = function(sideLength) {
  this.type: "l",
  this.orientation: 0, // 0, pi/2, pi, 3*pi/2
  this.width: 4*sideLength,
  this.height: sideLength,
  this.x: 0.5*(width - this.width),
  this.y: -1*this.height,
  this.nextMoveValid: function() {

  },
  this.draw: function() {
    draw the path
  },
  this.nextMove: function() {

  }
}















































*/
