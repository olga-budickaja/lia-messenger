import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;
export const ItemSort = styled.div`
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

