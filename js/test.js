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

var Ipiece = function() {
  this.coords = [[0, 3], [0, 4], [0, 5], [0, 6]];
  this.pivotPt = this.coords[2];
}

var Spiece = function() {
  this.coords = [[0, 3], [0, 4], [1, 2], [1, 3]];
  this.pivotPt = this.coords[0];
}

var Zpiece = function() {
  this.coords = [[0, 2], [0, 3], [1, 3], [1, 4]];
  this.pivotPt = this.coords[1];
}

var Lpiece = function() {
  this.coords = [[0, 2], [0, 3], [0, 4], [1, 2]];
  this.pivotPt = this.coords[1];
}

var Jpiece = function() {
  this.coords = [[0, 2], [0, 3], [0, 4], [1, 4]];
  this.pivotPt = this.coords[1];
}

var Tpiece = function() {
  this.coords = [[0, 2], [0, 3], [0, 4], [1, 3]];
  this.pivotPt = this.coords[1];
}


//////////////

var compare = function(a1, a2) {
  return a1.toString() === a2.toString();
};

var isIn = function(coord, listOfCoords) {
  for (var i = 0; i < listOfCoords.length; i++) {
    if (compare(coord, listOfCoords[i])) {
      return true;
    }
  }
  return false;
};


function Piece(type) {
  this.type = type.toUpperCase();
  switch (this.type) {
    case "O":

      // ORIENTATION 0
      // 0 A
      // 1   X X
      // 2   X X
      // 3
      //   0 1 2 3

      this.coords  = [
        [ [1, 1], [2, 1], [1, 2], [2, 2] ]
      ];
      this.orientation = 0;
      this.anchor = [4, -1];
      break;
    case "I":

      // ORIENTATION 0
      // 0 A
      // 1 X X X X
      // 2
      // 3
      //   0 1 2 3

      // ORIENTATION 1
      // 0 A   X
      // 1     X
      // 2     X
      // 3     X
      //   0 1 2 3

      this.coords  = [
        [ [0, 1], [1, 1], [2, 1], [3, 1] ],
        [ [2, 0], [2, 1], [2, 2], [2, 3] ]
      ];
      this.orientation = 0;
      this.anchor = [4, -1];

      break;
    case "S":
      this.coords  = [[0, 3], [0, 4], [1, 2], [1, 3]];
      this.pivotPt = this.coords[0];
      break;
    case "Z":
      this.coords  = [[0, 2], [0, 3], [1, 3], [1, 4]];
      this.pivotPt = this.coords[1];
      break;
    case "L":
      this.coords  = [[0, 2], [0, 3], [0, 4], [1, 2]];
      this.pivotPt = this.coords[1];
      break;
    case "J":
      this.coords  = [[0, 2], [0, 3], [0, 4], [1, 4]];
      this.pivotPt = this.coords[1];
      break;
    case "T":
      this.coords  = [[0, 2], [0, 3], [0, 4], [1, 3]];
      this.pivotPt = this.coords[1];
      break;
  }
}

Piece.prototype.getInternalCoords = function() {
  return this.coords.slice();
};

Piece.prototype.getBoardCoords = function() {
  var currentCoords = this.coords[this.orientation];

  return [
    [currentCoords[0][0] + this.anchor[0], currentCoords[0][1] + this.anchor[1]],
    [currentCoords[1][0] + this.anchor[0], currentCoords[1][1] + this.anchor[1]],
    [currentCoords[2][0] + this.anchor[0], currentCoords[2][1] + this.anchor[1]],
    [currentCoords[3][0] + this.anchor[0], currentCoords[3][1] + this.anchor[1]]
  ];
};

Piece.prototype.calculateCells = function() {
  var value = this.type;
  var v = value;
  var currentOrientation    = this.orientation;
  var currentInternalCoords = this.coords[currentOrientation];
  var c = currentInternalCoords;

  console.log(` ORIENT: ${currentOrientation} `);
  console.log(` ${this.anchor[1] + 0}   ${isIn([1,0], c) ? v : " "} ${isIn([2,0], c) ? v : " "} ${isIn([3,0], c) ? v : " "} `);
  console.log(` ${this.anchor[1] + 1} ${isIn([0,1], c) ? v : " "} ${isIn([1,1], c) ? v : " "} ${isIn([2,1], c) ? v : " "} ${isIn([3,1], c) ? v : " "} `);
  console.log(` ${this.anchor[1] + 2}   ${isIn([1,2], c) ? v : " "} ${isIn([2,2], c) ? v : " "} ${isIn([3,2], c) ? v : " "} `);
  console.log(` ${this.anchor[1] + 3}     ${isIn([2,3], c) ? v : " "}   `);
  console.log(`   ${this.anchor[0] + 0} ${this.anchor[0] + 1} ${this.anchor[0] + 2} ${this.anchor[0] + 3} `);
};

Piece.prototype.rotate = function() {
  if (this.orientation < this.coords.length - 1) {
    this.orientation++;
  } else {
    this.orientation = 0;
  }
};

Piece.random = function() {
  var types = ["O", "I", "S", "Z", "L", "J", "T"];
  var index =  Math.floor(Math.random()*types.length);
  return new Piece(types[index]);
};

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
