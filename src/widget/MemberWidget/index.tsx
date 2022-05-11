import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SERVER_URL } from '../../confing'
import { IApprove } from '../../models/members'

export default function MemberWidget() {
    const [list, setList] = useState<any>([])
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://${SERVER_URL}/admin/memberAddress`)
                setList(response.data)
            }
            catch (e) {
                console.log("error", e);
            }
            fetch();
        }
    }, [])
    return (
        <Form>
            <TitleContainer>
                <Title>현재 승인된 유저들</Title>
            </TitleContainer>
            <hr/>
            {list.map((v: IApprove) => (
                <li>
                    {v.user.profile} {v.user.nickname}{v.user.sex}
                </li>
            ))}
        </Form>
    )
}

const TitleContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
    text-align: center;
`
const Title = styled.span`
   
    border-radius: 5px;
    font-size:25px;
   
    padding:5px 30px 5px 30px;
    margin-top:5px;
`

const Form = styled.div`
    hr{
        margin-top:5px;
    }
`