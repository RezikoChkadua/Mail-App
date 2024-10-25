import styled from "styled-components";

export const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: 0px;
  right: 70px;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const BodyContent = styled.div<{ placeholder?: string }>`
  height: 100%;
  outline: none;
  margin-top: 12px;
  font-size: 14px;
  font-family: "Roboto";
  padding: 0px 5px;

  [placeholder]:empty::before {
    content: attr(placeholder);
    color: #555;
  }

  [placeholder]:empty:focus::before {
    content: "";
  }
`;
