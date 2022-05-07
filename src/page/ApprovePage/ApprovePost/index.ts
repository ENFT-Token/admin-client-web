import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { SERVER_URL } from '../../../confing';
import { Rootstate } from '../../../models';

export default function Post({ user }:any) {

    const admin = useSelector((store:Rootstate) => store.admin.adminInfo)

    const data = async ()=>{
        try{
            const response = await axios.post(`http:://${SERVER_URL}/admin/approve`,
                {
                    user
                },
                {
                    headers:{
                        "Authorization": `Bearer ${admin?.access_token}`
                    }
                }
            )
        }
        catch(e){
            console.log("error", e);
        }
    }
    useEffect(() => {
        data();
    }, [])

    return null;
}
