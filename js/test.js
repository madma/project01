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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var currentPiece;

var rad90Deg = 0.5*Math.PI;

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
  this.orientation = 0;

  switch (this.type) {
    case "O":

      // ORIENTATION 0
      //   0 1 2 3
      // 0 A
      // 1   X X
      // 2   X X
      // 3

      this.coords  = [
        [ [1, 1], [1, 2], [2, 1], [2, 2] ]
      ];
      this.bounds = [ // anchor bounds for movement
        {left: -1, right: 7}
      ];
      this.anchor = [4, -1];
      break;
    case "I":

      // ORIENTATION 0 // ORIENTATION 1
      //   0 1 2 3     //   0 1 2 3
      // 0 A           // 0 A   X
      // 1 X X X X     // 1     X
      // 2             // 2     X
      // 3             // 3     X

      this.coords  = [
        [ [0, 1], [1, 1], [2, 1], [3, 1] ],
        [ [2, 0], [2, 1], [2, 2], [2, 3] ]
      ];
      this.bounds = [
        {left: 0,  right: 6},
        {left: -2, right: 8}
      ];
      this.anchor = [4, -1];
      break;
    case "S":

      // ORIENTATION 0 // ORIENTATION 1
      //   0 1 2 3     //   0 1 2 3
      // 0 A           // 0 A   X
      // 1     X X     // 1     X X
      // 2   X X       // 2       X
      // 3             // 3

      this.coords  = [
        [ [1, 2], [2, 1], [2, 2], [3, 1] ],
        [ [2, 0], [2, 1], [3, 1], [3, 2] ],
      ];
      this.bounds = [
        {left: -1, right: 6},
        {left: -2, right: 6}
      ];
      this.anchor = [3, -1];
      break;
    case "Z":

      // ORIENTATION 0  // ORIENTATION 1
      //   0 1 2 3      //   0 1 2 3
      // 0 A            // 0 A     X
      // 1   X X        // 1     X X
      // 2     X X      // 2     X
      // 3              // 3

      this.coords  = [
        [ [1, 1], [2, 1], [2, 2], [3, 2] ],
        [ [2, 1], [2, 2], [3, 0], [3, 1] ],
      ];
      this.bounds = [
        {left: -1, right: 6},
        {left: -2, right: 6}
      ];
      this.anchor = [3, -1];
      break;
    case "L":

      // ORIENTATION 0  // ORIENTATION 1  // ORIENTATION 2  // ORIENTATION 3
      //   0 1 2 3      //   0 1 2 3      //   0 1 2 3      //   0 1 2 3
      // 0 A            // 0 A   X        // 0 A     X      // 0 A X X
      // 1   X X X      // 1     X        // 1   X X X      // 1     X
      // 2   X          // 2     X X      // 2              // 2     X
      // 3              // 3              // 3              // 3

      this.coords  = [
        [ [1, 1], [1, 2], [2, 1], [3, 1] ],
        [ [2, 0], [2, 1], [2, 2], [3, 2] ],
        [ [1, 1], [2, 1], [3, 0], [3, 1] ],
        [ [1, 0], [2, 0], [2, 1], [2, 2] ]
      ];
      this.bounds = [
        {left: -1, right: 6},
        {left: -2, right: 6},
        {left: -1, right: 6},
        {left: -1, right: 7}
      ];
      this.anchor = [3, -1]; // starts at orientation 3???? TODO: MD
      break;
    case "J":

      // ORIENTATION 0  // ORIENTATION 1  // ORIENTATION 2  // ORIENTATION 3
      //   0 1 2 3      //   0 1 2 3      //   0 1 2 3      //   0 1 2 3
      // 0 A            // 0 A   X X      // 0 A X          // 0 A   X
      // 1   X X X      // 1     X        // 1   X X X      // 1     X
      // 2       X      // 2     X        // 2              // 2   X X
      // 3              // 3              // 3              // 3

      this.coords  = [
        [ [1, 1], [2, 1], [3, 1], [3, 2] ],
        [ [2, 0], [2, 1], [2, 2], [3, 0] ],
        [ [1, 0], [1, 1], [2, 1], [3, 1] ],
        [ [1, 2], [2, 0], [2, 1], [2, 2] ]
      ];
      this.bounds = [
        {left: -1, right: 6},
        {left: -2, right: 6},
        {left: -1, right: 6},
        {left: -1, right: 7}
      ];
      this.anchor = [3, -1]; // starts at orientation 3???? TODO: MD
      break;
    case "T":

      // ORIENTATION 0  // ORIENTATION 1  // ORIENTATION 2  // ORIENTATION 3
      //   0 1 2 3      //   0 1 2 3      //   0 1 2 3      //   0 1 2 3
      // 0 A            // 0 A   X        // 0 A   X        // 0 A   X
      // 1   X X X      // 1     X X      // 1   X X X      // 1   X X
      // 2     X        // 2     X        // 2              // 2     X
      // 3              // 3              // 3              // 3

      this.coords  = [
        [ [1, 1], [2, 2], [2, 1], [3, 1] ],
        [ [2, 0], [2, 1], [2, 2], [3, 1] ],
        [ [1, 1], [2, 0], [2, 1], [3, 1] ],
        [ [1, 1], [2, 0], [2, 1], [2, 2] ]
      ];
      this.bounds = [
        {left: -1, right: 6},
        {left: -2, right: 6},
        {left: -1, right: 6},
        {left: -1, right: 7}
      ];
      this.anchor = [3, -1]; // starts at orientation 3???? TODO: MD
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

Piece.prototype.getBounds = function() {
  return this.bounds[this.orientation];
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

  // TODO: translate anchor based on bounds
  // if anchor[x] > rightBound => anchor[x] = rightBound
  // if anchor[x] < leftBound  => anchor[x] = leftBound
};


Piece.prototype.moveDown = function() {
  // TODO: determine if there is a occupied cell below
  // you, if so => board.lockPiece()
  this.anchor[1]++;
};

// Moving left and right happens within bounds...

// BOARD: 0 1 2 3 4 5 6 7 8 9
// PIECE:
//     -1  |
//     ┏━━━━━━━┓
//     ┃0 1 2 3┃
//     ┃  X X  ┃
//     ┃  X X  ┃
//     ┃       ┃
//     ┗━━━━━━━┛        7   |
//                     ┏━━━━━━━┓
//                     ┃0 1 2 3┃
//                     ┃  X X  ┃
//                     ┃  X X  ┃
//                     ┃       ┃
//                     ┗━━━━━━━┛

Piece.prototype.moveLeft = function() {
  var bound = this.getBounds().left;
  if (this.anchor[0] > bound) this.anchor[0]--;
};

Piece.prototype.moveRight = function() {
  var bound = this.getBounds().right;
  if (this.anchor[0] < bound) this.anchor[0]++;
};

Piece.random = function() {
  var types = ["O", "I", "S", "Z", "L", "J", "T"];
  var index =  Math.floor(Math.random()*types.length);
  return new Piece(types[index]);
};


// FIXME: MD remove after testing
var o = "O",
    t = "T",
    s = "S",
    z = "Z",
    l = "L",
    j = "J",
    i = "I";

// Board
var board = {};

board.upcomingPiece = Piece.random();
board.currentPiece  = undefined;

board.cells = [
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
  [0, 0, t, 0, o, o, 0, s, s, 0],
  [0, t, t, t, o, o, s, s, 0, 0]
];

board.loadPiece = function() {
  board.currentPiece  = board.upcomingPiece;
  board.upcomingPiece = Piece.random();
};

board.lockPiece = function() {
  var pieceCells = board.currentPiece.getBoardCoords();

  for (var i = 0; i < 4; i++) {
    row = pieceCells[i][1];
    col = pieceCells[i][0];
    board[row][col] = board.currentPiece.type;
  }

  // TODO: MD check for full rows, remove them and score

  board.loadPiece();
};

board.calculate = function() {
  var print = "";

  var pieceCells = board.currentPiece.getBoardCoords();

  for (var row = 0; row < 20; row++) {
    for (var col = 0; col < 10; col++) {
      if (isIn([col,row], pieceCells)) {
        print += board.currentPiece.type + ' ';
      } else {
        print += board.cells[row][col] + ' ';
      }
    }
    print += '\n';
  }
  console.log(print);
};



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
