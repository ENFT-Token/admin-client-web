import { Button, Input, InputNumber } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../models";
import { setPriceInfo } from "../../models/admin";
import { Request, RequestAuth } from "../../models/Request";
import store from "../../models/store";
import Table from "../../widget/TableWidget";
import { StylesTable } from "../MembersPage";

function PriceInfo({ month, klay }: { month: number; klay: number }) {
  return <div></div>;
}

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

function KlayItem({ month, klay }: { month: number; klay: number }) {
  const [isEdit, setEdit] = useState(false);

  const [_klay, setKlay] = useState(klay);

  const handleSave = async () => {
    const response = await Request("PUT", "/admin/priceInfo", {
      month,
      klay,
    });
    console.log(response);
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
          <Button type="primary" onClick={handleSave}>
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <InputNumber
          value={monthAndKlay.month}
          onChange={(num) => setMonthAndKlay({ ...monthAndKlay, month: num })}
          addonBefore="달"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <InputNumber
          value={monthAndKlay.klay}
          onChange={(num) => setMonthAndKlay({ ...monthAndKlay, klay: num })}
          addonBefore="KLAY"
          style={{ marginBottom: "10px" }}
        />

        <Button type="primary" onClick={handleAdd}>
          추가
        </Button>
      </div>
      <StylesTable>
        <Table
          columns={columns}
          data={priceInfo.map((elem) => ({
            month: elem.month,
            klay: <KlayItem klay={elem.klay} month={elem.month} />,
            run: <DeleteItem month={elem.month} handleList={handleList} />,
          }))}
        />
      </StylesTable>
    </div>
  );
}

export default PriceInfoPage;
