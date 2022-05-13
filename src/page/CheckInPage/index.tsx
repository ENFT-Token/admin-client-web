import React from 'react'
import { Responsive, WidthProvider } from "react-grid-layout";
const layout = [
  { i: "1", x: 0, y: 0, w: 5, h: 2, static: true },
  { i: "2", x: 1, y: 0, w: 10, h: 5, minW: 2, maxW: 4 },
  { i: "3", x: 4, y: 0, w: 5, h: 2 }
];

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function CheckIn()  {
  return (
    
    
    <ResponsiveGridLayout
    className="layout"
    layouts={{layout}}
    breakpoints={{ lg: 1200, md: 1200, sm: 768, xs: 480, xxs: 0 }}
    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 12 }}
  >
    <div key="1" style={{background:"red"}}>1</div>
    <div key="2" style={{background:"green"}}>2</div>
    <div key="3">3</div>
  </ResponsiveGridLayout>
    
  )
}
