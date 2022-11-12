import {AppThunk} from "../store";
import {loginAC} from "./authReducer";
import {setProfileAC} from "./profileReducer";
import {regAPI} from "../../api/regApi";

//constants
const SET_IS_AUTH = "APP/SET-IS-AUTH"
const SET_STATUS = "APP/SET-STATUS"
const SET_ERROR = "APP/SET-ERROR"
const SET_SEARCH_MODE = "APP/SET-SEARCH-MODE"

const initialState: AppStateType = {
    isAuth: false,
    status: 'idle',
    error: null,
    isSearchMode: false
}
//reducer
export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {...state, isAuth: action.payload.isAuth}
        case SET_STATUS:
            return {...state, status: action.payload.status}
        case SET_ERROR:
            return {...state, error: action.payload.error}
        case SET_SEARCH_MODE:
            return {...state, isSearchMode: action.payload.isSearchMode}
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
    return {
        type: SET_ERROR,
        payload: {error}
    } as const
}
export const setSearchMode = (isSearchMode: boolean) => ({
    type: SET_SEARCH_MODE,
    payload: {isSearchMode}
} as const)
//TC
export const initializingTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await regAPI.me()
        dispatch(setProfileAC(res.data))
        dispatch(loginAC(true))
        dispatch(setStatusAC("succeeded"))
    } finally {
        dispatch(setAuthAC(true))
    }
}
//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = {
    isAuth: boolean
    status: RequestStatusType
    error: null | string
    isSearchMode: boolean
}
export type AppActionType =
    | ReturnType<typeof setAuthAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setSearchMode>