import React from "react";
import LoginWidget from "../../widget/LoginWidget";
import styled from "styled-components";
export default function LoginPage() {
  return (
    <Container>
      <LoginWidget />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;
