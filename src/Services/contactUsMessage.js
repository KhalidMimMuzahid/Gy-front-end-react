import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";

export const contactUsMessage = createApi({
  reducerPath: "contactUsMessageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
  }),
  tagTypes: ["send_message"], // automatic-data fetching
  endpoints: (builder) => ({
    contactMessage: builder.mutation({
      query: (body) => ({
        url: "/public/send_message",
        method: "POST",
        body,
      }),
      invalidatesTags: ["send_message"],
    }),
    
  }),
});

export const {
  useContactMessageMutation,
} = contactUsMessage;
