import { ProcessTileType } from "../ProcessTile/types";

export interface TileInterface {
  type?: possibles_type;
}

export interface TileComponentInterface extends TileInterface {
  onClick: any;
  onHover?: any;
}

type possibles_type =
  | "gbb"
  | "gbl"
  | "gblb"
  | "gblt"
  | "gbr"
  | "gbrb"
  | "gbrt"
  | "gbt"
  | "gb"
  | "grass"
  | "none"
  | "grass"
  | "snow"
  | "dirt"
  | "sand";
