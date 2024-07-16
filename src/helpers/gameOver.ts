import ResultInterface from "../core/result/ResultInterface";
import WinResult from "../services/result/winResult";
import LoseResult from "../services/result/loseResult";
import BoardHandler from "../services/game/BoardHandler";

function gameOver(result: ResultInterface): void {
    const modal = document.querySelector('.modal') as HTMLDivElement;
    const modalContainer = document.querySelector('.modal_result_container') as HTMLDivElement;
    modalContainer?.append(result.factoryMethod());
    
    if (result instanceof WinResult) {
        setTimeout(() => {
            modal.classList.add('show');
            modalContainer.classList.add('show');
        }, 2300);
    }
    
    if (result instanceof LoseResult) {
        setTimeout(() => {
            modal.classList.add('show');
            modalContainer.classList.add('show');
        }, 300);
    }
    
    const cells = Array.from(document.querySelectorAll('.cell')) as HTMLDivElement[];
    cells.forEach(cell => {
        cell.classList.add('unhovered');
    });
    
    const eyeButton = document.querySelector('.eye_button') as HTMLButtonElement;
    eyeButton.disabled = true;

    const boardHandler = BoardHandler.getInstance();
    boardHandler.removeClickHandler();
}

export default gameOver;
