import axios from "axios";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import KlipButton from "../../components/KlipButton";
import { SERVER_URL } from "../../confing";
import useUserKilp from "../../klip/useUserKlip";

interface IKlipWidgetProps {
  onSuccess?:
    | ((walletAddress: string) => Promise<void>)
    | ((walletAddress: string) => void);
}

function KlipWidget({ onSuccess }: IKlipWidgetProps) {
  const { prepareQr, qrValue, walletAddress } = useUserKilp();

  useEffect(() => {
    if (walletAddress === "") return;
    if (onSuccess) onSuccess(walletAddress);
  }, [walletAddress]);

  return (
    <Form>
      <Container>
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

          <KlipButton onClick={() => prepareQr()} />
        </div>
      </Container>
    </Form>
  );
}
const Container = styled.div``;
const Form = styled.div``;

export default KlipWidget;
