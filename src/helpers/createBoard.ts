function createBoard(rows: number, cols: number): HTMLDivElement {
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game_board');

    for (let i = 1; i <= rows; i++) {
        for(let j = 1; j <= cols; j++) {
            const cell = document.createElement('div'); 
            cell.classList.add('cell');
            gameBoard.append(cell);
        }
        
        const lineBreak = document.createElement('br');
        gameBoard.append(lineBreak);
    }

    return gameBoard;
}

export default createBoard;
