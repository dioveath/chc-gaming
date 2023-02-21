import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config/config";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.serverUrl}/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Users", id }],
      transformResponse: (response, _meta, _arg) => {
        return response.status === 'success' ? response.user : response.errorList;
      }
    }),
    getUsers: builder.query({
      query: ({ pageQuery, ...query } = {}) => ({
        url: `users`,
        params: { pageQuery: JSON.stringify(pageQuery && {}), ...query }
      }),
      providesTags: (result, _error, _query) =>
      result?.users?.users
          ? [
            ...result.users.users.map(({ id }) => ({ type: "Users", id })),
            { type: "Users", id: "LIST" },
          ]
      : [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `users/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{type: 'Users', id }]
    }),

    updateUserProfile: builder.mutation({
      query: (data) => {
        const { formData } = data;
        return {
          url: `users/profile`,
          method: "POST",
          body: formData
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{type: 'Users', id }]
    }),

    requestPhoneVerify: builder.mutation({
      query: () => {
        return {
          url: `users/verify/request-verify`,
          method: 'POST'
        };
      }
    }),

    verifyPhoneVerify: builder.mutation({
      query: (verifyCode) => {
        return {
          url: `users/verify/verify`,
          method: 'POST',
          body: {
            verify_code: verifyCode
          }
        };
      },
      invalidatesTags: ({ user_id }, _error, _arg) => [{type: 'Users', id: user_id}]
    }),    
    
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (_result, _error, id) => [{type: 'Users', id }]
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useRequestVerifyMutation,
  useRequestPhoneVerifyMutation,
  useVerifyPhoneVerifyMutation,
  useDeleteUserMutation,
} = userApi;
