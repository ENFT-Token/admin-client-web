import React from 'react'
import { Line } from '@ant-design/plots';
import styled from "styled-components";

export default function ProfitPage() {
  const data = [
    { Month: '1', value: 3 },
    { Month: '2', value: 4 },
    { Month: '3', value: 3.5 },
    { Month: '4', value: 5 },
    { Month: '5', value: 4.9 },
    { Month: '6', value: 6 },
    { Month: '7', value: 7 },
    { Month: '8', value: 9 },
    { Month: '9', value: 10 },
    { Month: '10', value: 20 },
    { Month: '11', value: 25 },
    { Month: '12', value: 15 },
    { Month: '13', value: 23 },
    { Month: '14', value: 13 },
    { Month: '15', value: 5 },
    { Month: '16', value: 10 },
    { Month: '17', value: 12 },
    { Month: '18', value: 16 },
    { Month: '19', value: 10 },
    { Month: '20', value: 20 },
    { Month: '21', value: 23 },
    { Month: '22', value: 24 },
    { Month: '23', value: 26 },
    { Month: '24', value: 28 },
    { Month: '25', value: 31 },
    { Month: '26', value: 40 },
    { Month: '27', value: 50 },
    { Month: '28', value: 60 },
    { Month: '29', value: 70 },
    { Month: '30', value: 75 },
    { Month: '31', value: 80 },
  ];

  const config = {
    data,
    width: 1500,
    height: 250,
    autoFit: false,
    xField: 'Month',
    yField: 'value',
    label: {},
    point: {
      size: 3,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#02660a',
        lineWidth: 5,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  return (

    <ChartForm>
      <div>통계</div>
      <div className='curMembers box1'>
        <h1 id='title'>현재 고객 수</h1>
        <Line className='line' {...config} />
      </div>
      <div className='apvMembers box2'>
        <h1 id='title'>승인 요청한 회원 수</h1>
        <Line className='line' {...config} />
      </div>

      <div className='dayVisitedMembers box3'>
        <h1 id='title'>하루 방문 회원 수</h1>
        <Line className='line' {...config} />
      </div>
      <div className='profit box4'>
        <h1 id='title'>매출</h1>
        <Line className='line' {...config} />
      </div>
    </ChartForm>

  );
}


const ChartForm = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #e2f0dc;
border-radius: 30px;
padding:100px;

.box1 .box2{
  background-color: white;
}
.line{
  margin-bottom: 50px;
}
#title{
  text-align: center;
}

`