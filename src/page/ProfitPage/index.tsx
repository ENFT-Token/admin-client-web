import React, { useEffect, useMemo, useState } from 'react'
import { Line } from '@ant-design/plots';
import styled from "styled-components";
import {useQuery} from "react-query";
import { Title } from '../../widget/TableWidget';
export default function ProfitPage() {


  const {data: chartRegister} = useQuery<Record<string, any>[]>("chartRegister");
  const {data: chartCheckIn} = useQuery<Record<string, any>[]>("chartCheckIn");

  const test1 = useMemo(()=> chartRegister?.map((v,idx) => ({
      date: idx.toString(),
      count: v.count,
  })) ?? [] , [chartRegister]);
  const test2 = useMemo(()=> chartCheckIn?.map((v,idx) => ({
    date: idx.toString(),
    count: v.count,
})) ?? [] , [chartCheckIn]);
  const config = (value:any)=>{
    return{
    data:value,
    width: 1000,
    height: 250,
    autoFit: false,
    xField: 'date',
    yField: 'count',
    label: {},
    point: {
      size: 2,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#02660a',
        lineWidth: 4,
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
  }};
  return (

    <ChartForm>
      <Title>Chart</Title>
      <div className='curMembers box'>
        <h1 id='header'>헬스장 신규 등록 유저 수</h1>
        <Line className='line' {...config(test1)} />
      </div>
      <div className='apvMembers box'>
        <h1 id='header'>헬스장 체크인 유저 수</h1>
        <Line className='line' {...config(test2)} />
      </div>

    </ChartForm>

  );
}


const ChartForm = styled.div`
display: flex;
flex-direction: column;



padding:10px;

.box{
  background-color: white;
  padding:30px;
  border-radius: 30px;
  margin:10px;
  box-shadow: 3px 3px 3px 3px #cdcdcd;
}
.line{
  margin-bottom: 50px;
}

#header{
  text-align: center;
}

`