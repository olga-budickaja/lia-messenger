import styled from "@emotion/styled";

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
export const InputContainer = styled.div`
  position: relative;
  width: 200px;
  border-radius: 5px;
  border: 1px solid grey;
`;
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
`;
export const ErrorContainer = styled.div`

`;
export const ErrorText = styled.span`
 color: red;
 font-size: 12px;
 font-weight: 600;
`;
export const Greeting = styled.div`
 position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid gray;
  background: white;
`;