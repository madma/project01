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

var SquareP = function() {
  this.coords = [[0, 3], [0, 4], [1, 3], [1, 4]];
}

var ColumnP = function() {
  this.coords = [[0, 3], [0, 4], [0, 5], [0, 6]];
  this.pivotPt = this.coords[2];
}

var pieces = [SquareP, ColumnP];

// new piece, create a `randomInt`, and call `new` on pieces[randomInt] and
// assign it to currentPiece

function randPiece() {
  var i = Math.floor(Math.random()*pieces.length);
  return new pieces[i];
}


function addPiece(piece) {
  //clearPrev(piece);
  var prevCoords = piece.coords;
  for (var i = 0; i < 4; i++) {
    if (!movePredicate(piece, i, prevCoords)) {
      //unClearPrev(piece)
      return false;
    }
  }
  printTetris();
  return true;
}

function moveHo(piece, keypress) {
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
  printTetris();
  clearPrev(piece);
  printTetris();
  var prevCoords = piece.coords;
  for(var i = 0; i < 4; i++) {
    piece.coords[i][0] += 1;
    if (!movePredicate(piece, i, prevCoords)) {
      unClearPrev(piece)
      printTetris();
      return false;
    }
  }
  printTetris();
  return true;
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
