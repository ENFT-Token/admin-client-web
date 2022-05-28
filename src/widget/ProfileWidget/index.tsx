import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../components/Button";
import MyInfo from "../../components/MyInfo";
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
    margin-left: 27px;
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
          <MyInfo
            src="/svg/location.svg"
            label="LOCATION"
            value={admin?.location ?? ""}
          />
          <MyInfo
            src="/svg/phone.svg"
            label="PHONE"
            value={admin?.phone ?? ""}
          />
          <MyInfo
            src="/svg/wallet.svg"
            label="WALLET"
            value={admin?.address ?? ""}
          />
        </div>
      </div>
      {}
    </StyledProfileWidget>
  );
}

const Header = styled.span`
  color: rgb(148, 143, 143);
  margin-right: 30px;
`;
