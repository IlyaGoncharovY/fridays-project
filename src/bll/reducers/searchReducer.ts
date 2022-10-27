import {GetPacksParamsType, packsAPI} from "../../api/packAPI";
import {AppThunk, RootState} from "../store";
import {setCardPacksTotalCount, setPage} from "./pageReducer";
import {fetchListsTC, setLists} from "./listsReducer";


const initialState = {
    packName: '',
    min: 0,
    max: 110,
    sortPacks: '',
    page: 1,
    pageCount: 0,
    user_id: "",
    block: false,
    searchMode: false

}


export const searchReducer = (state: InitialStateType = initialState, action: SearchActionType): InitialStateType => {
    switch (action.type) {
        case "search/SET-ALL-FILTERS":
            return {
                ...action.filters
            }
        case "search/SET-SEARCH-MODE":
            return {
                ...state,
                searchMode: action.searchMode
            }
        case "search/SET-DEFAULT-FILTER":
            return {
                ...action.payload
            }
        default:
            return state
    }
}

//Action
const setAllFilters = (state: InitialStateType, payload: GetPacksParamsType) => {
    const filters: InitialStateType = {
        ...state,
        ...payload
    }
    return {
        type: 'search/SET-ALL-FILTERS',
        filters
    } as const

}
export const setSearchMode = (searchMode: boolean) => ({type: 'search/SET-SEARCH-MODE', searchMode} as const)
const setDefaultFilter = (payload: InitialStateType) => ({type: 'search/SET-DEFAULT-FILTER', payload} as const)
//THUNK
export const resetFilter = (): AppThunk => async dispatch => {
    const payload = {
        packName: '',
        min: 0,
        max: 110,
        sortPacks: '',
        page: 1,
        pageCount: 8,
        user_id: "",
        block: false,
        searchMode: false
    }
    debugger
    dispatch(setDefaultFilter(payload))
    dispatch(fetchListsTC())
    dispatch(setPage(1))
}

export const setSearchFilter = (payload: GetPacksParamsType): AppThunk => async (dispatch, getState: () => RootState) => {

    const state = getState().search
    const result = await packsAPI.getPacks({...payload})
    dispatch(setAllFilters(state, payload))
    dispatch(setLists(result.data.cardPacks))
    dispatch(setPage(1))
    dispatch(setCardPacksTotalCount(result.data.cardPacksTotalCount))
    dispatch(setSearchMode(false))
}
//Type
type InitialStateType = typeof initialState
export type SearchActionType =
    | ReturnType<typeof setAllFilters>
    | ReturnType<typeof setSearchMode>
    | ReturnType<typeof setDefaultFilter>

export type SearchType = {
    pageCount: number
    page: number
    packName: string
    min: number
    max: number
}


// packsAPI.getPacks({page : 1, pageCount : 8,packName : debouncedValue, user_id : props.cardType, min , max})
//     .then(res=>{
//         console.log(res.data)
//         props.callback(res.data.cardPacks)})