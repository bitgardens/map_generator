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
  background-color: #3978A8;
  padding: 8px 24px;

  font-size: 24px;
  color: #fff;
  border-radius: 8px;

  //effects
  transition: .2s;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
`