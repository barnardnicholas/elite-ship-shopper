import React, { ChangeEvent } from 'react';
import { FormInputProps, onChangeFunction } from '../../types/FormInputProps';

interface TextInputProps extends FormInputProps<string> {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: onChangeFunction<string>;
  type?: string;
}

function TextInput({
  name,
  disabled = false,
  value = '',
  onChange,
  placeholder = 'Select...',
  type = 'text',
}: TextInputProps) {
  return (
    <input
      type={type}
      className="form-input text-input"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(name, e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

export default TextInput;
