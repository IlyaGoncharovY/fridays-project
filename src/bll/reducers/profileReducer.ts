import {AppThunk} from "../store";
import {AddedUserType, profileAPI} from "../../api/regApi";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
//constants
const CHANGE_NAME = "CHANGE-NAME"
const SET_PROFILE = "SET-PROFILE"
const initialState: ProfileStateType = {
    _id: "",
    email: "",
    rememberMe: false,
    isAdmin: false,
    name: "",
    verified: false,
    publicCardPacksCount: 0,
    created: "",
    updated: "",
    __v: 0,
}
//reducer
export const profileReducer = (state: ProfileStateType=initialState, action:ProfileActionType):ProfileStateType => {
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
export const setProfileAC = (profileData: ProfileStateType) => {
    return {
        type: SET_PROFILE,
        payload: {profileData}
    } as const
}
//TC
export const updateProfileTC = (name: string): AppThunk => async dispatch =>{
    try {
        await profileAPI.updateProfile({name, avatar: ''})
        dispatch(changeNameAC(name))
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}

//type
export type ProfileActionType = ReturnType<typeof changeNameAC> | ReturnType<typeof setProfileAC>
export type ProfileStateType = AddedUserType
