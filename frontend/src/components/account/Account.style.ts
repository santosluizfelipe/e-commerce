import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 10px;
`;

export const Select = styled.select`
  margin-bottom: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
`;
