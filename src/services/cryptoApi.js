import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
       'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
       'x-rapidapi-key': '69d8c52dc2mshb853f1ed473c996p127631jsna7e99a69f524'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers : cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl:baseUrl}),
    endpoints:(builder)=> ({
        getCryptos: builder.query({
            query: (count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
          }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
          }),
    }),
});


export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetExchangesQuery
} = cryptoApi;