import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import { getLocalStorage } from "../utils/function/localStorage";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    // mode: "cors",
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("safe_secure_token"));
      return headers;
    },
  }),
  tagTypes: ["User", "adminUser", "Validate", "autoTrade","bank"], // automatic-data fetching
  endpoints: (builder) => ({
    getLoginUser: builder.query({
      query: () => "/api/v1/common/get_user",
      providesTags: ["User"], // automatic-data fetching
    }),
    getAutopoolOneStatus: builder.query({
      query: () => "/api/v1/secure/autopool_one_status",
      providesTags: ["User"], // automatic-data fetching
    }),
    // for auth user
    addUser: builder.mutation({
      // user register
      query: (body) => ({
        url: "/api/v1/public/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    addLogin: builder.mutation({
      // user login
      query: (body) => ({
        url: "/api/v1/public/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    addUserVerify: builder.mutation({
      query: (token) => ({
        url: `/api/v1/public/verify_user/${token}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    addForgotPass: builder.mutation({
      query: (body) => ({
        url: "/api/v1/public/forgot_password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    addOtp: builder.mutation({
      query: (body) => ({
        url: "/api/v1/public/create_otp",
        method: "POST",
        body: body,
      }),
      // invalidatesTags: ["User"], // automatic-data fetching
    }),
    addResetPass: builder.mutation({
      query: ({ token, password }) => ({
        url: `/api/v1/public/reset_password/${token}`,
        method: "POST",
        body: { password: password },
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    getValidateSponsorName: builder.query({
      query: (user_id) => `/api/v1/public/get_sponsor/${user_id}`,
      providesTags: ["Validate"], // automatic-data fetching
    }),
    getValidateSponsorId: builder.query({
      query: (sponsor_id) => `/api/v1/public/get_sponsor/${sponsor_id}`,
      providesTags: ["Validate"], // automatic-data fetching
    }),
    getValidateEmail: builder.query({
      query: (email) => `/api/v1/public/check_email/${email}`,
      providesTags: ["Validate"], // automatic-data fetching
    }),
    getValidateMobile: builder.query({
      query: (mobile) => `/api/v1/public/check_mobile/${mobile}`,
      providesTags: ["Validate"], // automatic-data fetching
    }),
    // get all team member list
    levelTeamList: builder.query({
      // query: (user_id) => `/secure/api/level_team/${user_id}`,
      query: () => `/api/v1/secure/get_level_team`,
      providesTags: ["User"], // automatic-data fetching
    }),
    getDirectTeam: builder.query({
      // query: (user_id) => `/secure/api/level_team/${user_id}`,
      query: () => `/api/v1/secure/get_direct_team`,
      providesTags: ["User"], // automatic-data fetching
    }),
    getTeamBusiness: builder.query({
      // query: (user_id) => `/secure/api/level_team/${user_id}`,
      query: () => `/api/v1/secure/get_level_business`,
      providesTags: ["User"], // automatic-data fetching
    }),
    getMonthlyDirectMember: builder.query({
      query: () => `/secure/api/monthly_direct_member`,
      providesTags: ["User"], // automatic-data fetching
    }),
    getDashboardStats: builder.query({
      // SAST API
      query: () => `/api/v1/secure/get_dashboardStats_by_user`,
      providesTags: ["User"], // automatic-data fetching
    }),

    // for crud
    editUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/user/update_user_info",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/user/change_password",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editEmail: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/user/update_email",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editTrxPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/user/change_trx_password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editTrxAddress: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/user/update_trx_address",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editImage: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/update_profile_pic",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    // admin
    getAllUser: builder.query({
      query: () => "/api/v1/private/user_analytics",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    allUserList: builder.query({
      query: () => "/api/v1/private/user/get_all_users",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    editUserList: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/edit_users",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminUser"],
    }),
    deleteUserList: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/delete_user",
        method: "PUT",
        body: { userId: body.userId },
      }),
      invalidatesTags: ["adminUser"],
    }),
    editUserStatus: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/change_user_status",
        method: "PUT",
        body: { user_id: body.userId },
      }),
      invalidatesTags: ["adminUser"],
    }),
    editAdminEmail: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/update_email",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminUser"],
    }),
    editAdminPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/change_password",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminUser"],
    }),
    activeUserList: builder.query({
      query: () => "/api/v1/private/user/get_active_users",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    blockUserList: builder.query({
      query: () => "/api/v1/private/user/get_blocked_users",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    addAutoPoolController: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/change_autopool_status",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminUser"],
    }),
    getAutopoolStatus: builder.query({
      query: () => "/api/v1/private/get_autopool_setting",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    getMemberBusinessHistory: builder.query({
      query: ({ level, userId }) =>
        `/api/v1/private/user/get_team_stats_details?level=${level}&userId=${userId}`,
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    addTeamStatistics: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/get_team_stats",
        method: "POST",
        body,
      }),
      invalidatesTags: ["adminUser"],
    }),
    // auto trade
    getAutoTradeUsers: builder.query({
      query: () => "/api/v1/private/auto_trade_users",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    getAutoTradeAllUpgradeHistory: builder.query({
      query: () => "/api/v1/private/auto_trade_upgrade_history",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    getAutoTradeAllRoiIncomeHistory: builder.query({
      query: () => "/api/v1/private/auto_trade_roi_income_history",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    ///////////////////////// NEW ENDPOINT ////////////////////
    getAllUserStatistics: builder.query({
      query: () => "/api/v1/private/get_admin_dashboard_data",
      providesTags: ["adminUser"], // automatic-data fetching
    }),

    addBank: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/user/add-bank",
        method: "PUT",
        body,
      }),
    }),
    getSuccessKyc: builder.query({
      query: () => "/api/v1/secure/user/get-kyc-success-status",
    }),

    //for upload kyc
    addKyc: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/user/create-kyc",
        method: "POST",
        body,
      }),
    }),
    // for update kyc status
    updateKyc: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/update_kyc",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminUser"],
    }),
    getUserKyc: builder.query({
      query: () => "/api/v1/secure/user/get-kyc",
      providesTags: ["User"], // automatic-data fetching
    }),
    getUserBankDetail: builder.query({
      query: () => "/api/v1/secure/user/get-bank",
      providesTags: ["bank"], // automatic-data fetching
    }),
    getSuccessKyc: builder.query({
        query: () => "/api/v1/secure/user/get-kyc-success-status",
    }),


    //KYC for admin
    getAllkycAdmin: builder.query({
      query: () => "/api/v1/private/user/get_all_kyc",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    getsuccesskycAdmin: builder.query({
      query: () => "/api/v1/private/user/get-all-success-kyc",
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    getrejectedkycAdmin: builder.query({
      query: () => "/api/v1/private/user/get-all-reject-kyc",
      providesTags: ["adminUser"], // automatic-data fetching
    }),

  }),
});

export const {
  useGetAutoTradeUsersQuery,
  useGetAutoTradeAllRoiIncomeHistoryQuery,
  useGetAutoTradeAllUpgradeHistoryQuery,
  useGetLoginUserQuery,
  useGetAutopoolOneStatusQuery,
  useGetValidateSponsorNameQuery,
  useGetValidateSponsorIdQuery,
  useGetValidateEmailQuery,
  useGetValidateMobileQuery,
  useAddUserMutation,
  useAddLoginMutation,
  useAddForgotPassMutation,
  useAddResetPassMutation,
  useEditUserMutation,
  useEditPasswordMutation,
  useEditTrxPasswordMutation,
  useEditTrxAddressMutation,
  useEditEmailMutation,
  useAddOtpMutation,
  useLevelTeamListQuery, // SAST API
  useGetDirectTeamQuery, // SAST API
  useEditImageMutation,
  useGetAllUserQuery,
  useAllUserListQuery,
  useActiveUserListQuery,
  useGetMonthlyDirectMemberQuery,
  useBlockUserListQuery,
  useEditUserListMutation,
  useEditUserStatusMutation,
  useDeleteUserListMutation,
  useEditAdminEmailMutation, // SAST API
  useEditAdminPasswordMutation, // SAST API
  useAddAutoPoolControllerMutation,
  useGetAutopoolStatusQuery,
  useAddTeamStatisticsMutation,
  /////////////////// NEW ENDPOINT ////////////////////////
  useGetAllUserStatisticsQuery,
  useGetDashboardStatsQuery, // SAST API
  useAddUserVerifyMutation,
  useGetMemberBusinessHistoryQuery,
  useGetTeamBusinessQuery,
  useAddBankMutation,
  // useGetSuccessKycQuery,
  useAddKycMutation,
  useGetUserKycQuery,
  useGetUserBankDetailQuery,
  useGetSuccessKycQuery,
  useGetAllkycAdminQuery,
  useGetsuccesskycAdminQuery,
  useGetrejectedkycAdminQuery,
  useUpdateKycMutation,
} = userApi;
