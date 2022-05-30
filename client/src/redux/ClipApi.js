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

export const clipApi = createApi({
  reducerPath: "clipApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getClipById: builder.query({
      query: (id) => `clips/${id}`
    }),
    getClips: builder.query({
      query: ({ page = 1, sort = "createdAt", limit = 2 }) =>
        `clips?pageQuery=%7B%20%22limit%22%3A%20${limit},%20%22page%22%3A%20${page},%20%22sort%22%3A%20%22${sort}%22%7D`,
    }),
    updateClip: builder.mutation({ query: (data) => {
      const { id, ...body } = data;
      return {
        url: `clips/${id}`,
        method: 'POST',
        body,
      };
    }}),
    deleteClip: builder.mutation({ query: (id) => {
      return {
        url: `clips/${id}`,
        method: 'DELETE'
      };
    }})
  }),
});

export const { useGetClipByIdQuery, useGetClipsQuery, useUpdateClipMutation, useDeleteClipMutation } = clipApi;
