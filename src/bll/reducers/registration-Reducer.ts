import {AxiosError} from "axios";
import {registartionAPI, userDataType} from "../../api/regApi"
import {errorUtil} from "../../utils/error-util";
import {AppThunk} from "../store";

const initialState = {
    registered: false
}

type initialStateType = typeof initialState

export const registrationReducer = (state: initialStateType = initialState, action: RegistrationActionType): initialStateType => {
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
//type
export type RegistrationActionType = ReturnType<typeof changeStatusRegistrationAC>