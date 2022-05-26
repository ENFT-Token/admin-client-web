import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";

interface IListWidgetProps {
  title: string;
}

const StyleList = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  margin-left: 30px;

  .title {
    margin-top: 22px;
    font-size: 24px;
    font-weight: bold;
    color: #202020;
  }
`;

function ListWidget({ title }: IListWidgetProps) {
  return (
    <StyleList>
      <div className="title">{title}</div>
      <Button type="blue" width={280} height={52} value="승인요청 유저 939명" />
    </StyleList>
  );
}

export default ListWidget;
