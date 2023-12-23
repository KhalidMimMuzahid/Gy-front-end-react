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
  tagTypes: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
  endpoints: (builder) => ({
    getLoginUser: builder.query({
      query: () => "/api/v1/common/get_user",
      providesTags: ["User", "adminUser"], // automatic-data fetching
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
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    allUserList: builder.query({
      query: () => "/api/v1/private/user/get_all_users",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    editUserList: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/edit_users",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"],
    }),
    deleteUserList: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/delete_user",
        method: "PUT",
        body: { userId: body.userId },
      }),
      invalidatesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"],
    }),
    editUserStatus: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/change_user_status",
        method: "PUT",
        body: { user_id: body.userId },
      }),
      invalidatesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"],
    }),
    editAdminEmail: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/update_email",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"],
    }),
    editAdminPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/change_password",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"],
    }),
    activeUserList: builder.query({
      query: () => "/api/v1/private/user/get_active_users",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    blockUserList: builder.query({
      query: () => "/api/v1/private/user/get_blocked_users",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    addAutoPoolController: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/change_autopool_status",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"],
    }),
    getAutopoolStatus: builder.query({
      query: () => "/api/v1/private/get_autopool_setting",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    getMemberBusinessHistory: builder.query({
      query: ({ level, userId }) =>
        `/api/v1/private/user/get_team_stats_details?level=${level}&userId=${userId}`,
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    addTeamStatistics: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/get_team_stats",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"],
    }),
    // auto trade
    getAutoTradeUsers: builder.query({
      query: () => "/api/v1/private/auto_trade_users",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    getAutoTradeAllUpgradeHistory: builder.query({
      query: () => "/api/v1/private/auto_trade_upgrade_history",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    getAutoTradeAllRoiIncomeHistory: builder.query({
      query: () => "/api/v1/private/auto_trade_roi_income_history",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    ///////////////////////// NEW ENDPOINT ////////////////////
    getAllUserStatistics: builder.query({
      query: () => "/api/v1/private/get_admin_dashboard_data",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),

    addBank: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/user/add-bank",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getSuccessKyc: builder.query({
      query: () => "/api/v1/secure/user/get-kyc-success-status",
      providesTags: ["User"],
    }),

    //for upload kyc
    addKyc: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/user/create-kyc",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),
    // for update kyc status
    updateKyc: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/user/update_kyc",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"],
    }),
    getUserKyc: builder.query({
      query: () => "/api/v1/secure/user/get-kyc",
      providesTags: ["User"], // automatic-data fetching
    }),
    getUserBankDetail: builder.query({
      query: () => "/api/v1/secure/user/get-bank",
      providesTags: ["bank", "User"], // automatic-data fetching
    }),
    getSuccessKyc: builder.query({
      query: () => "/api/v1/secure/user/get-kyc-success-status",
      providesTags: ["User"],
    }),

    //KYC for admin
    getAllkycAdmin: builder.query({
      query: () => "/api/v1/private/user/get_all_kyc",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    getsuccesskycAdmin: builder.query({
      query: () => "/api/v1/private/user/get-all-success-kyc",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),
    getrejectedkycAdmin: builder.query({
      query: () => "/api/v1/private/user/get-all-reject-kyc",
      providesTags: ["User", "adminUser", "Validate", "autoTrade", "bank"], // automatic-data fetching
    }),

    addGoogleLogin: builder.mutation({
      // user register
      query: (body) => ({
        url: "/api/v1/public/google_login",
        method: "POST",
        body: body,
      }),
      invalidatesTags:["User"]
    }),
    checkLogin: builder.mutation({
      // user register
      query: (body) => ({
        url: "/api/v1/public/check_login",
        method: "POST",
        body: body,
      }),
    }),
    bettingData: builder.mutation({
      // for betting...
      query: (body) => ({
        url: "/api/v1/secure/create-predicted",
        method: "POST",
        body: body,
      }),
    }),
    checkUserEmail: builder.query({
      query: (userEmail) => `/api/v1/public/get_check_email/${userEmail}`,
      providesTags: ["Validate"], // automatic-data fetching
    }),
    checkUserOTP: builder.query({
      query: (otpCode) => `/api/v1/public/get_check_otp/${otpCode}`,
      providesTags: ["Validate"], // automatic-data fetching
    }),

    getperiodID: builder.query({
      query: () => "/api/v1/public/get_period_id",
      providesTags: ["User"], // automatic-data fetching
    }),
    getInitialTime: builder.query({
      query: () => "/api/v1/public/get_initial_time",
      providesTags: ["User"], // automatic-data fetching
    }),

    getAllPeriodRecord: builder.query({
      query: () => "/api/v1/public/get_all_period_record",
      providesTags: ["User"], // automatic-data fetching
    }),
    getPredicted: builder.query({
      query: () => "/api/v1/secure/get-predicted",
      providesTags: ["User"], // automatic-data fetching
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
  useAddGoogleLoginMutation,
  useCheckLoginMutation,
  useCheckUserEmailQuery,
  useCheckUserOTPQuery,
  useGetperiodIDQuery,
  useGetInitialTimeQuery,
  useBettingDataMutation,
  useGetAllPeriodRecordQuery,
  useGetPredictedQuery,
} = userApi;
