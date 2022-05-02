import React from 'react'
import { Layout } from 'antd';
import styled from "styled-components";
import "./index.css"

import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
export default function MainPage() {

  const layout = [
    { i: "a", x: 15, y: 0, w: 1, h: 2, },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ];
  return (
    <div style={{}}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1500}
       
      >
        <div key="a" style={{background:"red"}}>a</div>
        <div key="b" style={{background:"orange"}}>b</div>
        <div key="c" style={{background:"blue"}}>c</div>
      </GridLayout>
    </div>
  )
}
