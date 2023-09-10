import React, { useState, useEffect } from "react";

import {
  Container,
  Main,
  MapGrid,
  Subtitle,
  TileComponent,
  TileSubtitle,
} from "./styles";
import { TileColor } from "../Tile/colors";
import { TileTypes } from "../Tile/types";

const Canvas: React.FC = () => {
  const SIZE = 50;

  const [tiles, setTiles] = useState<TileTypes[]>(
    Array(SIZE * SIZE).fill("none")
  );

  const [selected, setSelected] = useState<TileTypes>("grass");

  const [dragEnabled, setDragEnabled] = useState(false);

  useEffect(() => {
    addEventListener("mousedown", () => {
      setDragEnabled(true);
    });

    addEventListener("mouseup", () => {
      setDragEnabled(false);
    });
  }, []);

  const handleChangeTile = (index: number) => {
    let tmp = [...tiles];
    tmp[index] = selected;
    setTiles(tmp);
  };

  return (
    <Container>
      <header>
        <img />
        <h1>Map generator</h1>
      </header>

      <Subtitle>
        <TileSubtitle>
          <TileComponent
            style={{
              backgroundColor: TileColor.type.none,
            }}
            onClick={() => {
              setSelected("none");
            }}
          />
          <h3>Agua</h3>
        </TileSubtitle>
        <TileSubtitle>
          <TileComponent
            style={{
              backgroundColor: TileColor.type.grass,
            }}
            onClick={() => {
              setSelected("grass");
            }}
          />
          <h3>Grama</h3>
        </TileSubtitle>
      </Subtitle>

      <Main>
        <MapGrid width={SIZE}>
          {tiles.map((value, index) => (
            <div
              onClick={() => {
                handleChangeTile(index);
              }}
              onMouseEnter={() => {
                if (!dragEnabled) return;
                handleChangeTile(index);
              }}
              style={{
                backgroundColor: TileColor.type[value],
              }}
            />
          ))}
        </MapGrid>
      </Main>
    </Container>
  );
};

export default Canvas;
