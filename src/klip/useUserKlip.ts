import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

function useUserKilp() {
  const [qrValue, setQrValue] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const prepareQr = useCallback(() => {
    const fetch = async () => {
      const response = await axios.post(
        "https://a2a-api.klipwallet.com/v2/a2a/prepare",
        {
          bapp: {
            name: "ENFT",
          },
          type: "auth",
        }
      );
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      console.log(qrcode);
      setQrValue(qrcode);
      const pollingInterval = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              setWalletAddress(res.data.result.klaytn_address);
              console.log(res.data.result);
              clearInterval(pollingInterval);
            }
          });
      }, 1000);
    };
    fetch();
  }, []);
  return { walletAddress, qrValue, prepareQr };
}

export default useUserKilp;
