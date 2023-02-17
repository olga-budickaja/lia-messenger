import styled from "@emotion/styled";
import { cyan, yellow } from "@mui/material/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  * {
    color: var(--color-text);
  }
`;

export const ContainerMessages = styled.div`
  display: flex;
  flex-direction: column;
  * {
    color: var(--color-text);
  }
`;
export const ContainerMessage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 85%;
  align-self: ${(props) => props.type === "main" ? 'flex-start' : 'flex-end'};
  margin-left: ${(props) => props.type !== "rcv" && '40px'};
  &:first-of-type {
    width: 100%;
  }
  * {
    color: var(--color-text);
  }
`;
export const ContainerTitle = styled.div`
  position: relative;
    display: flex;
  flex-wrap: wrap;
    align-items: center;
    padding: 10px 30px;
  border-radius: 12px;
    gap: 20px;
    background: ${(props) => props.type === "rcv" ? yellow[50] : cyan[50]};
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
  height: auto;
  border-radius: 8px;
`;
export const ButtonDrop = styled.div`

`;

export const ButtonNew = styled.div`
    position: fixed;
    right: 40px;
    bottom: 30px;
`;


