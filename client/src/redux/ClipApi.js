import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config/config';


const baseQuery = fetchBaseQuery({
  baseUrl: `${config.serverUrl}/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if(token){
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});


export const clipApi = createApi({
  reducerPath: 'clipApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getClipById: builder.query({query: (id) => `clips/${id}` }),
    getClips: builder.query({query: () => `clips`})
  })
});


export const {
  useGetClipByIdQuery,
  useGetClipsQuery
} = clipApi;
