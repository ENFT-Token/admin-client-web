import React from "react";
import styled from "styled-components";

interface ICountWidgetProps {
    title: string;
    count: number;
    onClick?:  React.MouseEventHandler<HTMLDivElement>;
}

const StyleCountWidget = styled.div`
  padding: 20px;
  overflow: hidden;

  .count {
    font-size: 42px;
    margin-bottom: 0px;
    font-weight: 600;
  }
   .title {
     font-size: 18px;
   }
  
  &.clicked {
    cursor: pointer;

    &:hover {
      .count::after {
        transform: translateX(0px);
      }
    }
    
    .count::after {
      background: #c0d335;
      border-radius: 25px;
      width: 6px;
      content: "";
      float: right;
      height: 100px;
      opacity: 1;
      display: block;
      transform: translateX(50px);
      transition: 0.2s;
    }
  }
`;

function CountWidget({title,count,onClick} : ICountWidgetProps) {
    return (
        <StyleCountWidget onClick={onClick} className={onClick !== undefined ? "clicked" : undefined}>
            <h1 className={"count"}>{count.toLocaleString()}명</h1>
            <div className={"title"}>{title}</div>
        </StyleCountWidget>
    )
}

export default CountWidget;