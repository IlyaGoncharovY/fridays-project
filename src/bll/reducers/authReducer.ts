import {LoginDataType, regAPI} from "../../api/regApi";
import {AppThunk} from "../store";
import {errorUtil} from "../../utils/error-util";
import {AxiosError} from "axios";
import {setProfileAC} from "./profileReducer";

const initialState : initialStateType = {
    isLoggedIn: false
}
//reducer
export const authReducer=(state  = initialState, action:LoginActionType) : initialStateType  =>{
    switch (action.type) {
        case "login/SET-LOGIN":
            return {
                ...state,
                isLoggedIn : action.value
            }
        default :
            return state
    }
}
//AC
export const loginAC = (value : boolean)=>({type : 'login/SET-LOGIN', value} as const)
//TC
export const loginTC = (data : LoginDataType) : AppThunk => async dispatch  => {
    try {
       const res =  await regAPI.login(data)
        dispatch(setProfileAC(res.data))
        dispatch(loginAC(true))

    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const logoutTC = () : AppThunk => async dispatch  => {
    try {
        await regAPI.logout()
        dispatch(loginAC(false))
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
//types
export type LoginActionType = ReturnType<typeof loginAC>
type initialStateType = {
    isLoggedIn : boolean
}

