import {AppThunk} from "../store";
import {ForgotPasswordType, NewPasswordType, regAPI} from "../../api/regApi";
import {errorUtil} from "../../utils/error-util";
import {AxiosError} from "axios";

const initialState = {
    isPasswordInstalled: false,
    correctEmail : false
}

type initialStateType = typeof initialState
//reducer
export const recoveryReducer = (state: initialStateType = initialState, action: RecoveryPasswordActionType): initialStateType => {
    switch (action.type) {
        case "recoveryPassword/SET-NEW-PASSWORD": {
            return {
                ...state,
                isPasswordInstalled: action.value
            }
        }
        case "recoveryPassword/EMAIL-IS-CORRECT":
            return {
                ...state,
                correctEmail: action.value
            }
        default:
            return state
    }
}

//AC
export const setNewPassword = (value: boolean) => ({type: "recoveryPassword/SET-NEW-PASSWORD", value} as const)
export const correctEmail = (value: boolean) => ({type: "recoveryPassword/EMAIL-IS-CORRECT", value} as const)
//TC
export const recoveryTC = (email: string): AppThunk => async dispatch => {
    const data: ForgotPasswordType = {
        email,
        from: "test-front-admin <ai73a@yandex.by>",
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='https://ilyagoncharovy.github.io/fridays-project/#/set-new-password/$token$'>
link</a>
</div>`
        // ссылка для локал хоста
        //<a href='http://localhost:3000/set-new-password/$token$'>
    }
    try {
        await regAPI.forgotPassword(data)
        dispatch(correctEmail(true))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
export const setNewPasswordTC = (data: NewPasswordType): AppThunk => async dispatch => {
    try {
        await regAPI.setNewPassword(data)
        dispatch(setNewPassword(true))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
//types
export type RecoveryPasswordActionType =
    | ReturnType<typeof setNewPassword>
    | ReturnType<typeof correctEmail>