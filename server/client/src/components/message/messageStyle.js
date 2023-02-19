import styled from "@emotion/styled";
import { cyan, yellow } from "@mui/material/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => props.type === "own" ? 'flex-start' : 'flex-end'};
  width: ${(props) => props.type === "main" ? '100%' : '85%'};
  * {
    color: var(--color-text);
  }
`;
export const ContainerMessage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  &:first-of-type {
    width: 100%;
  }
  * {
    color: var(--color-text);
  }
`;
export const ContainerScroll = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.type === "own" ? 'flex-start' : 'flex-end'};
`;
export const ContainerTitle = styled.div`
  position: relative;
    display: flex;
  flex-wrap: wrap;
    align-items: center;
    padding: 10px 30px;
  border-radius: 12px;
    gap: 10px;
    background: ${(props) => props.type === "main" || props.type === "own" ? cyan[50] : yellow[50]};
`;
export const ContainerButton = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
export const Image = styled.img`
    width: 48px;
  height: 48px;
  border-radius: 100%;
  object-fit: cover;
`;
export const Span = styled.span`
    color: var(--color-light-text);
`;
export const ContainerDesc = styled.div`
  display: flex;
  margin: 20px 0;
  gap: 20px;
`;
export const ContainerImg = styled.div`
  flex: 1;
  position: relative;
  border-radius: 8px;
`;
export const ContainerOpenImage =styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 8px;
`;
export const ContainerText = styled.div`
    flex: 2;
`;
export const ImgMessage = styled.img`
  width: 100%;
  object-fit: contain;
  aspect-ratio: 4 / 3;
  height: auto;
  border-radius: 8px;
  border: 1px solid lightgrey;
`;
export const EmailButton = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 5px;
  cursor: pointer;
  transition: all 1s;
  border-radius: 5px;
  &:hover {
    background: rgba(152, 162, 162, 0.1);
  }
`;