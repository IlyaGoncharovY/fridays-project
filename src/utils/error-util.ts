import axios, {AxiosError} from "axios";
import {ActionErrorType, setError} from "../bll/reducers/ErrorReducer";
import {Dispatch} from "redux";

export const errorUtil = (e: Error | AxiosError<{error : string}>, dispatch : Dispatch<ActionErrorType>) => {

    if(axios.isAxiosError(e)){
        const error = e.response?.data ? (e.response.data as {error : string}).error : e.message
        dispatch(setError(error))
    }
}