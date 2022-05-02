import React from 'react'
import { Layout } from 'antd';
import styled from "styled-components";
import "./index.css"


export default function MainPage() {
  return (
    <div>

      <div className="container">

      


        <div className="middle">

          <div className="middle-left"> <span>LEFT (600 x 500) <br /> #00D8FF;</span> </div>

          <div className="middle-right">

            <div className="middle-right-1"> <span>관리자 정보<br /> #FF00DD;</span> </div>
            <div className="middle-right-2"> <span>RIGHT2 (380 x 150) <br /> #FFE400;</span> </div>
            <div className="middle-right-3"> <span>RIGHT3 (380 x 170) <br /> #99E000;</span> </div>

          </div>

        </div>

        <div className="bottom"> <span>BOTTOM (1000 x 100) <br /> #5D5D5D;</span> </div>
      </div>




    </div>
  )
}
