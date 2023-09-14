import React, { useState, useEffect } from "react";

// @ts-ignore
import logo from "../../assets/logo.png";

import {
  CTAProcessMap,
  ClearBtn,
  Container,
  Download,
  GeneratedContainer,
  LeftSide,
  Main,
  MapGeneratedColumn,
  MapGeneratedGrid,
  MapGrid,
  Subtitle,
  TileComponent,
  TileSubtitle,
} from "./styles";
import { TileColor } from "../Tile/colors";
import { TileInterface, TileTypes } from "../Tile/types";
import { MapProcess } from "../../handlers/mapProcessor";
import Tile from "../Tile";

const Canvas: React.FC = () => {
  const SIZE = 10;

  const [tiles, setTiles] = useState<TileTypes[]>(
    Array(SIZE * SIZE).fill("none")
  );

  const [selected, setSelected] = useState<TileTypes>("grass");

  const [dragEnabled, setDragEnabled] = useState(false);

  const [generated, setGenerated] = useState<TileInterface[][] | null>();

  const [opened, setOpened] = useState(false);

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

  const handleDownload = () => {
    var json_string = JSON.stringify(generated, undefined, 2);
    var link = document.createElement("a");
    link.download = "level.json";
    var blob = new Blob([json_string], { type: "text/plain" });
    link.href = window.URL.createObjectURL(blob);
    link.click();
  };

  return (
    <Container>
      <header>
        <img src={logo} />
      </header>

      <Main>
        <MapGrid width={SIZE}>
          {tiles.map((value, index) => (
            <div
              key={index}
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

        <LeftSide>
          <Subtitle>
            <TileSubtitle
              onClick={() => {
                setSelected("none");
              }}
            >
              <TileComponent
                style={{
                  backgroundColor: TileColor.type.none,
                }}
              />
              <h3>Agua</h3>
            </TileSubtitle>
            <TileSubtitle
              onClick={() => {
                setSelected("grass");
              }}
            >
              <TileComponent
                style={{
                  backgroundColor: TileColor.type.grass,
                }}
              />
              <h3>Grama</h3>
            </TileSubtitle>
          </Subtitle>

          {!!generated && (
            <GeneratedContainer
              opened={opened}
              onClick={() => {
                setOpened(!opened);
              }}
            >
              <MapGeneratedGrid opened={opened}>
                {generated?.map((i, index_i) => (
                  <MapGeneratedColumn size={SIZE} key={index_i}>
                    {i.map(({ type }, index_j) => (
                      <Tile
                        key={index_j}
                        onClick={() => {}}
                        onHover={() => {}}
                        type={type}
                      />
                    ))}
                  </MapGeneratedColumn>
                ))}
              </MapGeneratedGrid>
            </GeneratedContainer>
          )}

          {!!generated && (
            <ClearBtn
              onClick={() => {
                setGenerated(null);
              }}
            >
              Clear <span>{"(will improve performance)"}</span>
            </ClearBtn>
          )}

          <CTAProcessMap
            onClick={() => {
              setGenerated(new MapProcess(SIZE, tiles).run());
            }}
          >
            Process Map
          </CTAProcessMap>

          {!!generated && (
            <Download onClick={handleDownload}>Download</Download>
          )}
        </LeftSide>
      </Main>
    </Container>
  );
};

export default Canvas;
