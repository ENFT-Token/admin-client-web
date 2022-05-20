import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber, message, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../confing";
import { Rootstate } from "../../models";
import { setPriceInfo } from "../../models/admin";
import { getAccessToken, Request, RequestAuth } from "../../models/Request";
import store from "../../models/store";
import Table from "../../widget/TableWidget";
import { StylesTable } from "../MembersPage";
import "./index.css";

function DeleteItem({
  month,
  handleList,
}: {
  month: number;
  handleList: () => void;
}) {
  const handleDelete = async () => {
    const response = await RequestAuth("DELETE", "/admin/priceInfo", {
      month: Number(month),
    });
    console.log(response);
    handleList();
  };

  return (
    <Button type="primary" danger onClick={handleDelete}>
      삭제
    </Button>
  );
}

function KlayItem({
  month,
  klay,
  handleSave,
}: {
  month: number;
  klay: number;
  handleSave: (month: number, klay: number) => Promise<boolean>;
}) {
  const [isEdit, setEdit] = useState(false);

  const [_klay, setKlay] = useState(klay);

  const handleSaved = async () => {
    const ret = await handleSave(month, _klay);
    if (ret) setEdit(false);
  };

  return (
    <div>
      {isEdit == false && (
        <>
          <div>{klay}</div>{" "}
          <Button type="link" onClick={() => setEdit(true)}>
            EDIT
          </Button>
        </>
      )}
      {isEdit == true && (
        <>
          <InputNumber
            value={_klay}
            onChange={(num) => setKlay(num)}
            addonBefore="KLAY"
            style={{ marginBottom: "10px" }}
          />{" "}
          <Button type="primary" onClick={handleSaved}>
            SAVE
          </Button>
          <Button type="primary" danger onClick={() => setEdit(false)}>
            CANCEL
          </Button>
        </>
      )}
    </div>
  );
}

function PriceInfoPage() {
  const { priceInfo, adminInfo } = useSelector(
    (store: Rootstate) => store.admin
  );

  const handleList = () => {
    RequestAuth("GET", "/admin/priceInfo").then((response) =>
      store.dispatch(setPriceInfo(response.data))
    );
  };

  useEffect(() => {
    handleList();
  }, []);

  useEffect(() => {
    console.log(priceInfo);
  }, [priceInfo]);

  const [monthAndKlay, setMonthAndKlay] = useState({
    month: 0,
    klay: 0,
  });

  const handleAdd = async () => {
    await RequestAuth("POST", "/admin/priceInfo", monthAndKlay);
    handleList();
  };

  const handleSave = async (month: number, klay: number) => {
    const response = await RequestAuth("PUT", "/admin/priceInfo", {
      month,
      klay,
    });
    if (response.status === 200) {
      handleList();
      return true;
    }
    return false;
  };
  const columns = useMemo(
    () => [
      {
        Header: "MONTH",
        accessor: "month",
      },
      {
        Header: "KLAY",
        accessor: "klay",
      },
      {
        Header: "DELETE",
        accessor: "run",
      },
    ],
    []
  );
  const [imageData, setImageData] = useState({
    imageUrl: "",
    loading: false,
  });

  useEffect(() => {
    if (adminInfo) {
      setImageData({
        imageUrl: `http://${SERVER_URL}${adminInfo.cover_img}`,
        loading: false,
      });
    }
  }, [adminInfo]);
  const uploadButton = (
    <div>
      {imageData.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadImage = async (options: any) => {
    const { file } = options;
    // action={`http://${SERVER_URL}/admin/upload_cover`}

    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    fmData.append("image", file);
    try {
      setImageData({
        imageUrl: "",
        loading: true,
      });
      const response = await axios.post(
        `http://${SERVER_URL}/admin/upload_cover`,
        fmData,
        config
      );
      const makeURI = `${response.data.cover_img}`;

      const authInfo = JSON.parse(localStorage["login"]);
      authInfo.cover_img = makeURI;
      localStorage["login"] = JSON.stringify(authInfo);

      setImageData({
        imageUrl: `http://${SERVER_URL}${makeURI}`,
        loading: false,
      });
    } catch (err) {
      console.log("Eroor: ", err);
      // const error = new Error("Some error");
      message.error("Upload Error");
      setImageData({
        imageUrl: "",
        loading: false,
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "10px", marginRight: "50px" }}>
            <h2 style={{ textAlign: "center" }}>커버 사진 등록</h2>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader upload"
              showUploadList={false}
              customRequest={uploadImage}
            >
              {imageData.imageUrl ? (
                <img
                  src={imageData.imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ textAlign: "center" }}>가격 설정</h2>
            <InputNumber
              value={monthAndKlay.month}
              onChange={(num) =>
                setMonthAndKlay({ ...monthAndKlay, month: num })
              }
              addonBefore="달"
              style={{ marginBottom: "10px" }}
            />
            <InputNumber
              value={monthAndKlay.klay}
              onChange={(num) =>
                setMonthAndKlay({ ...monthAndKlay, klay: num })
              }
              addonBefore="KLAY"
              style={{ marginBottom: "10px" }}
            />

            <Button type="primary" onClick={handleAdd}>
              추가
            </Button>
          </div>
        </div>
      </div>
      <StylesTable>
        <Table
          columns={columns}
          data={priceInfo.map((elem) => ({
            month: elem.month,
            klay: (
              <KlayItem
                klay={elem.klay}
                month={elem.month}
                handleSave={handleSave}
              />
            ),
            run: <DeleteItem month={elem.month} handleList={handleList} />,
          }))}
        />
      </StylesTable>
    </div>
  );
}

export default PriceInfoPage;
