import {AppThunk} from "../store";
import {ForgotPasswordType, NewPasswordType, registartionAPI} from "../../api/regApi";
import {errorUtil} from "../../utils/error-util";
import {AxiosError} from "axios";

const initialState = {
    isPasswordInstalled: false,
    correctEmail : false

}

type initialStateType = typeof initialState


export const recoveryReducer = (state: initialStateType = initialState, action: ActionRecoveryPasswordType): initialStateType => {
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
export type ActionRecoveryPasswordType =
    | ReturnType<typeof setNewPassword>
    | ReturnType<typeof correctEmail>
export const setNewPassword = (value: boolean) => ({type: "recoveryPassword/SET-NEW-PASSWORD", value} as const)
export const correctEmail = (value: boolean) => ({type: "recoveryPassword/EMAIL-IS-CORRECT", value} as const)


//THUNK

export const recoveryTC = (email: string): AppThunk => async dispatch => {
    const data: ForgotPasswordType = {
        email,
        from: "test-front-admin <ai73a@yandex.by>",
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/set-new-password/$token$'>
link</a>
</div>`
    }
    debugger
    try {
        await registartionAPI.forgotPassword(data)
        dispatch(correctEmail(true))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }


}
export const setNewPasswordTC = (data: NewPasswordType): AppThunk => async dispatch => {


    try {
        await registartionAPI.setNewPassword(data)
        dispatch(setNewPassword(true))


    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}