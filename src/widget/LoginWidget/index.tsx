import React, { useState } from "react";

import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

import MainPage from "../../page/MainPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import store from "../../modules/store";
import { addInfo } from "../../modules/admin";

export default function LoginWidget() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        "http://3.39.24.209/auth/admin/login",
        account
      );
      if (response.status === 201) {
        store.dispatch(addInfo(response.data));
        navigate("/home", { replace: true });
      } else {
        alert("로그인 실패");
      }
    } catch (e) {
      alert("로그인 실패");
    }
  };

  const onChangeAccount = (e: any) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Forms
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            name="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={onChangeAccount}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={onChangeAccount}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkboxs>Remember me</Checkboxs>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Forms>
    </div>
  );
}

const Forms = styled(Form)`
  .login-form {
    max-width: 300px;
  }
  .login-form-forgot {
    float: right;
  }
  .ant-col-rtl .login-form-forgot {
    float: left;
  }
  .login-form-button {
    width: 100%;
  }
`;

const Checkboxs = styled(Checkbox)`
  font-weight: 600;
`;
