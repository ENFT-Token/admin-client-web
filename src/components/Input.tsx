import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

const StyledInput = styled.input``;

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label: React.ReactNode;
}

function Input({ label, value, onChange, ...rest }: IInputProps) {
  return (
    <>
      <label>{label}</label>
      <StyledInput {...rest} value={value} onChange={onChange}></StyledInput>
    </>
  );
}

export default Input;
