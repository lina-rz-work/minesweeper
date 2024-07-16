# Minesweeper Game
This project is a TypeScript-based implementation of the classic Minesweeper game, designed with an object-oriented programming (OOP) approach. The game offers multiple difficulty levels (easy, medium, hard) and an optional hint mode, providing a customizable and engaging gaming experience.

#### Features:
\- Difficulty Modes: Players can choose from three difficulty levels to suit their skills and preferences.<br>
\- Hint System: Includes an optional hint mode that assists players during the game.<br>
\- Game Interface: Timer to track the duration of the current game session.<br>
Flag counter indicating the number of flags relative to the number of mines.<br> 
Hint option to give players strategic insights into the game board.<br>
\- Gameplay Mechanics: Left-clicking on a cell reveals its contents. If the cell does not contain a mine, it displays either the number of adjacent mines or an "unmined" area. Right-clicking on a cell allows players to place a flag, marking cells suspected to contain mines and preventing accidental clicks. 
Victory is achieved by successfully uncovering all cells that do not contain mines.

The game is available at https://lina-rz-work.github.io/ms-draft/

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn start

# production mode
$ yarn start:prod
```
