import axios, {AxiosError} from "axios";
import {setErrorAC, setStatusAC} from "../bll/reducers/appReducer";
import {AppDispatch} from "../bll/store";

export const errorUtil = (e: Error | AxiosError<{error : string}>, dispatch : AppDispatch) => {

    if(axios.isAxiosError(e)){
        const error = e.response?.data ? (e.response.data as {error : string}).error : e.message
        dispatch(setErrorAC(error))
        dispatch(setStatusAC("failed"))
    }
}