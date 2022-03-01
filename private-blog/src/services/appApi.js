import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://syki-private-blog.herokuapp.com',
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

        createPost: builder.mutation({
            query: (article) => ({
                url: '/posts',
                method: "POST",
                body: article
            })
        }),

        getAllPosts: builder.mutation({
            query: () => ({
                url: '/posts',
            })
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: '/posts',
                method: 'DELETE',
                body: id
            })
        }),

        editPost: builder.mutation({
            query: (article) => ({
                url: '/posts/edit',
                method: "POST",
                body: article
            })
        }),
    }),
});

export default appApi;

export const { useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation, useCreatePostMutation, useGetAllPostsMutation, useDeletePostMutation, useEditPostMutation } = appApi;