console.log('main.js loaded!');

// MODEL: Data Model
var $well = $("#well"); // canvas object to contain played tetrominoes
var wellEl = $well[0];
var timer; // setInterval function that re-draws game at a given speed
var speed; // speed to call setInterval

// MODEL: Data


//var currentPiece;

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
  this.type = type.toLowerCase();
  this.orientation = 0;

  switch (this.type) {
    case "o":

      // ORIENTATION 0
      //   0 1 2 3
      // 0 A
      // 1   X X
      // 2   X X
      // 3

      this.coords  = [
        [ [1, 1], [1, 2], [2, 1], [2, 2] ]
      ];
      this.bounds = [
        {left: [ [0, 1], [0, 2] ], right: [ [3, 1], [3, 2] ], down: [ [1, 3], [2, 3] ]}
      ];
      this.anchorBounds = [ // anchor bounds for movement
        {left: -1, right: 7, bottom: 17}
      ];
      this.anchor = [4, -1];
      break;
    case "i":

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
        {left: [ [-1, 1] ],                        right: [ [4, 1] ],                         down: [ [0, 2], [1, 2], [2, 2], [3,2] ]},
        {left: [ [1, 0], [1, 1], [1, 2], [1, 3] ], right: [ [3, 0], [3, 1], [3, 2], [3, 3] ], down: [ [2, 4] ]                       }
      ];
      this.anchorBounds = [
        {left: 0,  right: 6, bottom: 18},
        {left: -2, right: 8, bottom: 16}
      ];
      this.anchor = [4, -1];
      break;
    case "s":

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
        {left: [ [0, 2], [1, 1] ],            right: [ [3, 2], [4, 1] ],            down: [ [1, 3], [2, 3], [3, 2] ]  },
        {left: [ [1, 0], [1, 1], [2, 2] ],    right: [ [3, 0], [4, 1], [4, 2] ],    down: [ [2, 2], [3, 3] ]          }
      ];
      this.anchorBounds = [
        {left: -1, right: 6, bottom: 17},
        {left: -2, right: 6, bottom: 17}
      ];
      this.anchor = [3, -1];
      break;
    case "z":

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
        {left: [ [0, 1], [1, 2] ],            right: [ [3, 1], [4, 2] ],            down: [ [1, 2], [2, 3], [3, 3] ]  },
        {left: [ [2, 0], [1, 1], [1, 2] ],    right: [ [4, 0], [4, 1], [3, 2] ],    down: [ [2, 3], [3, 2] ]          }
      ];
      this.anchorBounds = [
        {left: -1, right: 6, bottom: 17},
        {left: -2, right: 6, bottom: 17}
      ];
      this.anchor = [3, -1];
      break;
    case "l":

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
        {left: [ [0, 1], [0, 2] ],            right: [ [2, 2], [4, 1] ],            down: [ [1, 3], [2, 2], [3, 2] ]  },
        {left: [ [1, 0], [1, 1], [1, 2] ],    right: [ [3, 0], [3, 1], [4, 2] ],    down: [ [2, 3], [3, 3] ]          },
        {left: [ [0, 1], [2, 0] ],            right: [ [4, 0], [4, 1] ],            down: [ [1, 2], [2, 2], [3,2] ]   },
        {left: [ [0, 0], [1, 1], [1, 2] ],    right: [ [3, 0], [3, 1], [3, 2] ],    down: [ [1, 1], [2, 3] ]          }
      ];
      this.anchorBounds = [
        {left: -1, right: 6, bottom: 17},
        {left: -2, right: 6, bottom: 17},
        {left: -1, right: 6, bottom: 18},
        {left: -1, right: 7, bottom: 17}
      ];
      this.anchor = [3, -1]; // starts at orientation 3???? TODO: MD
      break;
    case "j":

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
        {left: [ [0, 1], [2, 2] ],            right: [ [4, 1], [4, 2] ],            down: [ [1, 2], [2, 2], [3, 3] ]  },
        {left: [ [1, 0], [1, 1], [1, 2] ],    right: [ [3, 1], [3, 2], [4, 0] ],    down: [ [2, 3], [3, 1] ]          },
        {left: [ [0, 0], [0, 1] ],            right: [ [2, 0], [4, 1] ],            down: [ [1, 2], [2, 2], [3,2] ]   },
        {left: [ [0, 2], [1, 0], [1, 1] ],    right: [ [3, 0], [3, 1], [3, 2] ],    down: [ [1, 3], [2, 3] ]          }
      ];
      this.anchorBounds = [
        {left: -1, right: 6, bottom: 17},
        {left: -2, right: 6, bottom: 17},
        {left: -1, right: 6, bottom: 18},
        {left: -1, right: 7, bottom: 17}
      ];
      this.anchor = [3, -1]; // starts at orientation 3???? TODO: MD
      break;
    case "t":

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
        {left: [ [0, 1], [1, 2] ],            right: [ [3, 2], [4, 1] ],            down: [ [1, 2], [2, 3], [3,2] ]   },
        {left: [ [1, 0], [1, 1], [1, 2] ],    right: [ [3, 0], [3, 2], [4, 1] ],    down: [ [2, 3], [3, 2] ]          },
        {left: [ [0, 1], [1, 0] ],            right: [ [3, 0], [4, 1] ],            down: [ [1, 2], [2, 2], [3,2] ]   },
        {left: [ [0, 1], [1, 0], [1, 2] ],    right: [ [3, 0], [3, 1], [3, 2] ],    down: [ [1, 2], [2, 3] ]          }
      ];
      this.anchorBounds = [
        {left: -1, right: 6, bottom: 17},
        {left: -2, right: 6, bottom: 17},
        {left: -1, right: 6, bottom: 18},
        {left: -1, right: 7, bottom: 17}
      ];
      this.anchor = [3, -1]; // starts at orientation 3???? TODO: MD
      break;
  }
  return;
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

Piece.prototype.getBoundsBoardCoords = function(dir) {
  var currentBoundsCoords = this.bounds[this.orientation][dir];
  var boundsBoardCoords = [];

  for (var coord of currentBoundsCoords) {
    boundsBoardCoords.push([coord[0] + this.anchor[0], coord[1] + this.anchor[1]]);
  }
  return boundsBoardCoords;
};

Piece.prototype.getAnchorBounds = function() {
  return this.anchorBounds[this.orientation];
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
  console.log(`   ${this.anchor[0] + 0} ${this.anchor[0] + 1} ${this.anchor[0] + 2} ${this.anchor[0] + 3}       `);
  console.log(` ${this.anchor[1] + 0} ${isIn([0,0], c) ? v : " "} ${isIn([1,0], c) ? v : " "} ${isIn([2,0], c) ? v : " "} ${isIn([3,0], c) ? v : " "} `);
  console.log(` ${this.anchor[1] + 1} ${isIn([0,1], c) ? v : " "} ${isIn([1,1], c) ? v : " "} ${isIn([2,1], c) ? v : " "} ${isIn([3,1], c) ? v : " "} `);
  console.log(` ${this.anchor[1] + 2} ${isIn([0,2], c) ? v : " "} ${isIn([1,2], c) ? v : " "} ${isIn([2,2], c) ? v : " "} ${isIn([3,2], c) ? v : " "} `);
  console.log(` ${this.anchor[1] + 3} ${isIn([0,3], c) ? v : " "} ${isIn([1,3], c) ? v : " "} ${isIn([2,3], c) ? v : " "} ${isIn([3,3], c) ? v : " "} `);
};

// MOVE METHODS

Piece.prototype.rotate = function() {
  // Set currentPiece's orientation to the next one
  this.orientation = Number(this.orientation + 1) % this.coords.length;
  // Check if next orientation moveDown is valid
  // isPieceMoveValid method also checks if next orientation would cause
  // a collision with a playedCell on the board
  if (board.isPieceMoveValid("down")) {
    return;
  }
  else {
    this.orientation = Number(this.orientation + 3) % this.coords.length;
    return;
  }
};


Piece.prototype.moveDown = function() {
  var aBound = this.getAnchorBounds().bottom;
  if (this.anchor[1] < aBound && board.isPieceMoveValid("down")) {
    this.anchor[1]++;
    console.log("moved the piece!");
    return;
  }
  // Case: currentPiece has no possible valid move
  else {
    board.lockPiece();
    return;
  }
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
  var aBound = this.getAnchorBounds().left;
  var bound = this.getBounds().left;
  // Case: currentPiece moveLeft is valid and it is still in play, i.e. moveDown is valid
  if (this.anchor[0] > aBound && board.isPieceMoveValid("left") && board.isPieceMoveValid("down")) {
    this.anchor[0]--;
    console.log("moved the piece!");
    return;
  }
  // Case: currentPiece with moveDown still valid and anchor still within its left bound
  // but whose leftmost edge abuts a played piece
  else if (this.anchor[0] >= aBound && board.isPieceMoveValid("down")) {
      return;
  }
  // Case: currentPiece has no possible valid move
  else {
    console.log("no more moves...getting the next piece...");
    board.lockPiece();
    return;
  }
};

Piece.prototype.moveRight = function() {
  var aBound = this.getAnchorBounds().right;
  // Case: currentPiece moveRight is valid and it is still in play, i.e. moveDown is valid
  if (this.anchor[0] < aBound && board.isPieceMoveValid("right") && board.isPieceMoveValid("down")) {
    this.anchor[0]++;
    console.log("moved the piece!");
    return;
  }
    // Case: currentPiece with moveDown still valid and anchor still within its right bound
    // but whose rightmost edge abuts a played piece
  else if (this.anchor[0] <= aBound && board.isPieceMoveValid("down")) {
      return;
  }
    // Case: currentPiece has no possible valid move
  else {
      console.log("no more moves...getting the next piece...");
      board.lockPiece();
    return;
  }
};

Piece.random = function() {
  var types = ["o", "i", "s", "z", "l", "j", "t"];
  var index =  Math.floor(Math.random()*types.length);
  return new Piece(types[index]);
};


// BOARD
var clearedLines = 0;
var board = {};
var playing = false;

// upcomingPiece is the next Piece instance and is displayed to the player
// currentPiece is the Piece instance in play--a piece is "in play" while it has valid moves
board.upcomingPiece = Piece.random();
board.currentPiece = undefined;

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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


board.playedCells = {
  o: [],
  t: [],
  s: [],
  z: [],
  l: [],
  j: [],
  i: [],
  all: function() {
    var all = [].concat(this.o, this.t, this.s, this.z, this.l, this.j, this.i);
    return all;
  }
};

// call on game start
// call to start next move with currentPiece
// queue upcoming piece
board.loadPiece = function() {
  board.currentPiece  = board.upcomingPiece;
  board.upcomingPiece = Piece.random();
};


// call once no more moves for current piece possible
//    --> store the piece on the board
//    --> call next piece in the queue (upcomingPiece) and make it the currentPiece
board.lockPiece = function() {
  var pieceCells = board.currentPiece.getBoardCoords();

  for (var i = 0; i < 4; i++) {
    row = pieceCells[i][1];
    col = pieceCells[i][0];
    board.cells[row][col] = board.currentPiece.type;
    board.playedCells[board.currentPiece.type].push([col, row]);
  }

  recheck: for (var row = 0; row < board.cells.length; row++) {
    if (board.cells[row].reduce((prev, curr) => prev + curr) > 0) {
      clearedLines+=1;
      console.log(clearedLines);
      board.cells.splice(row, 1);
      board.cells.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      console.log(board.cells);
      render();
      continue recheck;
    }
  }

  // TODO: MD check for full rows, remove them and score
  console.log("SCORE IS: " + clearedLines);

  board.loadPiece();
};

board.isPieceMoveValid = function (moveDir) {
  var pieceBoundsCells = board.currentPiece.getBoundsBoardCoords(moveDir);
  var pieceCells = board.currentPiece.getBoardCoords();
  var allPlayedCells = board.playedCells.all();
  for (var playedCell of allPlayedCells) {
    if (isIn(playedCell, pieceBoundsCells) || isIn(playedCell, pieceCells)) {
      console.log("move is invalid....ignoring move....");
      return false;
    }
  }
  return true;
};


// pretty print the current game state
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




// View
var $cells = $("td");


// User Interaction

function render() {
  drawPlayedCells();
  drawCurrentPiece();

}

function drawPlayedCells() {
  for (var row = 0; row < 20; row++) {
    for (var col = 0; col < 10; col++) {
      if (board.cells[row][col] != 0) {
        var type = board.cells[row][col];
        $("#col-" + col + "-row-" + row).addClass("current-piece type-" + type);
      }
    }
  }
}

function drawLockCurrentPiece() {
  unDrawCurrentPiece();
  board.lockPiece();
  var pieceCells = board.currentPiece.getBoardCoords();

  for (var i = 0; i < 4; i++) {
    row = pieceCells[i][1];
    col = pieceCells[i][0];
    board.cells[row][col] = board.currentPiece.type;
    board.playedCells[board.currentPiece.type].push([col, row]);
  }
  render();

  // TODO: MD check for full rows, remove them and score

}

function drawCurrentPiece() {
  board.calculate();
  var pieceCells = board.currentPiece.getBoardCoords();
  for (var row = 0; row < 20; row++) {
    for (var col = 0; col < 10; col++) {
      if (isIn([col,row], pieceCells)) {
        $("#col-" + col + "-row-" + row).addClass("current-piece type-" + board.currentPiece.type);
      }
    }
  }
}

function unDrawCurrentPiece() {
  var pieceCells = board.currentPiece.getBoardCoords();
  for (var row = 0; row < 20; row++) {
    for (var col = 0; col < 10; col++) {
      if (isIn([col,row], pieceCells)) {
        $("#col-" + col + "-row-" + row).removeClass("current-piece type-" + board.currentPiece.type);
      }
    }
  }
}

function startGame() {
  playing = true;
  board.loadPiece();
  render();

}

$(document).on("click", startGame);

$(document).on("keyup", function(event) {
  if (playing) {
    switch (event.keyCode) {
      // ArrowLeft
      case 37:
        unDrawCurrentPiece();
        board.currentPiece.moveLeft();
        render();
        break;

      // ArrowUp
      case 38:
        unDrawCurrentPiece();
        board.currentPiece.rotate();
        render();

      // ArrowRight
      case 39:
        unDrawCurrentPiece();
        board.currentPiece.moveRight();
        render();
        break;

      // ArrowDown
      case 40:
        unDrawCurrentPiece();
        board.currentPiece.moveDown();
        render();
        break;

      default:
        return;
    }
  }
});
