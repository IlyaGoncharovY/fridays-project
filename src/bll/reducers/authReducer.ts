import {AppThunk} from "../store";
import {loginAC} from "./loginReducer";
import {setProfileAC} from "./profileReducer";
import {regAPI} from "../../api/regApi";

//constants
const SET_IS_AUTH = "AUTH/SET-IS-AUTH"
const SET_STATUS = "AUTH/SET-STATUS"
const SET_ERROR = "AUTH/SET-ERROR"

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
      const res = await regAPI.me()
        dispatch(setProfileAC(res.data))
        dispatch(loginAC(true))

    }
    finally {
        dispatch(setAuthAC(true))
    }
}
//types
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