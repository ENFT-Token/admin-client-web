import axios from "axios";
import QRCode from "qrcode.react";
import React, { useEffect } from "react";
import KlipButton from "../../components/KlipButton";
import { SERVER_URL } from "../../confing";
import useUserKilp from "../../klip/useUserKlip";

interface IKlipWidgetProps {
  type: "login" | "register";
  onSuccess?:
    | ((walletAddress: string) => Promise<void>)
    | ((walletAddress: string) => void);
}

function KlipWidget({ type, onSuccess }: IKlipWidgetProps) {
  const { prepareQr, qrValue, walletAddress } = useUserKilp();

  useEffect(() => {
    if (walletAddress === "") return;

    if (onSuccess) {
      onSuccess(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {qrValue !== "" && (
        <div style={{ textAlign: "center" }}>
          <QRCode value={qrValue} style={{ marginBottom: "10px" }} />
          <p>QR 코드를 통해 카카오톡에 연동해주세요 !</p>
        </div>
      )}
      <KlipButton type={type} onClick={() => prepareQr()} />
    </div>
  );
}

export default KlipWidget;
