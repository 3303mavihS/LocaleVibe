import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginReducer";
import headerElementReducer from "../features/headerElementReducer";
import vibespotInfoReducer from "../features/vibespotInfoReducer";
import locationIndoReducer from "../features/locationReducer";

const store = configureStore({
  reducer: {
    auth: loginReducer,
    header: headerElementReducer,
    locationInfo: locationIndoReducer,
    vibespotInfoPart: vibespotInfoReducer,
  },
});

export default store;
