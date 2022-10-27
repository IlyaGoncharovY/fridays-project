import {packsAPI, PackType} from "../../api/packAPI";
import {AppThunk} from "../store";
import {setCardPacksTotalCount} from "./pageReducer";
import {cardsAPI, CardType} from "../../api/cardsAPI";
import {setCardsTotalCount} from "./pageCardsReducer";

const initialState = {
    cardPack: [] as PackType[],
    colods : [] as CardType[],
    colodID : ""
}


export const cardsUsersReducer = (state: InitialStateType = initialState, action: CardsUserActionType): InitialStateType => {
    switch (action.type) {
        case "cardsUsers/SET-CARD-PACK" :

            console.log(action.cards)
            return {
                ...state,
                cardPack: action.cards
            }
        case "cardsUsers/SET-CARDS":
            return {
                ...state,
                colods:  action.cards
            }

        case "cardsUsers/SET-COLOD-ID":
            return {
                ...state,
                colodID: action.id
            }
        default:
            return state
    }
}

//Action
export const setCardPack = (cards: PackType[]) => ({type: 'cardsUsers/SET-CARD-PACK', cards} as const)
export const setColodes = (cards: CardType[]) => ({type: 'cardsUsers/SET-CARDS', cards} as const)
export const setColodID = (id : string) => ({type: 'cardsUsers/SET-COLOD-ID', id} as const)

//THUNK
export const setCards = (): AppThunk => async dispatch => {
     const result = await packsAPI.getPacks({page : 1, pageCount : 8 , max:110,min:0})
    console.log(result.data)
    dispatch(setCardPacksTotalCount(result.data.cardPacksTotalCount))
    dispatch(setCardPack(result.data.cardPacks))
}

export const setColods = (id : string): AppThunk => async dispatch =>{
    const result = await cardsAPI.getCards(id,{page:1,pageCount:8})
    debugger
    dispatch(setColodID(id))
    dispatch(setColodes(result.data.cards))
    dispatch(setCardsTotalCount(result.data.cardsTotalCount))
    console.log(result.data)
}

//Type
type InitialStateType = typeof initialState
export type CardsUserActionType =
    | ReturnType<typeof setCardPack>
    | ReturnType<typeof setColodes>
    | ReturnType<typeof setColodID>







// packsAPI.getPacks({page : 1, pageCount : 8,packName : debouncedValue, user_id : props.cardType, min , max})
//     .then(res=>{
//         console.log(res.data)
//         props.callback(res.data.cardPacks)})