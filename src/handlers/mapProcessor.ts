import { TileInterface, TileTypes } from "../components/Tile/types";

export class MapProcess {
  SIZE: number;
  tiles: TileTypes[];
  new_tiles: TileInterface[][];

  constructor(SIZE: number, tiles: TileTypes[]) {
    this.SIZE = SIZE;
    this.tiles = tiles;
    this.new_tiles = [];
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

  /** Check inside border */
  private get_inside_borders(arr_pos: number): {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  } {
    const { x, y } = this.to_cords(arr_pos);
    let left = x != 0 && this.new_tiles[x - 1][y].type?.startsWith("gb");
    let right =
      x != this.new_tiles.length - 1 &&
      this.new_tiles[x + 1][y].type?.startsWith("gb");
    let top = y != 0 && this.new_tiles[x][y - 1].type?.startsWith("gb");
    let bottom =
      y != this.new_tiles.length - 1 &&
      this.new_tiles[x][y + 1].type?.startsWith("gb");

    return {
      left: left == undefined ? false : left,
      right: right == undefined ? false : right,
      top: top == undefined ? false : top,
      bottom: bottom == undefined ? false : bottom,
    };
  }

  private return_border_inside_type(arr_pos: number): string | any {
    const { left, right, top, bottom } = this.get_inside_borders(arr_pos);
    const { x, y } = this.to_cords(arr_pos);

    // grass border inside left top
    if (left && top) {
      const left_type = this.new_tiles[x - 1][y].type;
      const top_type = this.new_tiles[x][y - 1].type;

      if (
        (left_type == "gbt" || left_type == "gblt") &&
        (top_type == "gbl" || top_type == "gblt")
      ) {
        return "gbilt";
      }
    }

    // open to rigth & open to top
    if (right && top) {
      const top_type = this.new_tiles[x][y - 1].type;
      const right_type = this.new_tiles[x + 1][y].type;

      if (
        (right_type == "gbt" || right_type == "gbrt") &&
        (top_type == "gbr" || top_type == "gbrt")
      ) {
        return "gbirt";
      }
    } // grass border inside right top

    // open to left & open to bottom
    if (left && bottom) {
      const left_type = this.new_tiles[x - 1][y].type;
      const bottom_type = this.new_tiles[x][y + 1].type;
      // console.log({left_type, bottom_type});

      if (
        (left_type == "gbb" || left_type == "gblb") &&
        (bottom_type == "gbl" || bottom_type == "gblb")
      ) {
        return "gbilb";
      }
    } // grass border inside left bottom

    if (right && bottom) {
      const right_type = this.new_tiles[x + 1][y].type;
      const bottom_type = this.new_tiles[x][y + 1].type;

      if (
        (right_type == "gbb" || right_type == "gbrb") &&
        (bottom_type == "gbr" || bottom_type == "gbrb")
      ) {
        return "gbirb";
      }
    } // grass border inside right bottom

    return "grass";
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

  private return_grass_type(arr_pos: number): string | any {
    const { left, right, top, bottom } = this.get_borders(arr_pos);

    if (!left && !right && !top && !bottom) return "grass";

    return `gb${left ? "l" : right ? "r" : ""}${top ? "t" : bottom ? "b" : ""}`;
  }
  /**
   * RUN!
   */
  public run(): TileInterface[][] {
    let tiles_matriz: TileInterface[][] = Array.from(Array(this.SIZE), () => {
      return new Array(this.SIZE).fill({ type: "none" });
    });
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i] == "grass") {
        const { x, y } = this.to_cords(i);
        tiles_matriz[x][y] = { type: this.return_grass_type(i) };
      }
    }

    this.new_tiles = tiles_matriz;
    // const value = this.from_cords(17, 10);
    // console.log(this.return_border_inside_type(value));

    for (let i = 0; i < this.tiles.length; i++) {
      const { x, y } = this.to_cords(i);
      if (!this.new_tiles[x][y].type?.startsWith("bg")) {
        if (this.return_border_inside_type(i) != "grass") {
          tiles_matriz[x][y] = { type: this.return_border_inside_type(i) };
        }
      }
    }

    return tiles_matriz;
  }
}
