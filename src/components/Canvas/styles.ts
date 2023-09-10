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

export const MapGrid = styled.div<{ width: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.width}, 24px);
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;

    // effects
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const TileComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;

  // effects
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const MapColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TileSubtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 24px;

  h3 {
    margin-left: 8px;
  }
`;

export const TileTmp = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  height: 16px;
  width: 16px;

  overflow: hidden;
  position: relative;

  img {
    margin-right: 16px;
  }
`;

export const RunBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background-color: #3978a8;
  padding: 8px 24px;

  font-size: 24px;
  color: #fff;
  border-radius: 8px;

  //effects
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const DownloadBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  line-height: 100%;
  p {
    font-size: 14px;
    margin-top: -12px;
  }

  h3 {
    font-size: 14px;
  }

  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;