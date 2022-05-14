import React from "react";
import styled from "styled-components";

interface IKlipButtonProps {
  type: "login" | "register";
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyleButton = styled.button`
  background: #216fea;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  height: 56px;
  text-align: center;
  min-width: 280px;
  cursor: pointer;

  transition: 0.3s;
  &:hover {
    box-shadow: 0 0 5px #216fea;
  }
`;


function KlipButton({ type, width, onClick }: IKlipButtonProps) {
  return (

    <StyleButton style={{ width }} onClick={onClick}>
      <img
        src="/klip_logo.svg"
        style={{ height: "13px", marginBottom: "3px", marginRight: "5px" }}
      />
      {`Klip으로 ${type === "login" ? "로그인" : "시작"}`}
    </StyleButton>

  );
}

export default KlipButton;
