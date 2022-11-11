import { instance } from "./instance"

export const regAPI = {
    registration(userData: RegDataType) {
        return instance.post<ResponseRegType>('auth/register', userData)
    },
    login(data: LoginDataType) {
        return instance.post<ResponseLoginType>('auth/login', data)
    },
    me() {
        return instance.post<ResponseLoginType>('auth/me',{})
    },
    logout() {
        return instance.delete<ResponseLogoutType>('auth/me',{})
    },
    forgotPassword(data: ForgotPasswordType) {
        return instance.post<ResponseForgotPasswordType>('auth/forgot', data)
    },
    setNewPassword(data: NewPasswordType) {
        return instance.post<ResponseNewPasswordType>('auth/set-new-password', data)
    }
}
export const profileAPI = {
    updateProfile(data: ProfileDataType) {
        return instance.put<ResponseUpdateUserType>('auth/me', data)
    }
}
//Types - payload
export type RegDataType = {
    email: string
    password: string
}
export type LoginDataType = RegDataType & {
    rememberMe?: boolean
}
export type ProfileDataType = {
    name: string
    avatar: string
}
export type ForgotPasswordType = {
    email: string
    from: string
    message: string
}
export type NewPasswordType = {
    password: string
    resetPasswordToken: string | undefined
}
//Types - response
export type ResponseRegType = {
    addedUser: AddedUserType
}
export type ResponseLoginType = AddedUserType & {
    token: string
    tokenDeathTime: number
}
export type ResponseLogoutType = {
    info: string
}
export type ResponseForgotPasswordType = {
    info: string,
    success: boolean
    answer: boolean
    html: boolean
}
export type ResponseNewPasswordType = {
    error: string
    method: string
    url: string
    query: Object
    body: {
        password: string
        resetPasswordToken: string
    }
}
type ResponseUpdateUserType = {
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
//Types - common
export type AddedUserType = {
    _id: string;
    email: string;
    avatar: string
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
}