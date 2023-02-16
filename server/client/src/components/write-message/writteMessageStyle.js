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
  position: relative;
  width: 100%;
  border: 1px solid lightgrey;
  padding: 10px 20px;
  border-radius: 5px;
`;
export const ContainerPreview = styled.div`
  position: relative;
  padding: 0 20px 10px 20px;
  width: 320px;
  height: 240px;
`;
export const ImgPreview= styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;
export const ErrorContainer = styled.div`

`;
export const ErrorText = styled.span`
 color: red;
 font-size: 12px;
 font-weight: 600;
`;