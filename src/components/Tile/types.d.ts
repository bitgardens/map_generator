import { ProcessTileType } from "../ProcessTile/types";

export interface TileInterface {
  type?: TileTypes;
}

export interface TileComponentInterface extends TileInterface {
  onClick: any;
  onHover?: any;
}

type TileTypes =
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
  | "gbilt"
  | "gbirt"
  | "gbilb"
  | "gbirb"
  | "grass"
  | "snow"
  | "dirt"
  | "sand"
  | "road"
  ;
