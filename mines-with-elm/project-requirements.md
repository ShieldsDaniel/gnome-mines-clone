# Minesweeper game software requirements

## User stories

### Options page

* > As a player I should be able to select from a list of standard game modes (number of rows, columns and mines).

* > As a player I should be able to manually select the number of rows and columns as well as the number of mines before staring a game.

* > As a player I should not be able to manually select a game mode with the mine number over 2/3 of the number of cells on the game board.

* > As a player I should be able to begin the game after I have selected the game mode.

### The Game

* > As a player I should be able to left click any of the undiscovered cells of a new game without the possibility of clicking a mine.

* > As a player I should be able to right click any of the undiscovered cells of the game board to mark the cell as a mine.

* > As a player I should be able to right click any of the undiscovered cells that are marked as a mine to lift this mark.

* > As a player I should be able to left click any undiscovered cell that is not a mine to uncover the number of mines that are adjacent to the clicked cell.

* > As a player I should lose the game if I left click any undiscovered cell that is a mine.

* > As a player I should win the game if all cells that are not mines have been clicked.

* > As a player I should be able click a button to go back to the options page after winning or losing.

* > As a player I should be able to left click an uncovered cell that has a number of adjacent mines greater than 0 and have the correct number of adjacent cells marked as mines to uncover all undiscovered cells adjacent to the clicked cell that are not marked as a mine.

* > As a player I should see the count of cells marked as mines and the total mine count above the game board.

* > As a player I should see the time that has elapsed since I started the game above the game board.