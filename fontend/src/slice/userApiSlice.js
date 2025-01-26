import { apiSlice } from "./apiSlice.js";
const USER_URL = '/api';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${
                    USER_URL
                }`,
                method:'POST',
                body:data
            })
        }),
            logout:builder.mutation({
                query:(data)=>({
                    url:`${
                        USER_URL
                    }/logout`,
                    method:'POST',
                    body:data
                })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${
                    USER_URL
                }/auth`,
                method:'POST',
                body:data
            })
    }),
    updateUser: builder.mutation({
        query: (data) => ({
          url: `${USER_URL}/profile`,
          method: 'PUT',
          body: data,
        }),
      }),
})});
export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateUserMutation} = usersApiSlice;