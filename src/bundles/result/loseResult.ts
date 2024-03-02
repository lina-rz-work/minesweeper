import ResultInterface from "./ResultInterface";

class LoseResult implements ResultInterface {

    public factoryMethod(): HTMLDivElement {
        const modalBody = document.createElement('div');
        modalBody.classList.add('lose_result');

        modalBody.append(this.createHeader());
        modalBody.append(this.createResultMessage());
        modalBody.append(this.createGameTime());

        return modalBody;
    }

    private createHeader(): HTMLHeadingElement {
        const header = document.createElement('h3');
        header.textContent = 'You lose!';

        return header;
    }

    private createResultMessage(): HTMLDivElement {
        const resultMessage = document.createElement('div');
        resultMessage.classList.add('lose_result_message');
        resultMessage.innerHTML = `Oops! Mines detected, <br> but keep your spirits up! <br> Give it another shot. Good luck!`;
        
        return resultMessage;
    }

    createGameTime(): HTMLDivElement {
        const gameTime = document.createElement('div');
        const message = document.createElement('div');
        const spentTime = document.createElement('div');
        const actualSpentTime = document.querySelector('.time');

        message.textContent = 'You completed in: ';
        spentTime.innerHTML = actualSpentTime?.innerHTML as string;
        
        gameTime.classList.add('game_time');
        message.classList.add('game_time_message');
        spentTime.classList.add('spent_time');

        gameTime.append(message);
        gameTime.append(spentTime);

        return gameTime;
    }
}

export default LoseResult;

