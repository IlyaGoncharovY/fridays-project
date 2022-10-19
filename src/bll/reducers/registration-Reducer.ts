import {AxiosError} from "axios";
import {registartionAPI, userDataType} from "../../api/regApi"
import {errorUtil} from "../../utils/error-util";
import {AppThunk} from "../store";

const initialState = {
    registered: false
}

type initialStateType = typeof initialState
type profileReducerActionType = changeStatusRegistrationACType

export const registrationReducer = (state: initialStateType = initialState, action: profileReducerActionType): initialStateType => {
    switch (action.type) {
        case "REGIS/CHANGE_STATUS": {
            return {
                ...state,
                registered: action.value
            }
        }
        default:
            return state
    }
}

//AC
export type changeStatusRegistrationACType = ReturnType<typeof changeStatusRegistrationAC>
export const changeStatusRegistrationAC = (value: boolean) => {
    return {
        type: "REGIS/CHANGE_STATUS",
        value
    } as const
}

//TC
export const regTC = (data: userDataType): AppThunk => async dispatch => {
    try {
        await registartionAPI.registration(data)
        dispatch(changeStatusRegistrationAC(true))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}