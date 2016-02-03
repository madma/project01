// MODEL: Data

var tetris = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var currentPiece;

var rad90Deg = 0.5*Math.PI;

var Opiece = function() {
  this.coords = [[0, 3], [0, 4], [1, 3], [1, 4]];
}

Opiece.prototype.getCoords = function() {return this.coords;}

var Ipiece = function() {
  this.coords = [[0, 3], [0, 4], [0, 5], [0, 6]];
  this.pivotPt = this.coords[2];
}

Ipiece.prototype.getCoords = function() {return this.coords;}

var Spiece = function() {
  this.coords = [[0, 3], [0, 4], [1, 2], [1, 3]];
  this.pivotPt = this.coords[0];
}

Spiece.prototype.getCoords = function() {return this.coords;}

var Zpiece = function() {
  this.coords = [[0, 2], [0, 3], [1, 3], [1, 4]];
  this.pivotPt = this.coords[1];
}

Zpiece.prototype.getCoords = function() {return this.coords;}

var Lpiece = function() {
  this.coords = [[0, 2], [0, 3], [0, 4], [1, 2]];
  this.pivotPt = this.coords[1];
}

Lpiece.prototype.getCoords = function() {return this.coords;}

var Jpiece = function() {
  this.coords = [[0, 2], [0, 3], [0, 4], [1, 4]];
  this.pivotPt = this.coords[1];
}

Jpiece.prototype.getCoords = function() {return this.coords;}

var Tpiece = function() {
  this.coords = [[0, 2], [0, 3], [0, 4], [1, 3]];
  this.pivotPt = this.coords[1];
}

Tpiece.prototype.getCoords = function() {return this.coords;}

var pieces = [Opiece, Ipiece, Spiece, Zpiece, Lpiece, Jpiece, Tpiece];


// MODEL: Behavior

/*

Game play:
1. initialize currentPiece global var with a new random piece
2. check that currentPiece's initial coordinates are available, i.e. value at tetris[i, j] === 0
3. if initial coords of currentPiece available, add piece to board
4. every t seconds (i.e. tick interval) move the currentPiece down if new coords available, else currentPiece lands and re-assigned to new random piece (1.)
5. on keyup "ArrowLeft" (keyup.keycode = 37) or "ArrowRight" (39) translate piece one unit L or R if new coords available
6. on keyup "ArrowUp" (38) rotate piece about its pivot point if new coords available
7. check if any rows complete
  a. clear rows
  b. tetris pop full row, prepend new blank row
*/

function randPiece() {
  var i = Math.floor(Math.random()*pieces.length);
  return new pieces[i];
}


function addPiece(piece) {
  var checksum = 0;
  for(var i = 0; i < 4; i++) {
    checksum += tetris[piece.coords[i][0]][piece.coords[i][1]];
  }
  if (checksum !== 0) {
    return false;
  } else {
    for (var i = 0; i < 4; i++) {
        tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
    }
  }
  printTetris();
  return true;
}


function moveLR(piece, keypress) {
  clearPrev(piece);
  var prevCoords = piece.coords;
  if (keypress === 39) {
    for(var i = 0; i < 4; i++) {
      piece.coords[i][1] += 1;
      if (!movePredicate(piece, i, prevCoords)) {
        unClearPrev(piece)
        return false;
      }
    }
  } else if (keypress === 37) {
    for (var i = 0; i < 4; i++) {
      piece.coords[i][1] -= 1;
      if (!movePredicate(piece, i, prevCoords)) {
        unClearPrev(piece)
        return false;
      }
    }
  }
  printTetris();
  return true;
}


function transpose(piece) {
  clearPrev(piece);
  var prevCoords = piece.coords;
  for (var i = 0; i < 4; i++) {
    piece.coords[i].reverse();
    if (!movePredicate(piece, i, prevCoords)) {
      unClearPrev(piece)
      return false;
    }
  }
  printTetris();
  return true;
}


function rotate(piece) {
  clearPrev(piece);
  var prevCoords = piece.coords;
  for (var i = 0; i < 4; i++) {
    var cR = piece.coords[i][0];
    var cC = piece.coords[i][1];
    var pR = piece.pivotPt[0];
    var pC = piece.pivotPt[1];
    piece.coords[i][0] = rotateTransformRow(rad90Deg, cR, cC, pR, pC);
    piece.coords[i][1] = rotateTransformCol(rad90Deg, cR, cC, pR, pC);
    if (!movePredicate(piece, i, prevCoords)) {
      unClearPrev(piece)
      return false;
    }
  }
  printTetris();
  return true;
}

function rotateTransformRow(angleInRadians, currentRow, currentCol, pivotRow, pivotCol) {
  var transformedRow = (currentRow - pivotRow)*Math.cos(angleInRadians) - (currentCol - pivotCol)*Math.sin(angleInRadians) + pivotRow;
  return transformedRow;
}

function rotateTransformCol(angleInRadians, currentRow, currentCol, pivotRow, pivotCol) {
  var transformedRow = (currentRow - pivotRow)*Math.sin(angleInRadians) + (currentCol - pivotCol)*Math.cos(angleInRadians) + pivotCol;
  return transformedRow;
}


function moveDown(piece) {
  clearPrev(piece);
  var prevCoords = piece.getCoords();
  var checksum = 0;
  for(var i = 0; i < 4; i++) {
    piece.coords[i][0] += 1;
    checksum += tetris[piece.coords[i][0]][piece.coords[i][1]];
  }
  console.log(checksum);
  if (checksum === 0) {
    for(var i = 0; i < 4; i++) {
      tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
    }
    printTetris();
    return true;
  } else {
    piece.coords = prevCoords;
    unClearPrev(piece)
    printTetris();
    return false;
  }
}




// TODO: check if move requested is valid
function movePredicate(piece, i, prevCoords) {
  console.log("currently this tetris val is: " + tetris[piece.coords[i][0]][piece.coords[i][1]]);
  if (tetris[piece.coords[i][0]][piece.coords[i][1]] === 1) {
    piece.coords = prevCoords;
    return false;
  } else {
    tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
    return true;
  }
}

function clearPrev(piece) {
  tetris[piece.coords[0][0]][piece.coords[0][1]]     = 0;
  tetris[piece.coords[1][0]][piece.coords[1][1]]     = 0;
  tetris[piece.coords[2][0]][piece.coords[2][1]]     = 0;
  tetris[piece.coords[3][0]][piece.coords[3][1]]     = 0;
}

function unClearPrev(piece) {
  tetris[piece.coords[0][0]][piece.coords[0][1]]     = 1;
  tetris[piece.coords[1][0]][piece.coords[1][1]]     = 1;
  tetris[piece.coords[2][0]][piece.coords[2][1]]     = 1;
  tetris[piece.coords[3][0]][piece.coords[3][1]]     = 1;
}

function printTetris() {
  var print = "";
  for (var i = 0; i < 20; i += 1) {
    for (var k = 0; k < 10; k += 1) {
      print += tetris[i][k] + ' ';
    }
    print += '\n';
  }
  console.log(print);
}
