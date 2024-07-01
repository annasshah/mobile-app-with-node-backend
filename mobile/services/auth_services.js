import { apiHandle } from "../config/apiHandle/apiHandle"

export const signup_service = (post_data) => {

   return apiHandle.post('/signup', post_data)
}


export const login_service = (post_data) => {

   return apiHandle.post('/login', post_data)
}




export const check_auth_service = () => {

   return apiHandle.get('/check-auth')
}