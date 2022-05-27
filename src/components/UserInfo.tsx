import styled from "styled-components";
import { IUserInfoProps } from "./components-type";
import React from "react";

/**
 *
 *   margin-top: 15px;
 *   float: right;
 *   cursor: pointer;
 *   margin-bottom: 13px;
 *   margin-right: 20px;
 */

const StyleUserInfo = styled.div`
  display: flex;

  img {
    width: 57px;
    height: 57px;
    border-radius: 10px;
    margin-right: 24px;
  }

  .name {
    color: #000000;
    font-size: 16px;
    margin-bottom: 3px;
  }

  .subName {
    color: #8F8F8F;
    font-size: 14px;
  }
`;

export interface IUserInfo {
    src: string;
    name: string;
    subname: string;
}

function UserInfo({ src, name, subname }: IUserInfo) {
    return (
        <StyleUserInfo>
            <div className="icon_wrapper">
                <img src={src} />
            </div>
            <div>
                <div className="name">{name}</div>
                <div className="subName">{subname}</div>
            </div>
        </StyleUserInfo>
    )
}

export default UserInfo;
