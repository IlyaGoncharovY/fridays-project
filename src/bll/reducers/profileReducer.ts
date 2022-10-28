import {AppThunk} from "../store";
import {profileAPI} from "../../api/regApi";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
//constants
const CHANGE_NAME = "CHANGE-NAME"
const SET_PROFILE = "SET-PROFILE"
const initialState: profileStateType = {
    _id: "",
    email: "",
    rememberMe: false,
    isAdmin: false,
    name: "No name",
    verified: false,
    publicCardPacksCount: 0,
    created: "",
    updated: "string",
    __v: 0,
    tokenDeathTime : 0,
    token : ''
}

export const profileReducer = (state: profileStateType=initialState, action:ProfileActionType):profileStateType => {
    switch (action.type) {
        case CHANGE_NAME: {
            return {
                ...state,
                name: action.payload.name
            }
        }
        case SET_PROFILE:{
            return action.payload.profileData
        }
        default:
            return state
    }
}

//AC
export const changeNameAC = (name: string) => {
    return {
        type: CHANGE_NAME,
        payload: {name}
    } as const
}
export const setProfileAC = (profileData: profileStateType) => {
    return {
        type: SET_PROFILE,
        payload: {profileData}
    } as const
}
//TC
export const updateProfileTC = (name: string): AppThunk => async dispatch =>{
    try {
        const res = await profileAPI.updateProfile({name, avatar: ''})
        dispatch(changeNameAC(name))
        console.log(res.data)
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}

//type
export type ProfileActionType = ReturnType<typeof changeNameAC> | ReturnType<typeof setProfileAC>
type profileStateType = {
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
    tokenDeathTime? : null  | number,
    token? : null | string
}