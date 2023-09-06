import React, { useState, useEffect } from "react";

import {
  Container,
  Main,
  MapColumn,
  MapGrid,
  Subtitle,
  TileSubtitle,
} from "./styles";
import Tile from "./components/Tile";
import { TileInterface, possibles_type } from "./components/Tile/types";

const MapGenerator: React.FC = () => {
  const SIZE = 50;

  const [tiles, setTiles] = useState<TileInterface[][]>(
    Array(SIZE).fill(Array(SIZE).fill({ type: "none" }))
  );

  const [selected, setSelected] = useState<possibles_type>("grass");

  const [dragEnabled, setDragEnabled] = useState(false);

  const changeTileColor = (index_i: number, index_j: number) => {
    setTiles(
      tiles.map((column, ii) => {
        if (ii == index_i) {
          return column.map((data, jj) => {
            if (jj == index_j) {
              return {
                type: selected,
              };
            } else {
              return data;
            }
          });
        } else {
          return column;
        }
      })
    );
  };

  useEffect(() => {
    addEventListener("mousedown", () => {
      setDragEnabled(true);
    });

    addEventListener("mouseup", () => {
      setDragEnabled(false);
    });
  });

  return (
    <Container>
      <header>
        <img />
        <h1>Map generator</h1>
      </header>

      <Main>
        <MapGrid>
          {tiles?.map((i, index_i) => (
            <MapColumn key={index_i}>
              {i.map(({ type }, index_j) => (
                <Tile
                  key={index_j}
                  onClick={() => {
                    changeTileColor(index_i, index_j);
                  }}
                  onHover={() => {
                    if (!dragEnabled) return;
                    console.log(`${index_j}`)
                    changeTileColor(index_i, index_j);
                  }}
                  type={type}
                />
              ))}
            </MapColumn>
          ))}
        </MapGrid>

        <Subtitle>
          <TileSubtitle>
            <Tile
              onClick={() => {
                setSelected("none");
              }}
              type="none"
            />
            <h3>None</h3>
          </TileSubtitle>
          <TileSubtitle>
            <Tile
              onClick={() => {
                setSelected("grass");
              }}
              type="grass"
            />
            <h3>Grass</h3>
          </TileSubtitle>
          <TileSubtitle>
            <Tile
              onClick={() => {
                setSelected("snow");
              }}
              type="snow"
            />
            <h3>Snow</h3>
          </TileSubtitle>
          <TileSubtitle>
            <Tile
              onClick={() => {
                setSelected("dirt");
              }}
              type="dirt"
            />
            <h3>Dirt</h3>
          </TileSubtitle>
          <TileSubtitle>
            <Tile
              onClick={() => {
                setSelected("sand");
              }}
              type="sand"
            />
            <h3>Sand</h3>
          </TileSubtitle>
        </Subtitle>
      </Main>
    </Container>
  );
};

export default MapGenerator;
