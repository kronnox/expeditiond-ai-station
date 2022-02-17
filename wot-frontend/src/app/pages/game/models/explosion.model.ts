import {Particle} from "./particle.model";
import {GameObject} from "./game-object.model";
import {GameComponent} from "../game.component";

export class Explosion extends GameObject {

    private readonly x: number;
    private readonly y: number;
    private readonly particleCount: number;

    private particles: Particle[] = [];

    constructor(game: GameComponent, x: number, y: number) {
        super(game);

        this.x = x;
        this.y = y;
        this.particleCount = 100;

        this.active = true;

        this.initParticles();
    }

    private initParticles(): void {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.game, this.x, this.y));
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        for (let particle of this.particles) {
            particle.draw(ctx);
        }
    }

    public update(delta: number): void {
        let activeSum = false;
        this.particles.forEach((particle, i, o) => {
            if (particle.isActive()) {
                particle.update(delta);
                activeSum = true;
            } else {
                o.splice(i, 1);
                console.log("remove");
            }
        });
        this.active = activeSum;
    }

}
