import React from "react";
import { Container } from "./styles";
import { TileComponentInterface } from "./types";

// @ts-ignore
import tiles1 from "../../assets/tiles1.png";

const Tile: React.FC<TileComponentInterface> = ({
  type = "none",
  onClick,
  onHover,
}) => {
  return (
    <Container onMouseEnter={onHover} onClick={onClick} type={type}>
    </Container>
  );
};

export default Tile;
