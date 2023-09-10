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
import { TileInterface, TileTypes } from "../Tile/types";
import { MapProcess } from "../../handlers/mapProcessor";

const Canvas: React.FC = () => {
  const SIZE = 50;

  const [tiles, setTiles] = useState<TileTypes[]>(
    Array(SIZE * SIZE).fill("none")
  );

  const [selected, setSelected] = useState<TileTypes>("grass");

  const [dragEnabled, setDragEnabled] = useState(false);

  const [generated, setGenerated] = useState<TileInterface[][]>();

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

      <div
        onClick={() => {
          const map = new MapProcess(SIZE, tiles);
          map.run();
        }}
      >
        RUN
      </div>

      <Main>
        <MapGrid width={SIZE}>
          {tiles.map((value, index) => (
            <div
              key={index}
              onClick={() => {
                handleChangeTile(index);
                const x_pos = index % SIZE;
                // @ts-ignore
                const y_pos = parseInt(index / SIZE);

                console.log({ y: y_pos, x: x_pos });
              }}
              onMouseEnter={() => {
                if (!dragEnabled) return;
                handleChangeTile(index);
              }}
              style={{
                backgroundColor: TileColor.type[value],
              }}
            >
              {index}
            </div>
          ))}
        </MapGrid>
      </Main>
    </Container>
  );
};

export default Canvas;
