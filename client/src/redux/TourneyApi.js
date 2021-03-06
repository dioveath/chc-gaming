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

export const tourneyApi = createApi({
  reducerPath: "tourneyApi",
  baseQuery: baseQuery,
  tagTypes: ['Tourneys'],
  endpoints: (builder) => ({
    getTourney: builder.query({
      query: (id) => `tourneys/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Tourneys", id }],
      transformResponse: (response, _meta, _arg) => response.status === 'success' ? response.tourney : response.errorList
    }),
    getTourneys: builder.query({
      query: ({ pageQuery = {}, ...query } = {}) => ({
        url: `tourneys`,
        params: { pageQuery: pageQuery, ...query }
      }),
      providesTags: (result, _error, _query) =>
      result?.tourneys
          ? [
            ...result.tourneys.map(({ id }) => ({ type: "Tourneys", id })),
              { type: "Tourneys", id: "LIST" },
            ]
      : [{ type: "Tourneys", id: "LIST" }],
    }),

    addTourney: builder.mutation({
      query: (data) => {
        return {
          url: `tourneys`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: (_result, _error, _args) => [{ type: 'Tourneys', id: "LIST"}]
    }),

    updateTourney: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `tourneys/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{type: 'Tourneys', id }]
    }),

    
    registerTourney: builder.mutation({
      query: ({ tourneyId }) => ({
        url: `tourneys/${tourneyId}/register`,
        method: 'POST'
      }),
      invalidatesTags: (_result, _error, { tourneyId }) => [{type: "Tourneys", id: tourneyId}]
    }),

    // FIXME: this need to be changed to deregisterUserToTourney. This query is for only managers
    deregisterTourney: builder.mutation({
      query: ({tourneyId, userId}) => ({
        url: `tourneys/${tourneyId}/register/${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, { tourneyId }) => [{ type: "Tourneys", id: tourneyId }]
    }),

    registerVerifyTourney: builder.mutation({
      query: ({ tourneyId, payload }) => ({
        url: `tourneys/${tourneyId}/register-verify`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, _error, { tourneyId }) => [{type: "Tourneys", id: tourneyId}]      
    }),

    deleteTourney: builder.mutation({
      query: (id) => {
        return {
          url: `tourneys/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (_result, _error, id) => [{type: 'Tourneys', id }]
    }),
  }),
});

export const {
  useGetTourneyQuery,
  useGetTourneysQuery,
  useAddTourneyMutation,
  useRegisterTourneyMutation,
  useDeregisterTourneyMutation,
  useRegisterVerifyTourneyMutation,
  useUpdateTourneyMutation,
  useDeleteTourneyMutation,
} = tourneyApi;
