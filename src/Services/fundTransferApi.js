import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import { getLocalStorage } from "../utils/function/localStorage";

export const fundTransferApi = createApi({
  reducerPath: "fundTransferApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    mode: "cors",
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("grow_more_today_token"));
      return headers;
    },
  }),
  tagTypes: ["adminFundTransfer", "userFundTransfer"], // automatic-data fetching
  endpoints: (builder) => ({
    // admin
    allFundTransferHistoryAdmin: builder.query({
      query: () => "/api/v1/private/fund_transfer_report",
      providesTags: ["adminFundTransfer", "userFundTransfer"], // automatic-data fetching
    }),
    fundTransferHistoryAdmin: builder.query({
      query: () => "/api/v1/private/admin_fundtransfer",
      providesTags: ["adminFundTransfer", "userFundTransfer"], // automatic-data fetching
    }),
  }),
});

export const {
  useAllFundTransferHistoryAdminQuery,
  useFundTransferHistoryAdminQuery,
} = fundTransferApi;
