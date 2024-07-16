import MineCell from "./cells/MineCell";
import EmptyCell from "./cells/EmptyCell";
import CellInterface from "../../core/cell/CellInterface";
import GameStatsInterface from "../../core/game/GameStatsInterface";

class Board {
    public stats: GameStatsInterface;
    public mines: CellInterface[];
    public gameCells: Map<string, CellInterface>;
    public gameBoard: CellInterface[];

    constructor(rows: number, cols: number, mines: number) {
        this.stats = {
            rows: rows,
            cols: cols,
            mines: mines,
            flags: 0,
            openedCells: 0,
        };
        this.mines = [];
        this.gameCells = new Map;
        this.gameBoard = [];
    }

    public create(): void {
        this.createMines();
        this.createNumbers();
        this.createEmptyCells();
    }

    private createMines() {
        const mineIndexes = this.mineIndexes();

        for (let index of mineIndexes) {
            const mine = new MineCell(this, index);
            mine.create();

            const key = `mine_${index}`;
            mine.cell.setAttribute('data-key', key);

            this.gameBoard[index] = mine;
            this.gameCells.set(key, mine);
        }
    }

    private mineIndexes(): number[] {
        const mineIndexes: number[] = [];
        const allCells: number = this.stats.rows * this.stats.cols;

        while(mineIndexes.length < this.stats.mines) {
            const mineIndex = Math.floor(Math.random() * (allCells - 1)) + 1;
            if (!mineIndexes.includes(mineIndex)) {
                mineIndexes.push(mineIndex);
            }
        }

        return mineIndexes;
    }

    private createNumbers(): void {
        this.mines = Array.from(this.gameCells.values());

        this.mines.forEach(mine => {
            if (mine instanceof MineCell) {
                mine.surroundWithNumbers();
            }
        });
    }

    private createEmptyCells() {
        const allCells: number = this.stats.rows * this.stats.cols;
        
        for (let i = 0; i < allCells; i++) {
            const mine = this.gameCells.get(`mine_${i}`);
            const number = this.gameCells.get(`number_${i}`);

            if (mine || number) {
                continue;
            }

            this.createEmptyCell(i);
        }
    }

    private createEmptyCell(index: number) {
        const emptyCell = new EmptyCell(this, index);
        emptyCell.create();

        const key = `emptyCell_${index}`;
        emptyCell.cell.setAttribute('data-key', key);
        
        this.gameBoard[index] = emptyCell;
        this.gameCells.set(key, emptyCell);
    }
}

export default Board;
