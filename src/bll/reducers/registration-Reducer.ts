import {registartionAPI, userDataType} from "../../api/regApi"
import {Dispatch} from "redux";
import { AppThunk } from "../store";

const initialState = {
    registered: false
}

type initialStateType = typeof initialState
type profileReducerActionType = cgangeStatusRegistrationACType

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
export type cgangeStatusRegistrationACType = ReturnType<typeof cgangeStatusRegistrationAC>
export const cgangeStatusRegistrationAC = (value: boolean) => {
    return {
        type: "REGIS/CHANGE_STATUS",
        value
    } as const
}

//TC
export const regTC = (data: userDataType): AppThunk => async dispatch => {
    try {
        const res = await registartionAPI.registration(data)
        dispatch(cgangeStatusRegistrationAC(true))
    } catch (e) {

    }
}