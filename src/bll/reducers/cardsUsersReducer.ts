import {packsAPI, PackType} from "../../api/packAPI";
import {AppThunk} from "../store";
import {setCardPacksTotalCount} from "./pageReducer";

const initialState = {
    cardPack: [] as PackType[]

}


export const cardsUsersReducer = (state: InitialStateType = initialState, action: CardsUserActionType): InitialStateType => {
    switch (action.type) {
        case "cardsUsers/SET-CARD-PACK" :

            console.log(action.cards)
            return {
                ...state,
                cardPack: action.cards
            }
        default:
            return state
    }
}

//Action
export const setCardPack = (cards: PackType[]) => ({type: 'cardsUsers/SET-CARD-PACK', cards})

//THUNK
export const setCards = (): AppThunk => async dispatch => {
     const result = await packsAPI.getPacks({page : 1, pageCount : 8 , max:110,min:0})
    console.log(result.data)
    dispatch(setCardPacksTotalCount(result.data.cardPacksTotalCount))
    dispatch(setCardPack(result.data.cardPacks))
}

//Type
type InitialStateType = typeof initialState
export type CardsUserActionType = ReturnType<typeof setCardPack>







// packsAPI.getPacks({page : 1, pageCount : 8,packName : debouncedValue, user_id : props.cardType, min , max})
//     .then(res=>{
//         console.log(res.data)
//         props.callback(res.data.cardPacks)})