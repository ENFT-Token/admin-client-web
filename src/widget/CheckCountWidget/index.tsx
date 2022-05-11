import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import { SERVER_URL } from '../../confing';
import { Rootstate } from '../../models';
export default function CheckCount() {
    const {adminInfo} = useSelector((store: Rootstate)=> store.admin)
    const timerRef = useRef<NodeJS.Timer | null>(null);
    const [count, setCount]= useState(0)

    useEffect(()=>{
        timerRef.current= setInterval(()=>{
            if(adminInfo?.access_token !== undefined){
                axios.get(`http://${SERVER_URL}/check/count`,
                {
                    headers:{
                        Authorization:`Bearer ${adminInfo.access_token}`,
                    },
                    params:{
                        place:adminInfo.place,
                    }
                })
                .then((v)=>{
                    if(v.status ===200){
                        //console.log(v.data);
                        setCount(v.data.count);
                    }
                    else{
                        console.log("eroor")
                    }
                })
            }
        },1000);

        return ()=>{
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    },[]);

    
    return (
    <Container>현재 이용자 수 : <span id="count">{count} 명</span></Container>
  )
}

const Container = styled.div`

    #count{
        color:white;
        border:10px;
        border-radius: 5px;
        background-color: #009416;
        padding:5px 10px;
    }

`