import {AppThunk} from "../store";
import {AddedUserType, profileAPI, ProfileDataType} from "../../api/regApi";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
import {setStatusAC} from "./appReducer";
//constants
const SET_PROFILE = "profile/SET-PROFILE"
const initialState: ProfileStateType = {
    _id: "",
    email: "",
    avatar: "",
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
export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionType): ProfileStateType => {
    switch (action.type) {
        case SET_PROFILE: {
            return action.payload.profileData
        }
        default:
            return state
    }
}

//AC
export const setProfileAC = (profileData: ProfileStateType) => {
    return {
        type: SET_PROFILE,
        payload: {profileData}
    } as const
}
//TC
export const updateProfileTC = (model: ModelUpdateProfileType): AppThunk => async (dispatch, getState) => {
    dispatch(setStatusAC("loading"))
    const profileDate = getState().profile
    console.log(model)
    const apiModel: ProfileDataType = {
        name: profileDate.name,
        avatar: profileDate.avatar,
        ...model
    }
    try {
        const res = await profileAPI.updateProfile(apiModel)
        dispatch(setProfileAC(res.data.updatedUser))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}

//type
export type ProfileActionType =
    | ReturnType<typeof setProfileAC>
export type ProfileStateType = AddedUserType & {
    avatar: string
}
type ModelUpdateProfileType = {
    name?: string
    avatar?: string
}

