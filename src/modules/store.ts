import { configureStore } from "@reduxjs/toolkit";
import WrapperStatistic from "antd/lib/statistic/Statistic";
import rootReducer  from "./index"
import rootReducer2 from "./members";

const store = configureStore(
{
    reducer: rootReducer
    
});

export default store;

