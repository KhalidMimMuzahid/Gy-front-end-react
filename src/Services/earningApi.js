import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import { getLocalStorage } from "../utils/function/localStorage";

export const earningApi = createApi({
  reducerPath: "earningApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    // mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("safe_secure_token"));
      return headers;
    },
  }),
  tagTypes: ["adminEarning", "user", "boosterController"], // automatic-data fetching
  endpoints: (builder) => ({
    // admin
    roiIncomeData: builder.query({
      query: () => "/api/v1/private/roi_income_data",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    levelIncomeData: builder.query({
      query: () => "/api/v1/private/level_income_data",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getAutopoolMembersAdmin: builder.query({
      query: () => "/api/v1/private/autopool_users",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    addTreeAutoPoolAdmin: builder.mutation({
      // user login
      query: (body) => ({
        url: "/api/v1/private/autopool_tree_structure",
        method: "POST",
        body,
      }),
      invalidatesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getBoosterIncomeMembersAdmin: builder.query({
      query: () => "/api/v1/private/all_booster_user",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getAllBoosterIncomeIDsAdmin: builder.query({
      query: () => "/api/v1/private/total_booster_user",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getBoosterUpgradeIncome: builder.query({
      query: () => "/api/v1/private/sponsor_booster_income_admin",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    addBoostTreeAutPoolAdmin: builder.mutation({
      // user login
      query: (body) => ({
        url: "/api/v1/private/booster_tree_structure",
        method: "POST",
        body,
      }),
      invalidatesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getRoyaltyMembersAdmin: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/api/v1/private/getroyaltymembers`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    addSendRoyaltyMembersMoneyAdmin: builder.mutation({
      // user login
      query: (body) => ({
        url: "/api/v1/private/sendroyaltymembersmoney",
        method: "POST",
        body,
      }),
      invalidatesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    // user earning
    roiIncomeDataUser: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/secure/get_investment`,
      providesTags: ["user"], // automatic-data fetching
    }),
    levelIncomeDataUser: builder.query({
      // query: (user_id) => `/secure/api/user/level_income/${user_id}`,
      query: () => `/secure/level_income`,
      providesTags: ["user"], // automatic-data fetching
    }),
    rewardIncomeDataUser: builder.query({
      // query: (user_id) => `/secure/api/user/reward_income/${user_id}`,
      query: () => `/secure/api/reward_income`,
      providesTags: ["user"], // automatic-data fetching
    }),
    // graphchart data
    getRoiIncomeDataUserChart: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/secure/roi_income_chart`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getLevelIncomeDataUserChart: builder.query({
      // query: (user_id) => `/secure/api/user/level_income/${user_id}`,
      query: () => `/secure/level_income_chart`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getRewardIncomeDataUserChart: builder.query({
      // query: (user_id) => `/secure/api/user/reward_income/${user_id}`,
      query: () => `/secure/reward_income_chart`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getRoyaltyIncomeHistory: builder.query({
      query: () => "/api/v1/secure/getroyaltyincomehistory",
      providesTags: ["user"], // automatic-data fetching
    }),
    getRoyaltyIncomeHistoryAdmin: builder.query({
      query: () => "/api/v1/private/getroyaltymemberhistory",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getAutoPoolHistoryEarning: builder.query({
      query: () => "/api/v1/secure/getautopool_history",
      providesTags: ["user"], // automatic-data fetching
    }),
    getDirectLevelIncome: builder.query({
      query: () => "/api/v1/secure/direct_level_income",
      providesTags: ["user"], // automatic-data fetching
    }),
    getInDirectLevelIncome: builder.query({
      query: () => "/api/v1/secure/indirec_tlevel_income",
      providesTags: ["user"], // automatic-data fetching
    }),
    getGiftIncomeHistory: builder.query({
      query: () => "/api/v1/secure/gift_income_history",
      providesTags: ["user"], // automatic-data fetching
    }),
    getDirectWithdrawIncome: builder.query({
      query: () => "/api/v1/secure/direct_withdraw_income",
      providesTags: ["user"], // automatic-data fetching
    }),
    getGiftIncomeHistoryAdmin: builder.query({
      query: () => "/api/v1/private/gift_income_history",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getGiftTransferUserListAdmin: builder.query({
      query: () => "/api/v1/private/gift_income_user",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getGiftTransferHistoryAdmin: builder.query({
      query: () => "/api/v1/private/gift_income_history",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getUserTopupHistoryAdmin: builder.query({
      query: () => "/api/v1/private/all_user_activation",
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getIncomeLevelUpdate: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/secure/api/income_level_update`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getIncomeLevelUpdateAdmin: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/api/v1/private/get_income_level_update`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    addSendGiftSingleUserAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/private/send_gift_single_user/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    addSendGiftAllUserAdmin: builder.mutation({
      query: () => ({
        url: `/api/v1/private/send_gift_all_user`,
        method: "POST",
      }),
      invalidatesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getBoosterIncomeHistory: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/secure/api/booster_history`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getIndirectIncomeHistoryAdmin: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/api/v1/private/indirect_income_data`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getDirectIncomeHistoryAdmin: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/api/v1/private/direct_income_data`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getUserActivationIncome: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/secure/api/user_activation_income`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getDirectFundTransferIncome: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/secure/api/direct_fundtransfer_income`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getBonanzaAchievement: builder.query({
      query: () => `/secure/api/getBonanzaAchievement`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getBonanzaPrize: builder.query({
      query: () => `/secure/api/getBonanzaPrize`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getBoosterUpgradeUserIncome: builder.query({
      query: () => `/secure/api/sponsor_booster_income`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getDirectWithdrawIncomeHistoryAdmin: builder.query({
      // query: (user_id) => `/secure/api/user/get_investment/${user_id}`,
      query: () => `/api/v1/private/direct_withdraw_income`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getSingleBonanzaAchieve: builder.mutation({
      query: (body) => ({
        url: `/api/v1/private/getSingleBonanzaAchieve`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getAllBonanzaPrize: builder.query({
      query: () => `/api/v1/private/getAllBonanzaPrize`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getAllBonanzaAchieverList: builder.query({
      query: () => `/api/v1/private/getAllBonanzaAchieverList`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getBoosterControllUsers: builder.query({
      query: () => `/api/v1/private/booster_eligible_users`,
      providesTags:  ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    updateBoosterController: builder.mutation({
      query: (body) => ({
        url: `/api/v1/private/booster_controller`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags:  ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    // ************************** New ENDPOINT **********************
    getAllDirLevIncomeHistoryAdmin: builder.query({
      // SAST API
      query: () => `/api/v1/private/get_level_income`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getAllRankIncomeHistoryAdmin: builder.query({
      query: () => `/api/v1/private/get_rank_income`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getAllStakingIncomeHistoryAdmin: builder.query({
      // SAST API
      query: () => `/api/v1/private/get_roi_income`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getAllStakingLevelIncomeHistoryAdmin: builder.query({
      query: () => `/api/v1/private/staking_level_income_history_by_admin`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getAllBonusRewardIncomeHistoryAdmin: builder.query({
      query: () => `/api/v1/private/bonus_income_history_by_admin`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getAllGlobalPoolIncomeHistoryAdmin: builder.query({
      query: () => `/api/v1/private/global_pool_income_history_by_admin`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    getGlobalPoolUserListAdmin: builder.query({
      query: () => `/api/v1/private/global_pool_eligible_user_list`,
      providesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    addGlobalPoolIncomeAdmin: builder.mutation({
      query: (body) => ({
        url: `/api/v1/private/global_pool_achiever_income`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["adminEarning", "user", "boosterController"], // automatic-data fetching
    }),
    /////////////////////////////////// User/////////////////////
    getAllLevelIncomeHistoryUser: builder.query({
      // SAST API
      // SAST API
      query: () => `/api/v1/secure/get_level_income`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getUserRankIncome: builder.query({
      // SAST API
      // SAST API
      query: () => `/api/v1/secure/get_rank_income`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getRoiIncomeHistoryUser: builder.query({
      // SAST API
      query: () => `/api/v1/secure/get_roi_income`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getRewardHistoryUser: builder.query({
      // SAST API
      query: () => `/api/v1/secure/get_reward`,
      providesTags: ["user"], // automatic-data fetching
    }),
  }),
});

export const {
  useRoiIncomeDataQuery,
  useLevelIncomeDataQuery,
  useRoiIncomeDataUserQuery,
  useGetIncomeLevelUpdateQuery,
  useGetDirectWithdrawIncomeQuery,
  useLevelIncomeDataUserQuery,
  useRewardIncomeDataUserQuery,
  useGetLevelIncomeDataUserChartQuery,
  useGetRewardIncomeDataUserChartQuery,
  useGetRoiIncomeDataUserChartQuery,
  useGetRoyaltyMembersAdminQuery,
  useGetRoyaltyIncomeHistoryAdminQuery,
  useGetAutopoolMembersAdminQuery,
  useAddTreeAutoPoolAdminMutation,
  useGetBoosterIncomeMembersAdminQuery,
  useGetAllBoosterIncomeIDsAdminQuery,
  useGetBoosterUpgradeIncomeQuery,
  useGetBoosterUpgradeUserIncomeQuery,
  useAddBoostTreeAutPoolAdminMutation,
  useGetRoyaltyIncomeHistoryQuery,
  useGetAutoPoolHistoryEarningQuery,
  useAddSendRoyaltyMembersMoneyAdminMutation,
  useGetDirectLevelIncomeQuery,
  useGetInDirectLevelIncomeQuery,
  useGetGiftIncomeHistoryQuery,
  useGetGiftIncomeHistoryAdminQuery,
  useGetGiftTransferUserListAdminQuery,
  useGetIncomeLevelUpdateAdminQuery,
  useGetGiftTransferHistoryAdminQuery,
  useGetUserTopupHistoryAdminQuery,
  useAddSendGiftAllUserAdminMutation,
  useAddSendGiftSingleUserAdminMutation,
  useGetBoosterIncomeHistoryQuery,
  useGetIndirectIncomeHistoryAdminQuery,
  useGetDirectIncomeHistoryAdminQuery,
  useGetDirectFundTransferIncomeQuery,
  useGetUserActivationIncomeQuery,
  useGetDirectWithdrawIncomeHistoryAdminQuery,
  useGetBonanzaAchievementQuery,
  useGetBonanzaPrizeQuery,
  useGetSingleBonanzaAchieveMutation,
  useGetAllBonanzaAchieverListQuery,
  useGetAllBonanzaPrizeQuery,
  useGetBoosterControllUsersQuery,
  useUpdateBoosterControllerMutation,
  // **************** Safe & Secure Trade.org NEW ENDPOINT **********************
  useGetAllDirLevIncomeHistoryAdminQuery, // SAST API
  useGetAllRankIncomeHistoryAdminQuery,
  useGetAllStakingIncomeHistoryAdminQuery, // SAST API
  useGetAllStakingLevelIncomeHistoryAdminQuery,
  useGetAllBonusRewardIncomeHistoryAdminQuery,
  useGetAllGlobalPoolIncomeHistoryAdminQuery,
  useAddGlobalPoolIncomeAdminMutation,
  useGetGlobalPoolUserListAdminQuery,
  ////////////////// User //////////////
  useGetAllLevelIncomeHistoryUserQuery, // SAST API
  useGetRoiIncomeHistoryUserQuery, // SAST API
  useGetRewardHistoryUserQuery, // SAST API
  useGetUserRankIncomeQuery,
} = earningApi;
