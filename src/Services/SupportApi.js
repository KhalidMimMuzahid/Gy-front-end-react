import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import { getLocalStorage } from "../utils/function/localStorage";

export const supportApi = createApi({
  reducerPath: "supportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    // mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("safe_secure_token"));
      return headers;
    },
  }),
  tagTypes: ["adminSupport", "userSupport"], // automatic-data fetching
  endpoints: (builder) => ({
    // admin
    getAllContactUs: builder.query({
      query: () => "/api/v1/private/get_all_contactus",
      providesTags:  ["adminSupport", "userSupport"], // automatic-data fetching
    }),
    addNewUpdate: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/new_update",
        method: "POST",
        body,
      }),
      invalidatesTags:  ["adminSupport", "userSupport"],
    }),
    getAllSupportMessage: builder.query({
      query: () => "/api/v1/private/get_all_support",
      providesTags:  ["adminSupport", "userSupport"], // automatic-data fetching
    }),

    // user
    getUpdates: builder.query({
      query: () => `/api/v1/secure/get_updates`,
      providesTags: ["userSupport"], // automatic-data fetching
    }),
    contactUsHistory: builder.query({
      query: () => `/secure/api/get_contactus_history`,
      providesTags: ["userSupport"], // automatic-data fetching
    }),
    ticketHistory: builder.query({
      query: () => `/api/v1/secure/get_support_history`,
      providesTags: ["userSupport"], // automatic-data fetching
    }),
    addContactMessage: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/contactus_message",
        method: "POST",
        body,
      }),
      invalidatesTags: ["userSupport"], // automatic-data fetching
    }),
    addSupportTicket: builder.mutation({
      query: (body) => ({
        url: "/api/v1/secure/create_support",
        method: "POST",
        body,
      }),
      invalidatesTags: ["userSupport"], // automatic-data fetching
    }),
  }),
});

export const {
    useGetAllContactUsQuery,
    useAddNewUpdateMutation,
    useGetAllSupportMessageQuery,
    useGetUpdatesQuery,
    useContactUsHistoryQuery,
    useTicketHistoryQuery,
    useAddContactMessageMutation,
    useAddSupportTicketMutation,
} = supportApi;
