import Modal from "./modal/Modal";
import GameRules from "./menu/GameRules";
import GameModes from "./menu/GameModes";
import GameHints from "./menu/GameHints";
import GameStart from "./menu/GameStart";

class App {
    public initialize(): void {
        const modal = new Modal();
        const gameRules = new GameRules();
        const gameMode = new GameModes();
        const gameHints = new GameHints();
        const gameStart = new GameStart();
    }
}

export default App;
