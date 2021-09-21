import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '69d8c52dc2mshb853f1ed473c996p127631jsna7e99a69f524'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({url, headers : cryptoNewsHeaders})

export const cryptoNewsApi = createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl:baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
          query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
      })
});

export const {useGetCryptoNewsQuery } = cryptoNewsApi;
