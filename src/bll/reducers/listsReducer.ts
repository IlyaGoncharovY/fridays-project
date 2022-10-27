import {packsAPI, PackType} from "../../api/packAPI";
import {AppThunk} from "../store";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
//constants
const SET_LISTS = "LISTS/SET-LISTS"
const ADD_LIST = "LISTS/ADD-LIST"
const DELETE_LIST = "LISTS/DELETE-LIST"
const EDIT_LIST = "LISTS/EDIT-LIST"
//reducer
const initialState: PackType[]= []
export const listsReducer = (state: PackType[] = initialState, action: ListActionType): PackType[] => {
    switch (action.type){
        case SET_LISTS:
            return action.payload.lists
        case ADD_LIST:
            return [action.payload.list, ...state]
        case DELETE_LIST:
            return state.filter(list => list._id !== action.payload.idList)
        case EDIT_LIST:
            return state.map(list => list._id === action.payload.idList ? {...list, name: action.payload.title}: list)
        default:
            return state
    }
}
//AC
const setLists = (lists: PackType[]) => ({
    type: SET_LISTS,
    payload: {lists}
} as const)
const addList = (list: PackType) => ({
    type: ADD_LIST,
    payload: {list}
}as const)
const deleteList = (idList: string) => ({
    type: DELETE_LIST,
    payload: {idList}
} as const)
const editList = (idList: string, title: string) => ({
    type: EDIT_LIST,
    payload: {idList, title}
} as const)
//TC
export const fetchListsTC = (): AppThunk => async dispatch => {
    try {
        const res = await packsAPI.getPacks({})
        dispatch(setLists(res.data.cardPacks))
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const addListTC = (title: string): AppThunk => async dispatch => {
    try {
        const res = await packsAPI.addPack({name: title})
        if(res.status === 201){
            dispatch(addList(res.data.newCardsPack))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const deleteListTC = (idList: string): AppThunk => async dispatch => {
    try {
        const res = await packsAPI.deletePack({id: idList})
        if(res.status === 200){
            dispatch(deleteList(idList))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const editListTC = (idList: string, title: string): AppThunk => async dispatch => {
    try {
        console.log(idList, title)
        const res = await packsAPI.updatePack({name: title, _id: idList})
        if(res.status === 200) {
            dispatch(editList(idList, title))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export type ListActionType =
    | ReturnType<typeof setLists>
    | ReturnType<typeof addList>
    | ReturnType<typeof deleteList>
    | ReturnType<typeof editList>
