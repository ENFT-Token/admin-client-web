import { combineReducers } from '@reduxjs/toolkit';
import adminReducer from './admin';
import memberReducer from './members';

const rootReducer = combineReducers({
    members : memberReducer,
    admin : adminReducer
});

export default rootReducer;

export type Rootstate = ReturnType<typeof rootReducer>;
// 루트 리듀서의 반환값를 유추해준다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내준다.