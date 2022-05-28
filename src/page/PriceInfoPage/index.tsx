import { Input, InputNumber, message, Upload } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import {  RequestAuth } from "../../models/Request";
import Table from "../../widget/TableWidget";
import "./index.css";
import {useQuery} from "react-query";
import queryClient from "../../queries";

function DeleteItem({
  month,
}: {
  month: number;
}) {
  const handleDelete = async () => {
    const response = await RequestAuth("DELETE", "/admin/priceInfo", {
      month: Number(month),
    });
    if(response.status === 200) {
      queryClient.invalidateQueries(["priceInfo"]);
    }
    console.log(response);


  };

  return (
    <Button type="red" onClick={handleDelete} value={"삭제"} width={100} height={30} />

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
          <Button type="outline" onClick={() => setEdit(true)} value={"EDIT"} width={100} height={30}/>
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
          <Button type="blue" onClick={handleSaved} value={"SAVE"}  width={100} height={30} style={{marginLeft:"10px",marginRight:'10px'}}/>
          <Button type="red" onClick={() => setEdit(false)} value={"CANCEL"}  width={100} height={30}/>
        </>
      )}
    </div>
  );
}

function PriceInfoPage() {

  const {data:priceInfo} = useQuery<Record<"month" | "klay",number>[]>("priceInfo");


  const [monthAndKlay, setMonthAndKlay] = useState({
    month: 0,
    klay: 0,
  });

  const handleAdd = async () => {
    await RequestAuth("POST", "/admin/priceInfo", monthAndKlay);
    queryClient.invalidateQueries(["priceInfo"]);
  };

  const handleSave = async (month: number, klay: number) => {
    const response = await RequestAuth("PUT", "/admin/priceInfo", {
      month,
      klay,
    });
    if (response.status === 200) {
      queryClient.invalidateQueries(["priceInfo"]);
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


  const tableData = useMemo(() => {
    return priceInfo?.map((elem) => ({

      month: elem.month,
      klay: (
          <KlayItem
              klay={elem.klay}
              month={elem.month}
              handleSave={handleSave}
          />
      ),
      run: <DeleteItem month={elem.month} />,
    })) ?? []
  },[priceInfo]);

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

            <Button type="green" onClick={handleAdd} value={"추가"} width={"100%"} height={30}/>
          </div>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          data={tableData}
        />
      </div>
    </div>
  );
}

export default PriceInfoPage;
