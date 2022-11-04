import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
import {AppThunk} from "../store";
import {regAPI, RegDataType} from "../../api/regApi";

const initialState = {
    registered: false
}

type initialStateType = typeof initialState
//reducer
export const regReducer = (state: initialStateType = initialState, action: RegistrationActionType): initialStateType => {
    switch (action.type) {
        case "REG/CHANGE_STATUS": {
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
        type: "REG/CHANGE_STATUS",
        value
    } as const
}

//TC
export const regTC = (data: RegDataType): AppThunk => async dispatch => {
    try {
        await regAPI.registration(data)
        dispatch(changeStatusRegistrationAC(true))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
//type
export type RegistrationActionType = ReturnType<typeof changeStatusRegistrationAC>