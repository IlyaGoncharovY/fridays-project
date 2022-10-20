import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const registartionAPI = {
    registration(userData: userDataType) {
        return instance.post<responseRegType>('auth/register', userData)
    },
    login(data: LoginDataType) {
        return instance.post<ResponseRegTypeAddedUser>('auth/login', data)
    },
    me() {
        return instance.post('auth/me', {})
    },
    logout() {
        return instance.delete('auth/me')
    },
    forgotPassword(data: ForgotPasswordType) {
        return instance.post('auth/forgot', {...data})
    },
    setNewPassword(data: NewPasswordType) {
        return instance.post('auth/set-new-password', {...data})
    }
}
export const profileAPI = {
    updateProfile(data: ProfileDataType) {
        return instance.put<UpdateUserResponseType>('auth/me', data)
    },
    setProfile() {
        return instance.post('auth/me')
    }
}

export type userDataType = {
    email: string;
    password: string;
}

export type responseRegType = {
    addedUser: ResponseRegTypeAddedUser;
    success: boolean;
}

export type LoginDataType = {
    email: string;
    password: string;
    rememberMe?: boolean
}

export type ResponseRegTypeAddedUser = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
}

export type ForgotPasswordType = {
    email: string
    from: string
    message: string
}

export type NewPasswordType = {
    password : string
    resetPasswordToken : string | undefined
}

export type ProfileDataType = {
    name: string
    avatar: string
}

type UpdateUserResponseType = {
    updatedUser: {
        _id: string;
        email: string;
        rememberMe: boolean;
        isAdmin: boolean;
        name: string;
        verified: boolean;
        publicCardPacksCount: number;
        created: string;
        updated: string;
        __v: number;
        token: string;
        tokenDeathTime: number;
        avatar: string;
    };
    token: string;
    tokenDeathTime: number;
};
