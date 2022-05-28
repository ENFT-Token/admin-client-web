import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import UserInfo, {IUserInfo} from "../../components/UserInfo";
import { Scrollbars } from 'react-custom-scrollbars';

interface IListWidgetProps {
  title: string;
}

const StyleList = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  padding: 22px 30px 20px;
  .title {
    font-size: 24px;
    font-weight: 500;
    color: #202020;
  }

  .count {
    color: #A5A5A5;
  }

  .viewMore {
    width: 100%;
  }

  .userList {
    padding-top: 10px;
    padding-bottom: 10px;

  }
`;



interface IListItemProps {
    items: IUserInfo[];
    title: string;
    onViewMoreClick?: React.MouseEventHandler<HTMLInputElement>;
}

function ListWidget({ title,items,onViewMoreClick }: IListItemProps) {
  return (
    <StyleList>
        <div >
            <div className="title" >{title}</div>
            <div className="count">You have total list of {items.length}</div>
        </div>
        <Scrollbars>
            {items.map((item,idx) => (
                <div className={"userList"} key={`userList=${idx}`}>
                    <UserInfo src={"/svg/logo.svg"} name={"asds"} subname={"sd"}/>
                </div>
            ))}
        </Scrollbars>
        <div className="viewMore" >
            <Button type="outline" width={"100%"} height={52} value="View More" onClick={onViewMoreClick}/>
        </div>
    </StyleList>
  );
}

export default ListWidget;
