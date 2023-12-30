import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import { getLocalStorage } from "../utils/function/localStorage";

export const withdrawApi = createApi({
  reducerPath: "withdrawApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    // mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("grow_more_today_token"));
      return headers;
    },
  }),
  tagTypes: ["adminWithdraw", "userWithdraw", "autoTradeWithdraw"], // automatic-data fetching
  endpoints: (builder) => ({
    // admin
    allWithdrawHistory: builder.query({
      query: () => "/api/v1/private/show_all_withdraw",
      providesTags: ["adminWithdraw", "userWithdraw", "autoTradeWithdraw"], // automatic-data fetching
    }),
    allAutoTradeWithdrawHistory: builder.query({
      query: () => "/api/v1/private/auto_trade_withdraw_requests",
      providesTags: ["adminWithdraw", "userWithdraw", "autoTradeWithdraw"], // automatic-data fetching
    }),
    editAutoTradeWithdrawStatus: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/change_auto_trade_withdraw_status",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminWithdraw", "userWithdraw", "autoTradeWithdraw"],
    }),
    editWithdrawStatus: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/update_withdraw_status",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminWithdraw", "userWithdraw", "autoTradeWithdraw"],
    }),
    completedWithdrawHistory: builder.query({
      query: () => "/api/v1/private/get_success_withdraw",
      providesTags: ["adminWithdraw", "userWithdraw", "autoTradeWithdraw"], // automatic-data fetching
    }),
    canceledWithdrawHistory: builder.query({
      query: () => "/api/v1/private/get_rejected_withdraw",
      providesTags: ["adminWithdraw", "userWithdraw", "autoTradeWithdraw"], // automatic-data fetching
    }),
    getAllColorPrductionwHistory: builder.query({
      query: () => "/api/v1/private/get-all-color-priediction-history",
      providesTags: ["adminWithdraw", "userWithdraw", "autoTradeWithdraw"], // automatic-data fetching
    }),
    selectWinner: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/select-winner",
        method: "POST",
        body,
      }),
      invalidatesTags: ["adminWithdraw", "userWithdraw", "autoTradeWithdraw"],
    }),
  }),
});

export const {
  useAllWithdrawHistoryQuery,
  useCompletedWithdrawHistoryQuery,
  useCanceledWithdrawHistoryQuery,
  useEditWithdrawStatusMutation,
  useAllAutoTradeWithdrawHistoryQuery,
  useEditAutoTradeWithdrawStatusMutation,
  useGetAllColorPrductionwHistoryQuery,
  useSelectWinnerMutation,
} = withdrawApi;
