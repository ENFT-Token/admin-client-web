import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
// import ReCAPTCHA from 'react-google-recaptcha';
import { Form, Modal, Input, Checkbox, Button } from "antd";
import KlipWidget from "../../widget/KlipWidget";
import { Request } from "../../models/Request";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addInfo } from "../../models/admin";
import "./login.css";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPanel({
  walletAddress,
  onLogin,
}: {
  walletAddress: string;
  onLogin: (walletAddress: string) => Promise<void>;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [admin, setAdmin] = useState({
    nickname: "",
    location: "",
    place: "",
    phone: "",
  });

  const onFinish = async () => {
    try {
      const response = await Request("POST", "/auth/admin/register", {
        ...admin,
        address: walletAddress,
      });
      if (response.status === 201) {
        onLogin(walletAddress);
      }
    } catch (e) {
      alert("회원가입 실패");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      setLocation(fullAddress);

      setAdmin({
        ...admin,
        ["location"]: fullAddress,
      });
      setIsModalVisible(false);
    }
  };
  const handleChangeState = (e: any) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="forms">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="nickname"
          label="닉네임"
          tooltip="다른 사람들이 당신을 뭐라고 부르기를 원하십니까?"
          rules={[
            {
              required: true,
              message: "닉네임을 입력하세요!",
              whitespace: true,
            },
          ]}
        >
          <Input name="nickname" onChange={handleChangeState} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="연락처"
          tooltip="연락가능한 헬스장 유/무선 번호는 무엇입니까?"
          rules={[
            { required: true, message: "번호를 입력하세요!", whitespace: true },
          ]}
        >
          <Input name="phone" onChange={handleChangeState} />
        </Form.Item>

        <Form.Item
          name="location"
          label="주소"
          rules={[{ required: false, message: "헬스장 주소를 입력하세요!" }]}
        >
          <Input type="text" value={location} name="location" />
          <Button type="ghost" onClick={showModal}>
            주소 찾기
          </Button>

          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <DaumPostCode autoClose={false} onComplete={handleComplete} />
          </Modal>
        </Form.Item>

        <Form.Item
          name="place"
          label="지점명"
          rules={[{ required: true, message: "회사 이름을 입력하세요!" }]}
        >
          <Input
            placeholder="헬스장 이름"
            name="place"
            onChange={handleChangeState}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>모든 정보를 올바르게 입력하셨습니까?</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default function Register() {
  const [panel, setPanel] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onNextPanel = (walletAddress: string) => {
    setWalletAddress(walletAddress);
    setPanel(1);
  };

  const onLogin = async (walletAddress: string) => {
    try {
      const response = await Request("POST", "/auth/admin/login", {
        address: walletAddress,
      });
      console.log(response);
      if (response.status === 201) {
        const tempLogin = JSON.stringify(response.data);
        window.localStorage.setItem("login", tempLogin);
        dispatch(addInfo(response.data));
        navigate("/", { replace: true });
      }
    } catch (e) {
      onNextPanel(walletAddress);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
      }}
    >
      {panel === 0 && <KlipWidget onSuccess={onLogin} />}
      {panel === 1 && (
        <RegisterPanel onLogin={onLogin} walletAddress={walletAddress} />
      )}
    </div>
  );
}
