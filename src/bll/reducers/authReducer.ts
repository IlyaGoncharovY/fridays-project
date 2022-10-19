import {AppThunk} from "../store";
import {registartionAPI} from "../../api/regApi";
import {loginAC} from "./loginReducer";
import {errorUtil} from "../../utils/error-util";
import {AxiosError} from "axios";

const initialState = {
    isAuth: false,

}

type initialStateType = typeof initialState
type AuthReducerType = setAuthACType


export const authReducer = (state: initialStateType = initialState, action: AuthReducerType): initialStateType => {
    switch (action.type) {
        case "AUTH": {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        default:
            return state
    }
}

//AC
export type setAuthACType = ReturnType<typeof setAuthAC>
export const setAuthAC = (isAuth: boolean) => {
    return {
        type: "AUTH",
        isAuth
    } as const
}

//THUNK

export const initializingTC = (): AppThunk => async dispatch => {
    try {
        await registartionAPI.me()
        dispatch(loginAC(true))

    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    } finally {
        dispatch(setAuthAC(true))
    }


}