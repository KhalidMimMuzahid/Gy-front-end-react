import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import { getLocalStorage } from "../utils/function/localStorage";

export const topupApi = createApi({
  reducerPath: "topupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    // mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("safe_secure_token"));
      return headers;
    },
  }),
  tagTypes: ["userTopup", "adminUser", "autoTrade", "autoTradeFriendly"], // automatic-data fetching
  endpoints: (builder) => ({
    //admin
    addTopUp: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/make_topup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["userTopup", "adminUser", "autoTrade", "autoTradeFriendly"],
    }),
    createROIAdmin: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/create_investment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["userTopup", "adminUser", "autoTrade", "autoTradeFriendly"],
    }),
    // user
    autoTradeUpgrade: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/auto_trade_topup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["autoTrade"],
    }),
    autoTradeFriendlyTopup: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/auto_trade_friendly_topup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["autoTradeFriendly"],
    }),
    getAutoTradeUpgradeHistory: builder.query({
      query: () => ({
        url: "/api/v1/secure/get_auto_trade_upgrade_history",
        method: "GET",
      }),
      providesTags: ["autoTrade"],
    }),
    getGlobalPoolIncome: builder.query({
      query: () => ({
        url: "/api/v1/secure/global_income_history_by_user",
        method: "GET",
      }),
      providesTags: ["autoTrade"],
    }),
    getRankIncome: builder.query({
      query: () => ({
        url: "/api/v1/secure/rank_income_history_by_user",
        method: "GET",
      }),
      providesTags: ["autoTrade"],
    }),
    getStakingIncome: builder.query({
      query: () => ({
        url: "/api/v1/secure/staking_income_history_by_user",
        method: "GET",
      }),
      providesTags: ["autoTrade"],
    }),
    getStakingLevelIncome: builder.query({
      query: () => ({
        url: "/api/v1/secure/staking_level_income_history_by_user",
        method: "GET",
      }),
      providesTags: ["autoTrade"],
    }),
    getAutoTradeIncome: builder.query({
      query: () => ({
        url: "/api/v1/secure/get_auto_trade_roi_history",
        method: "GET",
      }),
      providesTags: ["autoTrade"],
    }),
    getAutoTradeUpgradeFriendlyHistory: builder.query({
      query: () => ({
        url: "/api/v1/secure/get_auto_trade_upgrade_friendly_history",
        method: "GET",
      }),
      providesTags: ["autoTradeFriendly"],
    }),
    getAllTopUpHistory: builder.query({
      query: () => ({
        url: "/api/v1/private/get_topup_history",
        method: "GET",
      }),
      providesTags: ["userTopup", "adminUser", "autoTrade", "autoTradeFriendly"],
    }),
  }),
});

export const {
  useAddTopUpMutation,
  useCreateROIAdminMutation,
  // User
  useAutoTradeUpgradeMutation,
  useGetAutoTradeUpgradeHistoryQuery,
  useGetGlobalPoolIncomeQuery,
  useGetRankIncomeQuery,
  useGetStakingIncomeQuery,
  useGetStakingLevelIncomeQuery,
  useGetAutoTradeIncomeQuery,
  useAutoTradeFriendlyTopupMutation,
  useGetAutoTradeUpgradeFriendlyHistoryQuery,
  useGetAllTopUpHistoryQuery,
} = topupApi;
