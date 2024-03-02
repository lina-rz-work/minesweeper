import GameRules from "./menuComponents/GameRules";
import GameModes from "./menuComponents/GameModes";
import GameHints from "./menuComponents/GameHints";
import GameStart from "./menuComponents/GameStart";

class Menu {
    public initializeMenu(): void {
        const gameRules = new GameRules();
        const gameMode = new GameModes();
        const gameHints = new GameHints();
        const gameStart = new GameStart();
    }
}

export default Menu;

