import { apiSlice } from "../../redux/ApiSlice";

export const arenaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArena: builder.query({
      query: (id) => `arenas/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Arenas", id }],
    }),
    getArenas: builder.query({
      query: (queries) => {
        const params = queries
          ? {
              pageQuery: queries.pageQuery,
              query: JSON.stringify({ ...queries.query }),
            }
          : undefined;

        return {
          url: `arenas`,
          params,
          providesTags: (result, _error, _query) =>
            result?.arenas?.arenas
              ? [
                  ...result.arenas.arenas.map(({ id }) => ({
                    type: "Arenas",
                    id,
                  })),
                  { type: "Arenas", id: "LIST" },
                ]
              : [{ type: "Arenas", id: "LIST" }],
        };
      },
    }),
  }),
});

export const { useGetArenaQuery, useGetArenasQuery } = arenaApi;
