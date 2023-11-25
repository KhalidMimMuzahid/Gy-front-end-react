import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import { getLocalStorage } from "../utils/function/localStorage";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    // mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("safe_secure_token"));
      return headers;
    },
  }),
  tagTypes: ["setting"], // automatic-data fetching
  endpoints: (builder) => ({
    // get popup image
    getPopupImage: builder.query({ // SAST API
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
    addReward: builder.mutation({ // SAST API
      query: (body) => ({
        url: "/api/v1/private/user/upload_reward_image",
        method: "POST",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    updateReward: builder.mutation({ // SAST API
      query: (body) => ({
        url: "/api/v1/private/user/update_reward_image",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    deleteReward: builder.mutation({ // SAST API
      query: (body) => ({
        url: "/api/v1/private/user/delete_reward_image",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["setting"],
    }),
    getAdminReward: builder.query({
      query: () => "/api/v1/private/user/get-all-rewards",
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
} = settingApi;
