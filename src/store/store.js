import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { depositeApi } from "../Services/depositeApi";
import { earningApi } from "../Services/earningApi";
import { fundTransferApi } from "../Services/fundTransferApi";
import themeReducer from "../Services/themeSlice";
import { topupApi } from "../Services/topupApi";
import { userApi } from "../Services/userApi";
import { walletApi } from "../Services/walletApi";
import { withdrawApi } from "../Services/withdrawApi";
import { supportApi } from "../Services/SupportApi";
import { settingApi } from "../Services/Setting";
import { contactUsMessage } from "../Services/contactUsMessage";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [userApi.reducerPath]: userApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [earningApi.reducerPath]: earningApi.reducer,
    [depositeApi.reducerPath]: depositeApi.reducer,
    [withdrawApi.reducerPath]: withdrawApi.reducer,
    [topupApi.reducerPath]: topupApi.reducer,
    [fundTransferApi.reducerPath]: fundTransferApi.reducer,
    [supportApi.reducerPath]: supportApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
    [contactUsMessage.reducerPath]: contactUsMessage.reducer,
    /** here will be more reducer */
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      earningApi.middleware,
      depositeApi.middleware,
      topupApi.middleware,
      walletApi.middleware,
      withdrawApi.middleware,
      fundTransferApi.middleware,
      supportApi.middleware,
      settingApi.middleware, 
      contactUsMessage.middleware, 
    ]),
  /** here will be more reducer */
});

setupListeners(store.dispatch);
