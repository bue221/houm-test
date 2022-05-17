import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAllCharacters, ICharacter } from "types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<
      IAllCharacters,
      { page: number; status: string; gender: string; name: string }
    >({
      query: ({ page = 1, status = "", gender = "", name = "" }) =>
        `character?page=${page}${status !== "" ? `&status=${status}` : ""}${
          gender !== "" ? `&gender=${gender}` : ""
        }${name !== "" ? `&name=${name}` : ""}`,
    }),
    getOneCharacter: builder.query<ICharacter, number>({
      query: (id) => ({
        url: `character/${id}`,
      }),
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetOneCharacterQuery } = api;
