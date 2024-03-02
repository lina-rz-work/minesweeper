import GameStatsInterface from "../game/gameInterfaces/GameStatsInterface";
import WinResult from "../result/winResult";
import gameOver from "./gameOver";


function checkWinner(gameStats: GameStatsInterface): void {
    const mines = gameStats.mines;
    const allCells = gameStats.rows * gameStats.cols;
    const openedCells = gameStats.openedCells;

    if (openedCells === allCells - mines) {
        const allMines = Array.from(document.querySelectorAll('.mine')) as HTMLDivElement[];
        allMines.forEach(mine => {
            const flag = mine.querySelector('.flag_svg') as SVGElement;
            flag.classList.add('dissolve_flag_svg');
        });

        gameOver(new WinResult());
    }
}

export default checkWinner;

