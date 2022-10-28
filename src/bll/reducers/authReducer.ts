import {AppThunk} from "../store";
import {registartionAPI} from "../../api/regApi";
import {loginAC} from "./loginReducer";
import {errorUtil} from "../../utils/error-util";
import {AxiosError} from "axios";
import {setProfileAC} from "./profileReducer";

//constants
const SET_IS_AUTH = "AUTH/SET-IS-AUTH"
const SET_STATUS = "SET-STATUS"
const SET_ERROR = "SET-ERROR"

const initialState: AuthStateType = {
    isAuth: false,
    status: 'idle',
    error: null
}
//reducer
export const authReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {...state, isAuth: action.payload.isAuth}
        case SET_STATUS:
            return {...state, status: action.payload.status}
        case SET_ERROR:
            return {...state, error: action.payload.error}
        default:
            return state
    }
}
//AC
export const setAuthAC = (isAuth: boolean) => {
    return {
        type: SET_IS_AUTH,
        payload: {isAuth}
    } as const
}
export const setStatusAC = (status: RequestStatusType) => {
    return {
        type: SET_STATUS,
        payload: {status}
    } as const
}
export const setErrorAC = (error: null | string) => {
    return{
        type: SET_ERROR,
        payload: {error}
    } as const
}
//TC
export const initializingTC = (): AppThunk => async dispatch => {
    try {
      const res = await registartionAPI.me()
        dispatch(setProfileAC(res.data))
        dispatch(loginAC(true))

    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    } finally {
        dispatch(setAuthAC(true))
    }
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AuthStateType = {
    isAuth: boolean
    status: RequestStatusType
    error: null | string
}
export type AuthActionType =
    | ReturnType<typeof setAuthAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>