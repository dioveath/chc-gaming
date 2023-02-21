import { apiSlice } from '../../redux/ApiSlice';

export const arenaApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    arenaRegister: builder.mutation({
      query: details => ({
        url: '/api/v1/arenas/register',
        method: 'POST',
        body: { ...details }
      })
    })
  })
});

export const { useArenaRegisterMutation } = arenaApiSlice;
