import React from 'react';
import { CustomAutocomplete } from './AutoComplete.styled';
import Input from '../Input/Input';

interface CustomProps {
  id: string;
  name: string;
  options: string[];
  onChange(value: string): void;
  value: string;
  errorMessage?: string | undefined;
}

type AutoCompleteProps = CustomProps;

export default function AutoComplete({
  id,
  name,
  value,
  options,
  onChange,
}: AutoCompleteProps) {
  return (
    <CustomAutocomplete
      id={id}
      fullWidth
      freeSolo
      disablePortal
      sx={{ padding: '0px' }}
      options={options}
      value={value}
      onChange={(_, newValue) => {
        onChange(newValue as string);
      }}
      renderInput={(params) => (
        <Input
          {...params}
          fullWidth
          name={name}
          border="0px"
          placeholder="To"
        />
      )}
    />
  );
}
