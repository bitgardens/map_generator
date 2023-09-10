import { TileTypes } from "../components/Tile/types";

export class MapProcess {
  SIZE: number;
  tiles: TileTypes[];

  constructor(SIZE: number, tiles: TileTypes[]) {
    this.SIZE = SIZE;
    this.tiles = tiles;
  }

  /**
   * Converts the tile array position into cartesian
   * @returns X and Y relative to that position
   */
  private to_cords(arr_pos: number): { x: number; y: number } {
    const x_pos = arr_pos % this.SIZE;
    // @ts-ignore
    const y_pos = parseInt(arr_pos / this.SIZE);

    return {
      y: y_pos,
      x: x_pos,
    };
  }

  /**
   * Converts the tile cartesian position into array
   * @returns arr_pos relative to the x,y
   */
  private from_cords(x: number, y: number): number {
    return y * this.SIZE + x;
  }

  /**
   * Checks the border values
   */
  private get_borders(arr_pos: number): {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  } {
    const { x, y } = this.to_cords(arr_pos);

    let left = x != 0 && this.tiles[this.from_cords(x - 1, y)] == "none";
    let right =
      x != this.tiles.length - 1 &&
      this.tiles[this.from_cords(x + 1, y)] == "none";
    let top = y != 0 && this.tiles[this.from_cords(x, y - 1)] == "none";
    let bottom =
      y != this.tiles.length - 1 &&
      this.tiles[this.from_cords(x, y + 1)] == "none";

    if (left && right) right = false;

    // priority = top
    if (top && bottom) bottom = false;

    return {
      left,
      right,
      top,
      bottom,
    };
  }

  private return_grass_type(arr_pos: number): string {
    const { left, right, top, bottom } = this.get_borders(arr_pos);

    if (!left && !right && !top && !bottom) return "grass";

    return `gb${left ? "l" : right ? "r" : ""}${top ? "t" : bottom ? "b" : ""}`;
  }
  /**
   * RUN!
   */
  public run() {
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i] == "grass") {
        const a = this.return_grass_type(i);
        console.log(a);
      }
    }
  }
}
