# Project #1: The Game

### TETRIS
<!-- a description of the game -->
![Tetris](https://upload.wikimedia.org/wikipedia/en/7/7c/Tetris-VeryFirstVersion.png)

> "Tetriminos" are game pieces shaped like tetrominoes, geometric shapes composed of four square blocks each. A random sequence of Tetriminos fall down the playing field (a rectangular vertical shaft, called the "well" or "matrix"). The objective of the game is to manipulate these Tetriminos, by moving each one sideways (if the player feels the need) and rotating it by 90 degree units, with the aim of creating a horizontal line of ten units without gaps. When such a line is created, it disappears, and any block above the deleted line will fall. When a certain number of lines are cleared, the game enters a new level. As the game progresses, each level causes the Tetriminos to fall faster, and the game ends when the stack of Tetriminos reaches the top of the playing field and no new Tetriminos are able to enter. Some games also end after a finite number of levels or lines. 
> 
> —<cite>Wikipedia contributors. "Tetris." Wikipedia, The Free Encyclopedia.</cite>

![Tetris Pieces](http://i.imgur.com/65G37Aq.png)

![Tetris Pieces: Rotations](http://colinfahey.com/tetris/tetris_diagram_pieces_orientations_new.jpg)

---

### Technologies
<!-- lists and explanations of the technologies used -->
* JavaScript
* jQuery 

---

### Design
<!-- the design approach taken -->
* Tetris board is modeled as an array of arrays
* Each Tetris piece and its variations are mapped to 4x4 grid
	* Origin is at the top, left corner
	* All transformations are performed on the Origin
	* A piece's cell coordinates are calculated on each move with respect to the borders of the board and the previously played pieces to check for collisions
	* If no valid moves are possible for the current piece, it is added to the board and the next piece is presented

---

### Get Started
<!-- installation instructions -->
Hit the button.


---

### Next Steps
<!-- unsolved problems and/or planned features -->
Score.
Tick.
View.
