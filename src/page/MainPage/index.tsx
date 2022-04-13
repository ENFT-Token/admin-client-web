import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

export default function MainPage() {
  const { adminInfo } = useSelector((store: RootState) => store.admin);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const [count, setCount] = useState(0);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (adminInfo?.access_token !== undefined) {
        axios
          .get("http://3.39.24.209/check/count", {
            headers: {
              Authorization: `Bearer ${adminInfo?.access_token}`,
            },
            params: {
              place: adminInfo.place,
            },
          })
          .then((v) => {
            if (v.status === 200) {
              console.log(v.data);
              setCount(v.data.count);
            }
          });
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>헬스장 이름 : {adminInfo?.place}</h1>
      <p>현재 이용자 수 : {count}</p>
    </div>
  );
}
