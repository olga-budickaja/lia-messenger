import styled from "@emotion/styled";

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const FormTitle = styled.h2`
    text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;
export const FormSubtitle = styled.h2`
    text-align: center;
  text-transform: uppercase;
`;
export const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
`;
export const InputShow = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  height: 100%;
  display: flex;
  align-items: center;
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
  padding: 20px 40px;
  border-radius: 8px;
  background: #a7ffeb;
  box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px
`;