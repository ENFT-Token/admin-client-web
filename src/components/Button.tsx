import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface IButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "ghost";
  width?: number;
  height?: number;
}

interface IStyleProps {
  _width?: number | string;
  _height?: number | string;
}

const StyledButton = styled.input<IStyleProps>`
  border: none;
  outline: none;
  cursor: pointer;
  ${({ _width }) =>
    _width && typeof _width === "number" && `width: ${_width}px;`}
  ${({ _width }) => _width && typeof _width === "string" && `width: ${_width};`}

  ${({ _height }) =>
    _height && typeof _height === "number" && `height: ${_height}px;`}
  ${({ _height }) =>
    _height && typeof _height === "string" && `height: ${_height};`}

  &.ghost {
    font-size: 16px;
    border-radius: 20px;
    background: #f5f5f5 0% 0% no-repeat padding-box;
    color: #585858;
    font-weight: 300;
    &:hover {
      color: #5858588f;
    }
  }
`;

function Button({ type, width, height, ...rest }: IButtonProps) {
  return (
    <StyledButton
      _width={width}
      _height={height}
      type="button"
      {...rest}
      className={type}
    />
  );
}

export default Button;
