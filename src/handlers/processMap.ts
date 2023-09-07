import { TileInterface, possibles_type } from "../components/Tile/types";

const handle_process_map = (map: TileInterface[][]): TileInterface[][] => {
  const handle_grass_tile = (column: number, row: number): possibles_type => {
    let left = column != 0 && map[column - 1][row].type == "none";
    let right = column != map.length - 1 && map[column + 1][row].type == "none";
    let top = row != 0 && map[column][row - 1].type == "none";
    let bottom =
      row != map[column].length - 1 && map[column][row + 1].type == "none";

    // priority = left
    if (left && right) right = false;

    // priority = top
    if (top && bottom) bottom = false;

    const is_border = left || right || top || bottom;

    if (!is_border) return "grass";

    return `gb${left ? "l" : right ? "r" : ""}${top ? "t" : bottom ? "b" : ""}`;
  };

  for (let column = 0; column < map.length; column++) {
    for (let row = 0; row < map[column].length; row++) {
      let type: any = map[column][row].type;
      if (map[column][row].type == "grass") {
        type = handle_grass_tile(column, row);
      }
      map[column][row].type = type;
    }
  }

  return map;
};

export default handle_process_map;
