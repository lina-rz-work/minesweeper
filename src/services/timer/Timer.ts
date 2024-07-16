class Timer {
    private timer: HTMLDivElement;
    private start: number | null;
    private distance: number;
    private descriptor: NodeJS.Timeout | null;

    constructor() {
        this.timer = document.querySelector('.time') as HTMLDivElement;
        this.start = null;
        this.distance = 0;
        this.descriptor = null;
    }
    
    public startTimer(): void {
        this.start = Date.now();
                
        const handler = () => {
            if (!this.start) {
                return
            }
            let delta = Date.now() - this.start + this.distance;
            let timestamp = Math.floor(delta / 1000);
            
            this.draw(timestamp);
        };

        this.descriptor = setInterval(handler, 1000);
    }
    
    public stopTimer(): void {
        this.clearTimer();

        if (!this.start) {
            return;
        }
        this.distance += Date.now() - this.start;
    }
    
    private clearTimer(): void {
        if (!this.descriptor) {
            return
        }
        clearInterval(this.descriptor);
        this.descriptor = null;
    }

    private draw(value: number): void {
        const date = new Date(0, 0, 0, 0, 0, value);
        let hours = date.getHours().toString();
        let min = date.getMinutes().toString();
        let sec = date.getSeconds().toString();
        
        if (Number(min) < 10) {
            min = `0${min}`;
        }

        if (Number(sec) < 10) {
            sec = `0${sec}`;
        }

        this.timer.innerHTML = `${min}:${sec}`;

        
        if (Number(min) >= 60) {
            if (Number(hours) < 10) {
                hours = `0${hours}`;
            }

            this.timer.innerHTML = `${hours}:${min}:${sec}`;
            this.timer.style.paddingLeft = '10px';
        }
    }
}

export default Timer;
