import {AppThunk, RootState} from "../store";
import {setColodes} from "./cardsUsersReducer";
import {cardsAPI} from "../../api/cardsAPI";
import {setCardsPage, setCardsTotalCount} from "./pageCardsReducer";


const initialState = {
    cardQuestion : "",
    searchMode: false
}


export const searchCardsReducer = (state: InitialStateType = initialState, action: SearchCardsActionType): InitialStateType => {
    switch (action.type) {
        case "searchCards/SET-SEARCH-MODE":
            return {
                ...state,
                searchMode: action.searchMode
            }
        case "searchCards/SET-ALL-FILTERS":
            debugger
            return {
                ...state,
                cardQuestion: action.payload.cardQuestion
            }
        default:
            return state
    }
}

//Action
const setCardsFilter = (payload: {cardQuestion : string}) => {
    debugger
    return {
        type: 'searchCards/SET-ALL-FILTERS',
        payload
    } as const

}
export const setCardsSearchMode = (searchMode: boolean) => ({type: 'searchCards/SET-SEARCH-MODE', searchMode} as const)

//THUNK


export const setSearchCardsFilter = (payload: {cardQuestion : string}): AppThunk => async (dispatch, getState: () => RootState) => {
    debugger

    const result = await cardsAPI.getCards(getState().cards.cardsPack_id,{...payload,pageCount : getState().cardsPages.countPerPage})

    dispatch(setCardsFilter(payload))
    dispatch(setColodes(result.data.cards))
    dispatch(setCardsPage(1))
    dispatch(setCardsTotalCount(result.data.cardsTotalCount))
    dispatch(setCardsSearchMode(false))
}
//Type
type InitialStateType = typeof initialState
export type SearchCardsActionType =
    | ReturnType<typeof setCardsSearchMode>
    | ReturnType<typeof setCardsFilter>

