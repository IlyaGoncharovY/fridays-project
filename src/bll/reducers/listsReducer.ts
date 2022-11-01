import {packsAPI, PackType} from "../../api/packAPI";
import {AppThunk} from "../store";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
import {setCardPacksTotalCount} from "./pageReducer";
import {setStatusAC} from "./authReducer";
//constants
const SET_LISTS = "LISTS/SET-LISTS"
const ADD_LIST = "LISTS/ADD-LIST"
const DELETE_LIST = "LISTS/DELETE-LIST"
const EDIT_LIST = "LISTS/EDIT-LIST"
//reducer
const initialState: PackType[] = []
export const listsReducer = (state: PackType[] = initialState, action: ListActionType): PackType[] => {
    switch (action.type) {
        case SET_LISTS:
            return action.payload.lists
        case ADD_LIST:
            return [action.payload.list, ...state]
        case DELETE_LIST:
            return state.filter(list => list._id !== action.payload.idList)
        case EDIT_LIST:
            return state.map(list => list._id === action.payload.idList ? {...list, name: action.payload.title} : list)
        default:
            return state
    }
}
//AC
export const setLists = (lists: PackType[]) => ({
    type: SET_LISTS,
    payload: {lists}
} as const)
const addList = (list: PackType) => ({
    type: ADD_LIST,
    payload: {list}
} as const)
const deleteList = (idList: string) => ({
    type: DELETE_LIST,
    payload: {idList}
} as const)
const editList = (idList: string, title: string) => ({
    type: EDIT_LIST,
    payload: {idList, title}
} as const)
//TC
export const fetchListsTC = (): AppThunk => async (dispatch, getState) => {
    try {
        const user_id = getState().search.user_id
        dispatch(setStatusAC("loading"))
        const res = await packsAPI.getPacks({page: 1, pageCount: 8, max: 110, min: 0, user_id})
        dispatch(setCardPacksTotalCount(res.data.cardPacksTotalCount))
        dispatch(setLists(res.data.cardPacks))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }

}
export const addListTC = (title: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await packsAPI.addPack({name: title})
        if (res.status === 201) {
            dispatch(addList(res.data.newCardsPack))
            dispatch(fetchListsTC())
            dispatch(setStatusAC("succeeded"))
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
export const deleteListTC = (idList: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await packsAPI.deletePack({id: idList})
        if (res.status === 200) {
            dispatch(deleteList(idList))
            dispatch(fetchListsTC())
            dispatch(setStatusAC("succeeded"))
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
export const editListTC = (idList: string, title: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await packsAPI.updatePack({name: title, _id: idList})
        if (res.status === 200) {
            dispatch(editList(idList, title))
            dispatch(setStatusAC("succeeded"))
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
export type ListActionType =
    | ReturnType<typeof setLists>
    | ReturnType<typeof addList>
    | ReturnType<typeof deleteList>
    | ReturnType<typeof editList>
