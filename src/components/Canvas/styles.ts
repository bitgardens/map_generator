import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /** Disable selection */
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  header {
    padding: 8px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    img {
      width: 240px;
    }

    h1 {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

export const Main = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 24px;
  max-width: 1170px;
  width: 100%;
`;

export const MapGrid = styled.div<{ width: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.width}, 16px);
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    width: 16px;

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

export const LeftSide = styled.div`
  width: 30%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  flex-wrap: wrap;
  padding: 16px;
  background-color: #eff0f3;
  padding-bottom: 3px;
  border-radius: 8px;

  margin-bottom: 16px;
  z-index: 10;
`;

export const TileSubtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 12px;

  margin-right: 24px;

  h3 {
    margin-left: 12px;
    font-size: 16px;
    font-weight: 600;
  }

  // effects
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
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

export const MapGeneratedGrid = styled.div<{ opened?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  transform: scale(0.3);

  ${(p) =>
    p.opened &&
    `
  transform: scale(1);
`};

  // effects
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const GeneratedContainer = styled.div<{ opened?: boolean }>`
  width: 100%;

  ${(p) =>
    p.opened &&
    `
    position: fixed;
    top: 50%;
  width: auto;

    left: 50%;
    transform: translate(-50%, -50%);

    margin: 0px;
    z-index: 100;
    `}
`;

export const MapGeneratedColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const CTAProcessMap = styled.div`
  width: 100%;

  text-align: center;

  background-color: #ff8e3c;
  border-radius: 3px;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #0d0d0d;

  margin-bottom: 12px;

  // effects
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const Download = styled.div`
  width: 100%;

  text-align: center;
  transition: 0.2s;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }
`;

export const ClearBtn = styled.p`
  font-size: 14px;
  font-weight: 600;
  span {
    opacity: 0.6;
    font-weight: 400;
  }

  width: 100%;

  // effects
  transition: 0.2s;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }

  margin-bottom: 12px;
`;
