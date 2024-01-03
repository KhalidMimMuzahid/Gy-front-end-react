import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import { getLocalStorage } from "../utils/function/localStorage";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    // mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("grow_more_today_token"));
      return headers;
    },
  }),
  tagTypes: ["setting"], // automatic-data fetching
  endpoints: (builder) => ({
    // get popup image
    getPopupImage: builder.query({
      // SAST API
      query: () => "/api/get_popup_img",
      providesTags: ["setting"], // automatic-data fetching
    }),
    // admin
    addPopupImage: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/change_popup_img",
        method: "POST",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    addYoutubeVideo: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/change_video_link",
        method: "POST",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    addPdfLink: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/change_pdf_link",
        method: "POST",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    winingSharePercentage: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/winning-share-percentage",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    addReward: builder.mutation({
      // SAST API
      query: (body) => ({
        url: "/api/v1/private/user/upload_reward_image",
        method: "POST",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    updateReward: builder.mutation({
      // SAST API
      query: (body) => ({
        url: "/api/v1/private/user/update_reward_image",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    deleteReward: builder.mutation({
      // SAST API
      query: (body) => ({
        url: "/api/v1/private/user/delete_reward_image",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    updateWinningPercentage: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/winning-share-percentage",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    updateGamePercentage: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/game-wallet-percentage",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    updateRoiPercentage: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/roi_percentage",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    getRoiPercentage: builder.query({
      query: () => "/api/v1/private/roi_percentage",
      invalidatesTags: ["setting"],
    }),
    getWinningPercentage: builder.query({
      query: () => "/api/v1/private/winning-share-percentage",
      invalidatesTags: ["setting"],
    }),
    getGamePercentage: builder.query({
      query: () => "/api/v1/private/game-wallet-percentage",
      invalidatesTags: ["setting"],
    }),
    getAdminReward: builder.query({
      query: () => "/api/v1/private/user/get-all-rewards",
      providesTags: ["setting"], // automatic-data fetching
    }),
    getWiningShareProfit: builder.query({
      query: () => "/api/v1/private/winning-share-percentage",
      providesTags: ["setting"], // automatic-data fetching
    }),
    getYoutube: builder.query({
      query: () => "/api/v1/public/get_video_link",
      providesTags: ["setting"], // automatic-data fetching
    }),
    getPdfLink: builder.query({
      query: () => "/api/v1/public/get_pdf_link",
      providesTags: ["setting"], // automatic-data fetching
    }),
    getWebsiteAnalytics: builder.query({
      query: () => "/api/v1/public/website_analytics",
      providesTags: ["setting"], // automatic-data fetching
    }),
    updateMinDepositeAmount: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/manage_deposite_amount",
        method: "POST",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    updateMinWithdrawAmount: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/manage_withdarw_amount",
        method: "POST",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    updateMinWithdrawPercentageAmount: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/manage_withdarw_percentage_amount",
        method: "POST",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    getManageData: builder.query({
      query: () => "/api/v1/private/get_manage_amount",
      providesTags: ["setting"], // automatic-data fetching
    }),
  }),
});

export const {
  useGetPopupImageQuery,
  useAddPopupImageMutation,
  useAddYoutubeVideoMutation,
  useGetYoutubeQuery,
  useAddPdfLinkMutation,
  useGetPdfLinkQuery,
  useGetWebsiteAnalyticsQuery,
  useAddRewardMutation, // SAST API
  useUpdateRewardMutation, // SAST API
  useDeleteRewardMutation, // SAST API
  useGetAdminRewardQuery, // SAST API
  useWiningSharePercentageMutation,
  useGetWiningShareProfitQuery,
  useUpdateWinningPercentageMutation,
  useGetWinningPercentageQuery,
  useUpdateRoiPercentageMutation,
  useGetRoiPercentageQuery,
  useUpdateMinDepositeAmountMutation,
  useUpdateMinWithdrawAmountMutation,
  useUpdateMinWithdrawPercentageAmountMutation,
  useUpdateGamePercentageMutation,
  useGetManageDataQuery,
  useGetGamePercentageQuery,
} = settingApi;
