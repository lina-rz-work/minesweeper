class HintHandler {   // ограничить число подсказок? / Singleton?
    public eyeButton: HTMLButtonElement;

    constructor() {
        this.eyeButton = document.querySelector('.eye_button') as HTMLButtonElement;

        this.setupEventListeners();
    }

    public setupEventListeners(): void {
        const openEye = document.querySelector('.eye_close') as HTMLImageElement;
        const closeEye = document.querySelector('.eye_open') as HTMLImageElement;
        const crosses = Array.from(document.querySelectorAll('.cross_svg')) as HTMLImageElement[];

        this.eyeButton.addEventListener('mousedown', () => {
            openEye.style.visibility = 'hidden';
            closeEye.style.visibility = 'visible';
            crosses.forEach(cross => cross.style.visibility = 'visible');
        });

        this.eyeButton.addEventListener('mouseup', () => {
            openEye.style.visibility = 'visible';
            closeEye.style.visibility = 'hidden';
            crosses.forEach(cross => cross.style.visibility = 'hidden');
        });

        this.eyeButton.addEventListener('mousemove', () => {
            openEye.style.visibility = 'visible';
            closeEye.style.visibility = 'hidden';
            crosses.forEach(cross => cross.style.visibility = 'hidden');
        });

        this.eyeButton.addEventListener('dragstart', e => {
            e.preventDefault();
        });
    }
}

export default HintHandler;

