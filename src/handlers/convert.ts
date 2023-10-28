import { MapProcess } from "./mapProcessor";

export class Convert extends MapProcess {

  constructor() {
  }
  /**
   * Converts the tile array position into cartesian
   * @returns X and Y relative to that position
   */
  public static to_cords(arr_pos: number): { x: number; y: number } {
    const x_pos = arr_pos % Convert.SIZE;
    // @ts-ignore
    const y_pos = parseInt(arr_pos / Convert.SIZE);

    return {
      y: y_pos,
      x: x_pos,
    };
  }

  /**
   * Converts the tile cartesian position into array
   * @returns arr_pos relative to the x,y
   */
  public static from_cords(x: number, y: number): number {
    return y * Convert.SIZE + x;
  }
}
