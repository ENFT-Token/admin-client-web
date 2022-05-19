import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../models";
import { setPriceInfo } from "../../models/admin";
import { RequestAuth } from "../../models/Request";
import store from "../../models/store";

function PriceInfo() {
  return <div></div>;
}

function PriceInfoPage() {
  const { priceInfo } = useSelector((store: Rootstate) => store.admin);
  useEffect(() => {
    RequestAuth("GET", "/admin/priceInfo").then((response) =>
      store.dispatch(setPriceInfo(response.data))
    );
  }, []);

  useEffect(() => {
    console.log(priceInfo);
  }, [priceInfo]);

  return <div></div>;
}

export default PriceInfoPage;
