import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginReducer";
import headerElementReducer from "../features/headerElementReducer";
import vibespotInfoReducer from "../features/vibespotInfoReducer";

const store = configureStore({
  reducer: {
    auth: loginReducer,
    header: headerElementReducer,
    vibespotInfoPart: vibespotInfoReducer,
  },
});

export default store;
