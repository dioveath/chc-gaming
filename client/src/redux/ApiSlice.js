import config from '../config/config';
import { setCredentials, logout } from './AuthSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.serverUrl}`,
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if(token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }
});

// NOTE: We don't have refresh token implmented on the server yet
// eslint-disable-next-line no-unused-vars
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if(result?.error?.originalStatus === 403) {
    console.log('sending refresh token..');
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if(refreshResult?.data){
      api.dispatch(setCredentials({ accessToken: result.data.accessToken, userId: result.data.userId }));
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: _builder => ({})
});
