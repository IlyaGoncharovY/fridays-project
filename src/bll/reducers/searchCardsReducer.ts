import {AppThunk, RootState} from "../store";

import {cardsAPI} from "../../api/cardsAPI";
import {setCardsPage, setCardsTotalCount} from "./pageCardsReducer";
import {setCards} from "./cardsReducer";


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

    return {
        type: 'searchCards/SET-ALL-FILTERS',
        payload
    } as const

}
export const setCardsSearchMode = (searchMode: boolean) => ({type: 'searchCards/SET-SEARCH-MODE', searchMode} as const)

//THUNK


export const setSearchCardsFilter = (payload: {cardQuestion : string}): AppThunk => async (dispatch, getState: () => RootState) => {


    const result = await cardsAPI.getCards(getState().cards.cardsPack_id,{...payload,pageCount : getState().cardsPages.countPerPage})

    dispatch(setCardsFilter(payload))
    dispatch(setCards(result.data.cards))
    dispatch(setCardsPage(1))
    dispatch(setCardsTotalCount(result.data.cardsTotalCount))
    dispatch(setCardsSearchMode(false))
}
//Type
type InitialStateType = typeof initialState
export type SearchCardsActionType =
    | ReturnType<typeof setCardsSearchMode>
    | ReturnType<typeof setCardsFilter>

