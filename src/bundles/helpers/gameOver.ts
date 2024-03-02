import ResultInterface from "../result/ResultInterface";
import WinResult from "../result/winResult";
import LoseResult from "../result/loseResult";
import BoardClickHandler from "../boardClickHandler/boardClickHandler";

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

    const boardClickHandler = BoardClickHandler.getInstance();
    boardClickHandler.removeClickHandler();
}

export default gameOver;


