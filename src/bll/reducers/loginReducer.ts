import {LoginDataType, registartionAPI} from "../../api/regApi";
import {AppThunk} from "../store";
import {errorUtil} from "../../utils/error-util";
import {AxiosError} from "axios";

const initialState : initialStateType = {
    isLoggedIn: false
}

export const loginReducer=(state  = initialState, action:ActionLoginType) : initialStateType  =>{
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



//ACTIONS
export const loginAC = (value : boolean)=>({type : 'login/SET-LOGIN', value} as const)

//THUNK
export const loginTC = (data : LoginDataType) : AppThunk => async dispatch  => {
    try {
        debugger
        await registartionAPI.login(data)
        dispatch(loginAC(true))
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }


}


//types
export type ActionLoginType = ReturnType<typeof loginAC>
type initialStateType = {
    isLoggedIn : boolean
}

