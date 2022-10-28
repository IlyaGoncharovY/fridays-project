import {AppThunk} from "../store";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
import {cardsAPI, CardType} from "../../api/cardsAPI";
import {setCardsTotalCount} from "./pageCardsReducer";
import {setStatusAC} from "./authReducer";
//constants
const SET_CARDS = "CARDS/SET-CARDS"
const SET_CARDS_PACK_ID = "CARDS/SET-CARDS-PACK-ID"
const ADD_CARD = "CARDS/ADD-CARD"
const DELETE_CARD = "CARDS/DELETE-CARD"
const EDIT_CARD = "CARDS/EDIT-CARD"

const initialState: CardStateType= {
    cardsPack_id: "",
    cards:[]
}
//reducer
export const cardsReducer = (state: CardStateType = initialState, action: CardActionType): CardStateType => {
    switch (action.type){
        case SET_CARDS:
            return {...state, cards: action.payload.cards}
        case SET_CARDS_PACK_ID:
            return {...state, cardsPack_id: action.payload.cardsPack_id}
        case ADD_CARD:
            return {...state, cards: [action.payload.card, ...state.cards]}
        case DELETE_CARD:
            return {...state, cards: state.cards.filter(card => card._id !== action.payload.cardID)}
        case EDIT_CARD:
            return {... state,
                cards: state.cards.map(card => card._id === action.payload.cardID
                    ? {...card, question: action.payload.question, answer: action.payload.answer}
                    : card)}
        default:
            return state
    }
}
//AC
export const setCards = (cards: CardType[]) => ({
    type: SET_CARDS,
    payload: {cards}
} as const)
export const setCardsPackID= (cardsPack_id: string) => ({
    type: SET_CARDS_PACK_ID,
    payload: {cardsPack_id}
}as const)
const addCard = (card: CardType) => ({
    type: ADD_CARD,
    payload: {card}
}as const)
const deleteCard = (cardID: string) => ({
    type: DELETE_CARD,
    payload: {cardID}
} as const)
const editCard = (cardID: string, question: string, answer: string) => ({
    type: EDIT_CARD,
    payload: {cardID, question, answer}
} as const)
//TC
export const fetchCardsTC = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setStatusAC("loading"))
        const cardsPack_id = getState().cards.cardsPack_id
        const res = await cardsAPI.getCards(cardsPack_id, {page:1,pageCount:8})
        dispatch(setCards(res.data.cards))
        dispatch(setCardsTotalCount(res.data.cardsTotalCount))
        dispatch(setStatusAC("succeeded"))
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}

export const addCardTC = (question: string): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setStatusAC("loading"))
        const cardsPack_id = getState().cards.cardsPack_id
        const res = await cardsAPI.addCard({cardsPack_id, question})
        if(res.status === 201){
            dispatch(addCard(res.data.newCard))
            dispatch(setStatusAC("succeeded"))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const deleteCardTC = (cardID: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await cardsAPI.deleteCard({id: cardID})
        if(res.status === 200){
            dispatch(deleteCard(cardID))
            dispatch(setStatusAC("succeeded"))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const editCardTC = (cardID: string, question: string, answer: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await cardsAPI.updateCard({_id: cardID, question, answer})
        if(res.status === 200) {
            dispatch(editCard(cardID, question, answer))
            dispatch(setStatusAC("succeeded"))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
//type
export type CardActionType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCardsPackID>
    | ReturnType<typeof addCard>
    | ReturnType<typeof deleteCard>
    | ReturnType<typeof editCard>

export type CardStateType = {
    cardsPack_id: string
    cards:CardType[]
}