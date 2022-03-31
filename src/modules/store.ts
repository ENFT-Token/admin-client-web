import { configureStore } from "@reduxjs/toolkit";
import WrapperStatistic from "antd/lib/statistic/Statistic";
import rootReducer  from "./index"

const store = configureStore({reducer:rootReducer});

export default store;

