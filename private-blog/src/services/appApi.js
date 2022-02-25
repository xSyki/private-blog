import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().user.token;
            if(token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user
            })
        }),

        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users/',
                method: 'POST',
                body: user
            })
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'DELETE',
            }),
        }),
    }),
});

export default appApi;

export const { useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation } = appApi;