import React, { useState, useEffect } from "react";

import {
  Container,
  DownloadBtn,
  Main,
  MapColumn,
  MapGrid,
  RunBtn,
  Subtitle,
  TileSubtitle,
  TileTmp,
} from "./styles";
import Tile from "./components/Tile";
import { TileInterface, possibles_type } from "./components/Tile/types";
import handle_process_map from "./handlers/processMap";

const MapGenerator: React.FC = () => {
  const SIZE = 35;

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

  const handleDownload = () => {
    var json_string = JSON.stringify(tiles, undefined, 2);
    var link = document.createElement("a");
    link.download = "data.json";
    var blob = new Blob([json_string], { type: "text/plain" });
    link.href = window.URL.createObjectURL(blob);
    link.click();
  };

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

          <RunBtn
            onClick={() => {
              // fuck react, wanna change this? be my guest
              setTiles(handle_process_map(tiles));
            }}
          >
            Process
          </RunBtn>
          <DownloadBtn
            onClick={() => {
              handleDownload();
            }}
          >
            <h3>Download matriz</h3>
            <p>process it first!</p>
          </DownloadBtn>
        </Subtitle>
      </Main>
    </Container>
  );
};

export default MapGenerator;
