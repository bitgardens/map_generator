export interface TileInterface {
  type?: possibles_type;
}

export interface TileComponentInterface extends TileInterface {
  onClick: any;
  onHover?: any;
};

export type possibles_type = "none" | "grass" | "snow" | "dirt" | "sand";