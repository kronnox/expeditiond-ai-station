export abstract class GameConfig {

    private static _truckSize = 450;
    private static _spaceObjectSize = 200;
    private static _radarRange = 450;
    private static _shakeFactor: number = 20;

    static get truckSize(): number {
        return this._truckSize;
    }

    static get spaceObjectSize(): number {
        return this._spaceObjectSize;
    }

    static get shakeFactor(): number {
        return this._shakeFactor;
    }

    static get radarRange(): number {
        return this._radarRange;
    }
}
