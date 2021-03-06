import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface IButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "ghost" | "blue" | "green" | "red" | "black" | "outline";
  width?: number | string;
  height?: number | string;
  inputType?: React.HTMLInputTypeAttribute;
}

interface IStyleProps {
  _width?: number | string;
  _height?: number | string;
}

const StyledButton = styled.input<IStyleProps>`
  border: none;
  outline: none;
  cursor: pointer;
  ${({_width}) =>
      _width && typeof _width === "number" && `width: ${_width}px;`}
  ${({_width}) => _width && typeof _width === "string" && `width: ${_width};`}

  ${({_height}) =>
      _height && typeof _height === "number" && `height: ${_height}px;`}
  ${({_height}) =>
      _height && typeof _height === "string" && `height: ${_height};`}

  border-radius: 15px;
  transition: 0.2s;

  &.ghost {
    font-size: 16px;
    background: #f5f5f5 0% 0% no-repeat padding-box;
    color: #585858;
    font-weight: 300;

    &:hover {
      color: #5858588f;
    }
  }

  &.outline {
    border: 1px solid #1879c3;
    color: #1879c3;
    background: #fff;
    font-weight: bold;
    &:hover {
      background: #1879c3;
      color:white;
    }
  }


  &.blue,
  &.green,
  &.black,
  &.red {
    box-shadow: 0px 4px 8px #0000001f;
    color: #ffffff;

    &:hover {
      opacity: 0.8;
    }
  }

  &.blue {
    background: #1879c3;
  }

  &.red {
    background: crimson;
  }

  &.green {
    background: #c0d437;
  }

  &.black {
    background: #6a6a6a;
  }
`;

function Button({ type, width, height, inputType,...rest }: IButtonProps) {
  return (
    <StyledButton
      _width={width}
      _height={height}
      type={!inputType ? "button" : inputType}
      {...rest}
      className={type}
    />
  );
}



export default Button;
