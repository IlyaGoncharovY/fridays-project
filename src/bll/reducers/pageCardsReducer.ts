import {AppThunk, RootState, store, StoreType} from "../store";
import {packsAPI} from "../../api/packAPI";
import {setCardPack, setColodes} from "./cardsUsersReducer";
import {cardsAPI} from "../../api/cardsAPI";

const initialState = {
    page : 1,
    countPerPage  : 8,
    cardsTotalCount : 0,


}


export const pageCardsReducer = (state: InitialStateType = initialState, action: CardsPagesActionType): InitialStateType => {
    switch (action.type) {
        case "page/SET-CARDS-TOTAL-COUNT" :

            return {
                ...state,
                cardsTotalCount: action.value
            }
        case "page/SET-PAGE":
            return {
                ...state,
                page: action.page
            }

        default:
            return state
    }
}

//Action
export const setCardsTotalCount = (value: number) => ({type: 'page/SET-CARDS-TOTAL-COUNT', value} as const)
export const setCardsPage = (page: number) => ({type: 'page/SET-PAGE', page} as const)

//THUNK

export const changeCardsPages = (page : number):AppThunk => async (dispatch,getState: () => RootState) =>{
    debugger
    const result = await cardsAPI.getCards(getState().cards.colodID,{page, pageCount : getState().cardsPages.countPerPage})
    dispatch(setCardsPage(page))
    dispatch(setColodes(result.data.cards))
}
//Type
type InitialStateType = typeof initialState
export type CardsPagesActionType =
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setCardsPage>







// packsAPI.getPacks({page : 1, pageCount : 8,packName : debouncedValue, user_id : props.cardType, min , max})
//     .then(res=>{
//         console.log(res.data)
//         props.callback(res.data.cardPacks)})