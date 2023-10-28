import { styled } from "styled-components";
import { TileColor, tile_images, tile_images_src } from "./colors";
import { TileInterface } from "./types";

export const Container = styled.div<TileInterface>`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${TileColor.type.none};
  ${(p) =>
    p.type == "grass" &&
    `
      background-color: ${TileColor.type.grass}
      `};

  ${(p) =>
    p.type == "snow" &&
    `
      background-color: ${TileColor.type.snow}
      `};

  ${(p) =>
    tile_images.includes(String(p.type)) &&
    `
    background-image: url(${tile_images_src[String(p.type)]});
    background-repeat: no-repeat;
    background-size: 100% 100%;
  `}
`;
