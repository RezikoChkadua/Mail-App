import { Box, TextFieldProps } from "@mui/material";
import { ErrorMessage, InputBase } from "./Input.ui";

export interface CustomInputProps {
  border?: string;
  fullHeight?: boolean;
  errorMessage?: string;
  hideError?: boolean;
}

type InputProps = TextFieldProps & CustomInputProps;

function Input({
  fullHeight,
  errorMessage,
  hideError,
  ...restProps
}: InputProps) {
  return (
    <Box display="flex" flexDirection="column">
      <InputBase
        fullHeight={fullHeight}
        {...restProps}
        error={!!errorMessage}
      />
      {!hideError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Box>
  );
}

export default Input;
