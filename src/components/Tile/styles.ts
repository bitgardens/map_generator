import { styled } from "styled-components";
import { TileColor } from "./colors";
import { TileInterface } from "./types";

export const Container = styled.div<TileInterface>`
  height: 16px;
  width: 16px;
  border-radius: 2px;
  border: solid 1px #000;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(p) =>
    p.type
      ? `
    background-color: ${TileColor.type[p.type]}
    `
      : `
    background-color: ${TileColor.type.none}
    `};

  // effects
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.5;
  }
`;
