import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
  flex-direction: column;
  padding: 40px 20px;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;
export const Title = styled.h2`
    text-align: center;
  font-size: 2.5vmin;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
export const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
`;
export const Qualification = styled.span`
  font-size: 12px;
`;
export const Input = styled.input`
  width: 100%;
  border: 1px solid lightgrey;
  padding: 10px 20px;
  border-radius: 5px;
`;
export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;