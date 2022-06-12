import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../models";
import { SERVER_URL } from "../../confing";
import Table, { Title } from "../../widget/TableWidget";
import { RequestAuth } from "../../models/Request";
import { Profile } from "../ApprovePage";
import { useQuery } from "react-query";
import axios from "axios";
import jwt_decode from "jwt-decode";
export interface IListData {
  //렌더링계속되므로 함수밖에 작성
  address: string;
  location: string;
  nickname: string;
  profile: string;
  sex: string;
}

export default function MembersPage() {
  const { data: members } = useQuery<Record<string, string>[]>("memberList");
  const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
  const [ticketInfo, setTicketInfo] = useState<Record<string, any>>({});
  const columns = useMemo(
    () => [
      {
        Header: "프로필",
        accessor: "profile",
      },
      {
        Header: "닉네임",
        accessor: "nickname",
      },
      {
        Header: "만료일",
        accessor: "endDay",
      },
      {
        Header: "성별",
        accessor: "sex",
      },
      {
        Header: "지갑 주소",
        accessor: "address",
      },
    ],
    []
  );

  useEffect(() => {
    if (members) {
      // 멤버가 소유한 티켓 조회하고 데이터 꺼내기
      const fetch = async () => {
        const data: Record<string, any> = {};
        for (const { address } of members) {
          const response = await axios.get(`http://${SERVER_URL}/user/myNFT`, {
            params: {
              address,
            },
          });
          console.log(response.data);
          data[address] = response.data
            .map((token: string) => jwt_decode(token))
            .find((v: any) => v.place === admin?.place);
        }
        setTicketInfo(data);
      };
      fetch();
    }
  }, [members]);

  const data = useMemo(() => {
    return (
      members?.map((v) => {
        return {
          profile: (
            <Profile
              width="60"
              height="60"
              src={`http://${SERVER_URL}${v.profile}`}
            ></Profile>
          ),
          endDay: ticketInfo[v.address]?.end_date ?? "-",
          nickname: v.nickname,
          //requestDay: v.requsetDay,
          sex: v.sex,
          address: v.address,
        };
      }) ?? []
    );
  }, [members, ticketInfo]);

  if (!members) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Title>Members list</Title>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}
