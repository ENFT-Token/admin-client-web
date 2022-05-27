import React from "react";
import styled from "styled-components";

interface IAlramIconProps {
    src: string;
    count: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const StyleAlramIcon = styled.div`
  display: inline-block;
  cursor: pointer;
  &.clicked {
    padding: 7px;
    &:hover {
      background: #e9e9e9;
    }
  }
  border-radius: 10px;
      img {
        height: 30px;
      }
    .count {
      vertical-align: text-bottom;
      margin-left: -15px;
      display: inline-block;
      width:30px;
      border: 3px solid white;
      color: white;
      height: 30px;
      border-radius: 30px;
      background: #C24373;
      text-align: center;
    }
  
`;

function AlramIcon({src,count,onClick} : IAlramIconProps) {
    return (
        <StyleAlramIcon onClick={onClick} className={onClick !== undefined ? "clicked" : undefined}>
            <img src={src} />
            <div className={"count"}>{count}</div>
        </StyleAlramIcon>
    )
}

export default AlramIcon;