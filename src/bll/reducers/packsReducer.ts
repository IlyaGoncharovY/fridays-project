import {packsAPI, PacksParamsType, PackType} from "../../api/packsAPI";
import {AppThunk} from "../store";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
import {setSearchMode, setStatusAC} from "./appReducer";
//constants
const SET_LISTS = "PACKS/SET-LISTS"
const ADD_LIST = "PACKS/ADD-LIST"
const DELETE_LIST = "PACKS/DELETE-LIST"
const EDIT_LIST = "PACKS/EDIT-LIST"
const SET_PAGE = "PACKS/SET-PAGE"
const SET_PACKS_TOTAL_COUNT = "PACKS/SET-PACKS-TOTAL-COUNT"
const SET_MAX_MIN_FILTER = "PACKS/SET-MAX-MIN-FILTER"
const SET_PACK_NAME = "PACKS/SET-PACK-NAME"
const SET_USER_ID = "PACKS/SET-USER-ID"
//reducer
const initialState: PacksStateType = {
    cardPacks: [],
    user_id: "",
    sortPacks: "",
    packName: "",
    page: 1,
    pageCount: 8,
    cardPacksTotalCount: 1,
    minCardsCount: 0,
    maxCardsCount: 110,
}
export const packsReducer = (state: PacksStateType = initialState, action: PacksActionType): PacksStateType => {
    switch (action.type) {
        case SET_LISTS:
            return {...state, cardPacks: action.payload.packs}
        case ADD_LIST:
            return {...state, cardPacks: [action.payload.pack, ...state.cardPacks]}
        case DELETE_LIST:
            return {...state, cardPacks: state.cardPacks.filter(pack => pack._id !== action.payload.idPack)}
        case EDIT_LIST:
            return {
                ...state,
                cardPacks: state.cardPacks.map(pack => pack._id === action.payload.idPack ? {
                    ...pack,
                    name: action.payload.title
                } : pack)
            }
        case SET_PACKS_TOTAL_COUNT:
            return {
                ...state,
                cardPacksTotalCount: action.payload.value
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.payload.page
            }
        case SET_MAX_MIN_FILTER:
            return {
                ...state, maxCardsCount: action.payload.max, minCardsCount: action.payload.min
            }
        case SET_PACK_NAME:
            return {
                ...state, packName: action.payload.packName
            }
        case SET_USER_ID:
            return {
                ...state, user_id: action.payload.userID
            }
        default:
            return state
    }
}
//AC
export const setPacks = (packs: PackType[]) => ({
    type: SET_LISTS,
    payload: {packs}
} as const)
const addPack = (pack: PackType) => ({
    type: ADD_LIST,
    payload: {pack}
} as const)
const deletePack = (idPack: string) => ({
    type: DELETE_LIST,
    payload: {idPack}
} as const)
const editPack = (idPack: string, title: string) => ({
    type: EDIT_LIST,
    payload: {idPack, title}
} as const)
const setCardPacksTotalCount = (value: number) => ({
    type: SET_PACKS_TOTAL_COUNT,
    payload: {value}
} as const)
const setPage = (page: number) => ({
    type: SET_PAGE,
    payload: {page}
} as const)
const setMaxMinFilter = (max: number , min: number) => ({
    type: SET_MAX_MIN_FILTER,
    payload: {max, min}
} as const)
const setPackName = (packName: string) => ({
    type: SET_PACK_NAME,
    payload: {packName}
} as const)
const setUserID = (userID: string) => ({
    type: SET_USER_ID,
    payload: {userID}
} as const)
//TC
export const fetchPacksTC = (params: PacksParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await packsAPI.getPacks(params)
        dispatch(setPacks(res.data.cardPacks))
        dispatch(setCardPacksTotalCount(res.data.cardPacksTotalCount))
        dispatch(setMaxMinFilter(params.max, params.min))
        dispatch(setPage(res.data.page))
        dispatch(setPackName(params.packName))
        dispatch(setUserID(params.user_id))
        dispatch(setSearchMode(false))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }

}
export const addPackTC = (name: string): AppThunk => async (dispatch, getState) => {
    const pageCount = getState().packs.pageCount
    const max = getState().packs.maxCardsCount
    const min = getState().packs.minCardsCount
    const user_id = getState().packs.user_id
    const packName = getState().packs.packName
    try {
        dispatch(setStatusAC("loading"))

        const res = await packsAPI.addPack({name})
        dispatch(addPack(res.data.newCardsPack))
        dispatch(fetchPacksTC({pageCount, max, min, user_id, packName}))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
export const deletePackTC = (id: string): AppThunk => async (dispatch, getState) => {
    const pageCount = getState().packs.pageCount
    const max = getState().packs.maxCardsCount
    const min = getState().packs.minCardsCount
    const user_id = getState().packs.user_id
    const packName = getState().packs.packName
    try {
        dispatch(setStatusAC("loading"))
        await packsAPI.deletePack(id)
        dispatch(deletePack(id))
        dispatch(fetchPacksTC({pageCount, max, min, user_id, packName}))
        dispatch(setStatusAC("succeeded"))

    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
export const editPackTC = (_id: string, name: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        await packsAPI.updatePack({_id, name})
        dispatch(editPack(_id, name))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}

export type PacksActionType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof addPack>
    | ReturnType<typeof deletePack>
    | ReturnType<typeof editPack>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setCardPacksTotalCount>
    | ReturnType<typeof setMaxMinFilter>
    | ReturnType<typeof setPackName>
    | ReturnType<typeof setUserID>

export type PacksStateType = {
    cardPacks: PackType[]
    user_id: string
    sortPacks: string
    packName: string
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}
export type SearchType = {
    packName: string
    page: number
    pageCount: number
    min: number
    max: number
    user_id: string
}