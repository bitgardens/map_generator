import { styled } from "styled-components";
import { TileColor, tile_images, tile_images_src } from "./colors";
import { TileInterface } from "./types";
// @ts-ignore
import gblb from "../../assets/tile/gblb.png";

export const Container = styled.div<TileInterface>`
  height: 24px;
  width: 24px;

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
    tile_images.includes(String(p.type)) &&
    `
    background-image: url(${tile_images_src[String(p.type)]});
    background-repeat: no-repeat;
    background-size: 24px 24px;
  `}

`;
