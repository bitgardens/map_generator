import { TileInterface, TileTypes } from "../components/Tile/types";

const handle_process_map = (map: TileInterface[][]): TileInterface[][] => {
  const handle_grass_tile = (column: number, row: number): TileTypes => {
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

  const handle_grass_inside_border = (column: number, row: number) => {
    let left = column != 0 && map[column - 1][row].type?.startsWith("bg");
    let right =
      column != map.length - 1 && map[column + 1][row].type?.startsWith("bg");
    let top = row != 0 && map[column][row - 1].type?.startsWith("bg");
    let bottom =
      row != map[column].length - 1 &&
      map[column][row + 1].type?.startsWith("bg");

    if (left && top) return "giblt"; // grass inside border left top
    if (right && top) return "gibrt"; // grass inside border right top
    if (left && bottom) return "giblb"; // grass inside border left bottom
    if (right && bottom) return "gibrb"; // grass inside border right bottom
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

  for (let column = 0; column < map.length; column++) {
    for (let row = 0; row < map[column].length; row++) {
      let type: any = map[column][row].type;
      if (!map[column][row].type?.startsWith("gb")) {
        console.log(`${handle_grass_inside_border(column, row)} - ${column}, ${row}`)
      }
      map[column][row].type = type;
    }
  }

  return map;
};

export default handle_process_map;
