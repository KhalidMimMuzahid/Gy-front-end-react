import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import { getLocalStorage } from "../utils/function/localStorage";

export const depositeApi = createApi({
  reducerPath: "depositeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    // mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("grow_more_today_token"));
      return headers;
    },
  }),
  tagTypes: ["adminDeposite", "userDeposit"], // automatic-data fetching
  endpoints: (builder) => ({
    // admin
    allDepositeHistory: builder.query({
      query: () => "/api/v1/private/get_all_deposits",
      providesTags: ["adminDeposite"], // automatic-data fetching
    }),
    editDepositStatus: builder.mutation({
      query: (body) => ({
        url: "/api/v1/private/update_deposit_status",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminDeposite"],
    }),
    completedDepositeHistory: builder.query({
      query: () => "/api/v1/private/get_success_deposits",
      providesTags: ["adminDeposite"], // automatic-data fetching
    }),
    canceledDepositeHistory: builder.query({
      query: () => "/api/v1/private/get_rejected_deposits",
      providesTags: ["adminDeposite"], // automatic-data fetching
    }),

    // // user
    // addDepositFund: builder.mutation({
    //   query: (body) => ({
    //     url: "/api/v1/secure/deposite",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["userDeposit"], // automatic-data fetching
    // }),
    // getDepositHistory: builder.query({
    //   query: () => "/api/v1/secure/deposite_history",
    //   providesTags: ["userDeposit"], // automatic-data fetching
    // }),
  }),
});

export const {
  useAllDepositeHistoryQuery,
  useCompletedDepositeHistoryQuery,
  useCanceledDepositeHistoryQuery,
  // useAddDepositFundMutation,
  // useGetDepositHistoryQuery,
  useEditDepositStatusMutation,
} = depositeApi;
