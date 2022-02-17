import {GameComponent} from "../game.component";

export abstract class GameObject {

    protected game: GameComponent;

    protected active: boolean;

    protected constructor(game: GameComponent) {
        this.game = game;
        this.active = true;
    }

    public abstract draw(ctx: CanvasRenderingContext2D): void;

    public abstract update(delta: number): void;

    public isActive() {
        return this.active;
    }
}
