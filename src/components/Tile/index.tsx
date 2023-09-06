import React from "react";
import { Container } from "./styles";
import { TileComponentInterface, TileInterface } from "./types";

const Tile: React.FC<TileComponentInterface> = ({
  type = "none",
  onClick,
  onHover,
}) => {
  return (
    <Container
      onMouseEnter={onHover}
      onClick={onClick}
      type={type}
    >
      {type == "none" ? "*" : ""}
    </Container>
  );
};

export default Tile;
