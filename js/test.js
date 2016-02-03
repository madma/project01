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
  for (var i = 0; i < 4; i++) {
    tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
  }
  printTetris();
}

function moveHo(piece, keypress) {
  clearPrev(piece);
  if (keypress === 39) {
    for(var i = 0; i < 4; i++) {
      piece.coords[i][1] += 1;
      tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
    }
  } else if (keypress === 37) {
    for (var i = 0; i < 4; i++) {
      piece.coords[i][1] -= 1;
      tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
    }
  }
  printTetris();
}

function transpose(piece) {
  clearPrev(piece);
  for (var i = 0; i < 4; i++) {
    piece.coords[i].reverse();
    tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
  }
  printTetris();
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
    if (tetris[piece.coords[i][0]][piece.coords[i][1]] === 1) {
      piece.coords = prevCoords;
      break;
    } else {
      tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
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
  for(var i = 0; i < 4; i++) {
    piece.coords[i][0] += 1;
    tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
  }
  printTetris();
}

// TODO: check if move requested is valid
function moveValidate(piece, i, prevCoords) {
  if (tetris[piece.coords[i][0]][piece.coords[i][1]] === 1) {
    piece.coords = prevCoords;
    return false;
  } else {
    tetris[piece.coords[i][0]][piece.coords[i][1]] = 1;
  }
}

function clearPrev(piece) {
  tetris[piece.coords[0][0]][piece.coords[0][1]]     = 0;
  tetris[piece.coords[1][0]][piece.coords[1][1]]     = 0;
  tetris[piece.coords[2][0]][piece.coords[2][1]]     = 0;
  tetris[piece.coords[3][0]][piece.coords[3][1]]     = 0;
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
