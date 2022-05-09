import React, { useEffect, useState } from "react";

import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

import MainPage from "../../page/MainPage";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addInfo } from "../../models/admin";
import { SERVER_URL } from "../../confing";
import KlipButton from "../../components/KlipButton";
import QRCode from "qrcode.react";
import useUserKilp from "../../klip/useUserKlip";
import KlipWidget from "../KlipWidget";

export default function LoginWidget() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async (walletAddress: string) => {
    try {
      const response = await axios.post(
        `http://${SERVER_URL}/auth/admin/login`,
        {
          walletAddress,
        }
      );
      console.log(response);
      if (response.status === 201) {
        const tempLogin = JSON.stringify(response.data);
        window.localStorage.setItem("login", tempLogin);
        dispatch(addInfo(response.data));
        navigate("/home", { replace: true });
      }
    } catch (e) {
      console.log(e);
      alert("로그인 실패");
    }
  };

  return (
    <>
      <KlipWidget type="login" onSuccess={onLogin} />
    </>
  );
}
