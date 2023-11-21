import React, { useState, useEffect } from "react";

// @ts-ignore
import logo from "../../assets/logo.png";

import {
  CTAProcessMap,
  ClearBtn,
  Container,
  Download,
  GeneratedContainer,
  GridsContainers,
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

type metaSelect = "core" | "spawner" | null;

const Canvas: React.FC = () => {
  const SIZE = 40;
  // const SIZE = 20;

  const [tiles, setTiles] = useState<TileTypes[]>(
    Array(SIZE * SIZE).fill("none")
  );

  const [metaTiles, setMetaTiles] = useState<metaSelect[]>(
    Array(SIZE * SIZE).fill(null)
  );

  const [selected, setSelected] = useState<TileTypes>("grass");
  const [dragEnabled, setDragEnabled] = useState(false);
  const [generated, setGenerated] = useState<TileInterface[][] | null>();
  const [opened, setOpened] = useState(false);

  const [metaSelect, setMetaSelect] = useState<metaSelect>(null);

  useEffect(() => {
    addEventListener("mousedown", () => {
      setDragEnabled(true);
    });

    addEventListener("mouseup", () => {
      setDragEnabled(false);
    });
  }, []);

  const fillHorizontal = (index: number) => {
    const x_pos = index % SIZE;
    const MIN_LEFT = index - x_pos;
    const MAX_RIGHT = index + (39 - x_pos);

    let left_extremity = MIN_LEFT;
    let type: TileTypes = "grass";
    for (let i = index; i >= MIN_LEFT; i--) {
      if (tiles[i] != "none") {
        console.log(tiles[i]);
        type = tiles[i];
        left_extremity = i;
        break;
      }
    }

    let tmp = [...tiles];

    for (let i = left_extremity + 1; i <= MAX_RIGHT; i++) {
      tmp[i] = type;
      if (tiles[i] == type) break;
    }

    setTiles(tmp);
  };

  const handleChangeTile = (index: number) => {
    if (selected == "dirt") {
      fillHorizontal(index);

      return;
    }
    let tmp = [...tiles];
    tmp[index] = selected;
    setTiles(tmp);
  };

  const handleChangeMetaTile = (index: number) => {
    let tmp = [...metaTiles];
    tmp[index] = metaSelect;
    setMetaTiles(tmp);
  };

  const handleGetMetadataJson = () => {
    let core: { x: number; y: number } = { x: 1, y: 2 };
    let spawnersList: { x: number; y: number }[] = [];

    metaTiles.forEach((value, index) => {
      const x_pos = index % SIZE;
      // @ts-ignore
      const y_pos = parseInt(index / SIZE);

      if (value == "spawner") {
        spawnersList.push({
          x: x_pos,
          y: y_pos
        });

      }
      if (value == "core") {
        core = {
          y: y_pos,
          x: x_pos,
        };
      }
    });

    return {
      core,
      spawners: spawnersList,
    };
  };

  const handleDownload = () => {
    var json_string = JSON.stringify(
      {
        map: generated,
        metadata: handleGetMetadataJson(),
      },
      undefined,
      2
    );
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
        <GridsContainers>
          <MapGrid
            width={SIZE}
            style={{
              zIndex: 2,
            }}
          >
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
          <MapGrid
            width={SIZE}
            style={{
              display: metaSelect != null ? "grid" : "none",
              zIndex: 3,
            }}
          >
            {metaTiles.map((value, index) => (
              <div
                key={index}
                onClick={() => {
                  console.log("CLICKED AT " + index);
                  handleChangeMetaTile(index);
                }}
                onMouseEnter={() => {}}
                style={
                  value != null
                    ? {
                        backgroundColor: value == "core" ? "gray" : "purple",
                      }
                    : {}
                }
              />
            ))}
          </MapGrid>
        </GridsContainers>

        <LeftSide>
          <Subtitle>
            <TileSubtitle
              onClick={() => {
                setMetaSelect(null);
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
                setMetaSelect(null);
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
            <TileSubtitle
              onClick={() => {
                setMetaSelect(null);
                setSelected("snow");
              }}
            >
              <TileComponent
                style={{
                  backgroundColor: TileColor.type.snow,
                }}
              />
              <h3>Neve</h3>
            </TileSubtitle>

            <TileSubtitle
              onClick={() => {
                setMetaSelect(null);
                setSelected("road");
              }}
            >
              <TileComponent
                style={{
                  backgroundColor: TileColor.type.road,
                }}
              />
              <h3>Caminho</h3>
            </TileSubtitle>

            <TileSubtitle
              onClick={() => {
                setMetaSelect(null);
                setSelected("dirt");
              }}
            >
              <TileComponent
                style={{
                  backgroundColor: TileColor.type.grass,
                }}
              />
              <h3>Fill-X</h3>
            </TileSubtitle>
          </Subtitle>

          <Subtitle>
            <TileSubtitle
              onClick={() => {
                setMetaSelect(null);
                setSelected("tree");
              }}
            >
              <div style={{ width: 32, height: 32 }}>
                <Tile onClick={() => {}} onHover={() => {}} type="tree" />
              </div>
              <h3>Arvore 1</h3>
            </TileSubtitle>
            <TileSubtitle
              onClick={() => {
                setMetaSelect(null);
                setSelected("tree2");
              }}
            >
              <div style={{ width: 32, height: 32 }}>
                <Tile onClick={() => {}} onHover={() => {}} type="tree2" />
              </div>
              <h3>Arvore 2</h3>
            </TileSubtitle>
            <TileSubtitle
              onClick={() => {
                setMetaSelect(null);
                setSelected("tree3");
              }}
            >
              <div style={{ width: 32, height: 32 }}>
                <Tile onClick={() => {}} onHover={() => {}} type="tree3" />
              </div>
              <h3>Arvore 3</h3>
            </TileSubtitle>
            <TileSubtitle
              onClick={() => {
                setMetaSelect(null);
                setSelected("tree4");
              }}
            >
              <div style={{ width: 32, height: 32 }}>
                <Tile onClick={() => {}} onHover={() => {}} type="tree4" />
              </div>
              <h3>Arvore 4</h3>
            </TileSubtitle>
          </Subtitle>

          <Subtitle>
            <TileSubtitle
              onClick={() => {
                setMetaSelect("core");
              }}
            >
              <div style={{ width: 32, height: 32 }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "gray",
                    borderRadius: 8,
                  }}
                />
              </div>
              <h3>Core</h3>
            </TileSubtitle>
            <TileSubtitle
              onClick={() => {
                setMetaSelect("spawner");
              }}
            >
              <div style={{ width: 32, height: 32 }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "purple",
                    borderRadius: 8,
                  }}
                />
              </div>
              <h3>Spawner</h3>
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
