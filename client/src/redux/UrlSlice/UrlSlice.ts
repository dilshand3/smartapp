import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api = import.meta.env.VITE_APIURL;

export interface CreateUrlRequest {
  originalUrl: string;
}

export interface CreateUrlResponse {
  success: boolean;
  message: string;
  data?: {
    shortUrl: string;
    active: boolean,
    originalUrl: string
  };
}

export interface deleteUrlRequest {
  urlId: string
}

export interface deleteUrlResponse {
  success: boolean;
  message: string;
}

export const UrlSlice = createApi({
  reducerPath: "UrlSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    credentials: "include"
  }),
  endpoints: (builder) => ({
    createUrl: builder.mutation<CreateUrlResponse, CreateUrlRequest>({
      query: (originalUrl) => ({
        url: "/api/createURL",
        method: "POST",
        body: originalUrl
      }),
    }),
    deleteUrl: builder.mutation<deleteUrlRequest, deleteUrlRequest>({
      query: (urlId) => ({
        url: "/api/deleteUrl",
        method: "DELETE",
        body: urlId
      })
    }),
    toggleUrl: builder.query<any, string>({
      query: (id) => ({
        url: `/api/toggleUrl/${id}`,
        method: "GET"
      })
    })
  }),
});

export const { useCreateUrlMutation, useDeleteUrlMutation, useLazyToggleUrlQuery } = UrlSlice;
