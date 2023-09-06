import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  /** Disable selection */
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Main = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 24px;
`;

export const MapGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 128px;
`;

export const MapColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Subtitle = styled.div`
  padding: 12px;
  line-height: 100%;
`;

export const TileSubtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;

  h3 {
    margin-left: 12px;
  }
`;
