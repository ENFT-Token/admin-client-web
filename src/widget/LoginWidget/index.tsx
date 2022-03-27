import React, { useState } from "react";

import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import styled from "styled-components";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

export default function LoginWidget() {

  const [account, setAccount] = useState({
    id: "",
    password: "",
  });
  const onChangeAccount=(e:any)=>{
    setAccount({
      ...account,
      [e.target.name]:e.target.value,
    });
    
  };
  console.log(account)
  return (
    <div>
      <Forms
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input name="id" onChange={onChangeAccount} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password name="password"onChange={onChangeAccount}/>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkboxs id="checkbox">Remember me</Checkboxs>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Forms>
    </div>
  );
}

const Forms = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
`;

const Checkboxs = styled(Checkbox)`
  width: 300px;
  font-weight: 600;
`;
