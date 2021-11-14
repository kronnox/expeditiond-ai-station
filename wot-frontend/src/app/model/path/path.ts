import {Vector} from "../vector/vector";

export class Path {

  private readonly _anchorA: Vector;
  private readonly _anchorB: Vector;

  constructor(anchorX: Vector, anchorY: Vector) {
    this._anchorA = anchorX;
    this._anchorB = anchorY;
  }

  get anchorA(): Vector {
    return this._anchorA;
  }

  get anchorB(): Vector {
    return this._anchorB;
  }
}
