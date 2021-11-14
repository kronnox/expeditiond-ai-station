import {Path} from "../path/path";

export class Stroke {

  private readonly _paths: Path[];

  constructor(paths: Path[] = []) {
    this._paths = paths;
  }

  public push(path: Path): void {
    this.paths.push(path);
  }

  public pop(): void {
    this.paths.pop();
  }

  get paths(): Path[] {
    return this._paths;
  }
}
