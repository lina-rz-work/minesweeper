import ResultInterface from "../../core/result/ResultInterface";

class WinResult implements ResultInterface {
    
    public factoryMethod(): HTMLDivElement {
        const modalBody = document.createElement('div');
        modalBody.classList.add('win_result');

        modalBody.append(this.createHeader());
        modalBody.append(this.createWingImage('right_wing'));
        modalBody.append(this.createWingImage('left_wing'));
        modalBody.append(this.createResultMessage());
        modalBody.append(this.createGameTime());

        return modalBody;
    }

    private createHeader(): HTMLHeadingElement {
        const header = document.createElement('h3');
        header.textContent = 'You win!';

        return header;
    }

    private createWingImage(side: string): HTMLImageElement {
        const img = document.createElement('img');
        img.src = './assets/img/Wing.png';
        img.classList.add(side);

        return img;
    }

    private createResultMessage(): HTMLDivElement {
        const resultMessage = document.createElement('div');
        resultMessage.classList.add('win_result_message');
        resultMessage.innerHTML = `Great job! It's now a safe zone thanks to your skills!`;
        
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

export default WinResult;
