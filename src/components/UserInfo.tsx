import styled from "styled-components";
import { IUserInfoProps } from "./components-type";

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
export default UserInfo;
