import {LoginDataType, registartionAPI} from "../../api/regApi";
import {setAuthAC} from "./authReducer";


export const loginReducer=(state : any = {}, action:any)=>{
    return state
}




//THUNK

export const loginTC = (data : LoginDataType) => async (dispatch : any) => {
    try {
        debugger
        await registartionAPI.login(data)
        dispatch(setAuthAC(true))
    }catch (e) {
        debugger
        // @ts-ignore
        alert(e.response.data.error)
    }


}

