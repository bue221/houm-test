import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query({
      query: ({ page = 1, status = "", gender = "", name = "" }) =>
        `character?page=${page}${status !== "" ? `&status=${status}` : ""}${
          gender !== "" ? `&gender=${gender}` : ""
        }${name !== "" ? `&name=${name}` : ""}`,
    }),
    getOneCharacter: builder.query({
      query: (id) => ({
        url: `character/${id}`,
      }),
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetOneCharacterQuery } = api;
