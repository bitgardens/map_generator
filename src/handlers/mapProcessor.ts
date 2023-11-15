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
  public to_cords(arr_pos: number): { x: number; y: number } {
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
   * Get the borders inside ```_bi``` status
   * @param starts_with tile type to check. ```sb|gb|road|...```
   */
  private get_inside_borders(
    arr_pos: number,
    starts_with: string
  ): {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  } {
    const { x, y } = this.to_cords(arr_pos);
    let left = x != 0 && this.new_tiles[x - 1][y].type?.startsWith(starts_with);
    let right =
      x != this.new_tiles.length - 1 &&
      this.new_tiles[x + 1][y].type?.startsWith(starts_with);
    let top = y != 0 && this.new_tiles[x][y - 1].type?.startsWith(starts_with);
    let bottom =
      y != this.new_tiles.length - 1 &&
      this.new_tiles[x][y + 1].type?.startsWith(starts_with);

    return {
      left: left == undefined ? false : left,
      right: right == undefined ? false : right,
      top: top == undefined ? false : top,
      bottom: bottom == undefined ? false : bottom,
    };
  }

  /**
   * Get the outisde borders ```_bi``` status
   * @param starts_with tile type to check. ```sb|gb|road|...```
   */
  private get_outside_borders(
    arr_pos: number,
    starts_with: string
  ): {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  } {
    const { x, y } = this.to_cords(arr_pos);

    let left =
      x != 0 && this.tiles[this.from_cords(x - 1, y)].startsWith(starts_with);
    let right =
      x != this.tiles.length - 1 &&
      this.tiles[this.from_cords(x + 1, y)].startsWith(starts_with);
    let top =
      y != 0 && this.tiles[this.from_cords(x, y - 1)].startsWith(starts_with);
    let bottom =
      y != this.tiles.length - 1 &&
      this.tiles[this.from_cords(x, y + 1)].startsWith(starts_with);

    return {
      left: left == undefined ? false : left,
      right: right == undefined ? false : right,
      top: top == undefined ? false : top,
      bottom: bottom == undefined ? false : bottom,
    };
  }

  /**
   * Get the type of inside borders
   * @param arr_pos Position in array
   * @param tile The full name of the tile ```snow|grass|...```
   * @param border_prefix The prefix for the returned type ```sb``` for snow ```gb``` for grass.
   */
  private return_border_inside_type(
    arr_pos: number,
    tile: string,
    borders_prefix: string
  ): string | any {
    const { left, right, top, bottom } = this.get_inside_borders(
      arr_pos,
      borders_prefix
    );
    const { x, y } = this.to_cords(arr_pos);

    const tile_prefix = tile[0];

    // _ border inside left top
    if (left && top) {
      const left_type = this.new_tiles[x - 1][y].type;
      const top_type = this.new_tiles[x][y - 1].type;

      if (
        (left_type == `${tile_prefix}bt` || left_type == `${tile_prefix}blt`) &&
        (top_type == `${tile_prefix}bl` || top_type == `${tile_prefix}blt`)
      ) {
        return `${tile_prefix}bilt`;
      }
    }

    // _ border inside right top
    if (right && top) {
      const top_type = this.new_tiles[x][y - 1].type;
      const right_type = this.new_tiles[x + 1][y].type;

      if (
        (right_type == `${tile_prefix}bt` ||
          right_type == `${tile_prefix}brt`) &&
        (top_type == `${tile_prefix}br` || top_type == `${tile_prefix}brt`)
      ) {
        return `${tile_prefix}birt`;
      }
    }

    // _ border inside left bottom
    if (left && bottom) {
      const left_type = this.new_tiles[x - 1][y].type;
      const bottom_type = this.new_tiles[x][y + 1].type;

      if (
        (left_type == `${tile_prefix}bb` || left_type == `${tile_prefix}blb`) &&
        (bottom_type == `${tile_prefix}bl` ||
          bottom_type == `${tile_prefix}blb`)
      ) {
        return `${tile_prefix}bilb`;
      }
    }

    // _ border inside right bottom
    if (right && bottom) {
      const right_type = this.new_tiles[x + 1][y].type;
      const bottom_type = this.new_tiles[x][y + 1].type;

      if (
        (right_type == `${tile_prefix}bb` ||
          right_type == `${tile_prefix}brb`) &&
        (bottom_type == `${tile_prefix}br` ||
          bottom_type == `${tile_prefix}brb`)
      ) {
        return `${tile_prefix}birb`;
      }
    }

    return tile;
  }

  /**
   * Get the type of outside borders
   * @param arr_pos Position in array
   * @param tile The full name of the tile ```snow|grass|...```
   * @param border_prefix The prefix for the returned type ```sb``` for snow ```gb``` for grass.
   */
  private return_outside_border_type(
    arr_pos: number,
    tile: string,
    border_prefix: string
  ): string | any {
    const { left, right, top, bottom } = this.get_outside_borders(
      arr_pos,
      "none"
    );

    if (!left && !right && !top && !bottom) return tile;

    return `${border_prefix}${left ? "l" : right ? "r" : ""}${
      top ? "t" : bottom ? "b" : ""
    }`;
  }

  /**
   * Get the Path|Road tile_type.
   * @param arr_pos Position in array
   */
  private return_path_type(arr_pos: number): string | any {
    const { left, right, top, bottom } = this.get_outside_borders(
      arr_pos,
      "road"
    );

    if (top && bottom) {
      return "road10";
    } else if (left && right) {
      return "road8";
    } else if (left && bottom) {
      return "road7";
    } else if (right && bottom) {
      return "road9";
    } else if (left && top) {
      return "road2";
    } else if (right && top) {
      return "road4";
    } else if (top && !bottom) {
      return "road1";
    } else if (!top && bottom) {
      return "road3";
    } else if (!left && right) {
      return "road6";
    } else if (left && !right) {
      return "road5";
    } else {
      console.log(`> Invalid road type at ${this.to_cords(arr_pos)}`);
      return "grass";
    }
  }

  /**
   * RUN!
   */
  public run(): TileInterface[][] {
    let tiles_matriz: TileInterface[][] = Array.from(Array(this.SIZE), () => {
      return new Array(this.SIZE).fill({ type: "none" });
    });

    /** Grass outside borders */
    for (let i = 0; i < this.tiles.length; i++) {
      const { x, y } = this.to_cords(i);
      if (this.tiles[i] == "grass") {
        tiles_matriz[x][y] = {
          type: this.return_outside_border_type(i, "grass", "gb"),
        };
      } else if (this.tiles[i] == "snow") {
        tiles_matriz[x][y] = {
          type: this.return_outside_border_type(i, "snow", "sb"),
        };
      }
    }

    this.new_tiles = tiles_matriz;
    /** Grass inside borders */
    for (let i = 0; i < this.tiles.length; i++) {
      const { x, y } = this.to_cords(i);
      if (this.new_tiles[x][y].type == "grass") {
        tiles_matriz[x][y] = {
          type: this.return_border_inside_type(i, "grass", "gb"),
        };
      } else if (this.new_tiles[x][y].type == "snow") {
        tiles_matriz[x][y] = {
          type: this.return_border_inside_type(i, "snow", "sb"),
        };
      }
    }

    /** Paths */
    for (let i = 0; i < this.tiles.length; i++) {
      const { x, y } = this.to_cords(i);
      if (this.tiles[i].startsWith("road")) {
        tiles_matriz[x][y] = { type: this.return_path_type(i) };
      }
    }


    /** Re-Add decorators */
    for(let i =0; i < this.tiles.length; i++){
      if(this.tiles[i] == "tree" ||this.tiles[i] == "tree2" || this.tiles[i] == "tree3" || this.tiles[i] == "tree4" ) {
        const {x,y} = this.to_cords(i);
        tiles_matriz[x][y] = {type: this.tiles[i]}
      }
    }


    return tiles_matriz;
  }
}
