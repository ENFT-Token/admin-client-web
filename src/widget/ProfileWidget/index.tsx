import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../components/Button";
import { SERVER_URL } from "../../confing";
import { Rootstate } from "../../models";
import "./index.css";

const StyledProfileWidget = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;

  .profile {
    margin-top: 42px;
    margin-left: 37px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .profileImg {
      margin-bottom: 16px;
      display: inline-block;
      width: 216px;
      height: 216px;
      border: 1px solid #00000000;
      border-radius: 40px;
    }
    .profile_btn {
    }
  }
  .profileInfo {
    margin-top: 50px;
    margin-left: 23px;
    .nameInfo {
      margin-left: 10px;
      .name {
        font-size: 24px;
        font-weight: bold;

        .name_light {
          display: inline-block;
          font-weight: normal;
        }
        margin-bottom: 20px;
      }
      .place {
        color: #2e2e2e;
        font-size: 36px;
      }
      .role {
        color: #2e2e2eb2;
        font-size: 16px;
      }
    }

    .info_list {
      margin-top: 44px;
    }
  }
`;

const StyleUserInfo = styled.div`
  display: flex;
  margin-bottom: 13px;
  .icon_wrapper {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    background-color: #f5f5f5;
    border-radius: 50px;

    text-align: center;
    line-height: 45px;
    img {
      height: 24px;
    }
  }

  .label {
    color: #c7c7c7;
    font-size: 16px;
    margin-bottom: 3px;
  }
  .value {
    color: #202020;
    font-size: 16px;
    font-weight: bold;
  }
`;

interface IUserInfoProps {
  src: string;
  label: string;
  value: string;
}

function UserInfo({ src, label, value }: IUserInfoProps) {
  return (
    <StyleUserInfo>
      <div className="icon_wrapper">
        <img src={src} />
      </div>
      <div>
        <div className="label">{label}</div>
        <div className="value">{value}</div>
      </div>
    </StyleUserInfo>
  );
}

export default function ProfileWidget() {
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  return (
    <StyledProfileWidget>
      <div className="profile">
        <img
          src={`http://${SERVER_URL}${admin?.cover_img}`}
          className="profileImg"
        />
        <Button
          type="ghost"
          value="Edit Profile"
          width={185}
          height={52}
          className="profile_btn"
        />
      </div>

      <div className="profileInfo">
        <div className="nameInfo">
          <div className="name">
            안녕하세요 <div className="name_light">{admin?.nickname}님</div>
          </div>
          <div className="place">{admin?.place}</div>
          <div className="role">Super Admin</div>
        </div>
        <div className="info_list">
          <UserInfo
            src="/svg/location.svg"
            label="LOCATION"
            value={admin?.location ?? ""}
          />
          <UserInfo
            src="/svg/phone.svg"
            label="PHONE"
            value={admin?.phone ?? ""}
          />
          <UserInfo
            src="/svg/wallet.svg"
            label="WALLET"
            value={admin?.address ?? ""}
          />
        </div>
      </div>
      {/* <div className="headerInfo">
        <CgProfile className="profile" size="85" />
        <div>관리자</div>
      </div>
      <div className="bodyInfo">
        <div className="nickname info">안녕하세요 {admin?.nickname}님</div>
        <div className="location info">
          <Header>헬스장 주소</Header>
          {admin?.location}
        </div>
        <div className="phone info">
          <Header>헬스장 번호</Header>
          {admin?.phone}
        </div>
        <div className="walletAddress info">
          <Header>{admin?.nickname} 님의 지갑 주소</Header>
          {admin?.address}
        </div>
      </div>
      <table></table> */}
    </StyledProfileWidget>
  );
}

const Header = styled.span`
  color: rgb(148, 143, 143);
  margin-right: 30px;
`;
