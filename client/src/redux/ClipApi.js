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
  paramsSerializer: (params) => {
    const paramString =  Object.entries(params).map(([key, value]) => {
      if(typeof value !== 'object')
        return `${key}=${value}`;
      return Object.entries(value).map(([k, v]) => `${key}[${k}]=${JSON.stringify(v)}`).join('&');
    }).join('&');

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
      query: ({ pageQuery, ...query }) => ({
        url: `clips`,
        params: { pageQuery: JSON.stringify(pageQuery), ...query }
      }),
      providesTags: (result, _error, _query) =>
      result?.clips?.clips
          ? [
            ...result.clips.clips.map(({ id }) => ({ type: "Clips", id })),
              { type: "Clips", id: "LIST" },
            ]
      : [{ type: "Clips", id: "LIST" }],
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
  useUpdateClipMutation,
  useDeleteClipMutation,
} = clipApi;
