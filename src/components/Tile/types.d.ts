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
  | "gbilt"
  | "gbirt"
  | "gbilb"
  | "gbirb"
  | "grass"
  | "none"
  | "grass"
  | "snow"
  | "dirt"
  | "sand"
  | "road"
  | "gbb"
  | "sbl"
  | "sblb"
  | "sblt"
  | "sbr"
  | "sbrb"
  | "sbrt"
  | "sbt"
  | "sb"
  | "sbilt"
  | "sbirt"
  | "sbilb"
  | "sbirb"
  | "tree"
  | "tree2"
  | "tree3"
  | "tree4"
  ;
