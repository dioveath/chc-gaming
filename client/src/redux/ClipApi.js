import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config/config";
import qs from 'qs';

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.serverUrl}/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  paramsSerializer: (params) => {
    const paramString = qs.stringify(params);
    return paramString;
  },
});

export const clipApi = createApi({
  reducerPath: "clipApi",
  baseQuery: baseQuery,
  tagTypes: ['Clips'],
  endpoints: (builder) => ({
    getClip: builder.query({
      query: (id) => `clips/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Clips", id }],
    }),
    getClips: builder.query({
      query: ({ pageQuery = {}, ...query }) => ({
        url: `clips`,
        params: { pageQuery: pageQuery, ...query }
      }),
      providesTags: (result, _error, _query) =>
      result?.clips?.clips
          ? [
            ...result.clips.clips.map(({ id }) => ({ type: "Clips", id })),
              { type: "Clips", id: "LIST" },
            ]
      : [{ type: "Clips", id: "LIST" }],
    }),
    addClip: builder.mutation({
      query: (data) => {
        const { formData } = data;
        return {
          url: `clips/encode`,
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: (_result, _error, _args) => [{ type: 'Clips', id: "LIST"}]
    }),
    updateClip: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `clips/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{type: 'Clips', id }]
    }),
    deleteClip: builder.mutation({
      query: (id) => {
        return {
          url: `clips/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (_result, _error, id) => [{type: 'Clips', id }]
    }),
  }),
});

export const {
  useGetClipQuery,
  useGetClipsQuery,
  useAddClipMutation,
  useUpdateClipMutation,
  useDeleteClipMutation,
} = clipApi;
