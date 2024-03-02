import EntityInterface from "../entities/EntityInterface";
import MineCell from "../entities/MineCell";
import EmptyCell from "../entities/EmptyCell";
import GameStatsInterface from "./gameInterfaces/GameStatsInterface";

class Game3 {
    public stats: GameStatsInterface;
    public gameEntites: Map<string, EntityInterface>;
    public mines: EntityInterface[];    // стоит ли добавить св.во? -> смотри clickCell у MineCell
    public gameBoard: EntityInterface[];    
    // mineIndexes

    constructor(rows: number, cols: number, mines: number) {
        this.stats = {
            rows: rows,
            cols: cols,
            mines: mines,
            flags: 0,
            openedCells: 0,
        };
        this.gameEntites = new Map;
        this.mines = [];
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
            this.gameEntites.set(key, mine);
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
        this.mines = Array.from(this.gameEntites.values());    // сохрани просто в отдельную перемнную 

        this.mines.forEach(mine => {
            if (mine instanceof MineCell) {
                mine.surroundWithNumbers();
            }
        });
    }

    private createEmptyCells() {
        const allCells: number = this.stats.rows * this.stats.cols;
        
        for (let i = 0; i < allCells; i++) {
            const mine = this.gameEntites.get(`mine_${i}`);
            const number = this.gameEntites.get(`number_${i}`);

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
        this.gameEntites.set(key, emptyCell);
    }
}

export default Game3;