import styled from "styled-components";
import { TextField } from "@mui/material";
import type { CustomInputProps } from "./Input";

export const InputBase = styled(TextField)<CustomInputProps>`
  height: ${({ fullHeight }) => fullHeight && "100%"};

  & .MuiOutlinedInput-root {
    height: ${({ fullHeight }) => fullHeight && "100%"};
    & input {
      padding: 10px 5px;
      font-size: 14px;
      border-bottom: ${({ error }) =>
        error ? "1px solid red" : "1px solid #e2e2e2"};
      height: ${({ fullHeight }) => fullHeight && "100%"};
    }

    & fieldset {
      border: none;
    }
    &:hover fieldset {
      border: none;
    }
    &.Mui-focused fieldset {
      border: none;
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  width: 100%;
  color: #d32f2f;
`;
