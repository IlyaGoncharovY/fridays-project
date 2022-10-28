import {AppThunk} from "../store";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
import {cardsAPI, CardType} from "../../api/cardsAPI";
import {setCardsTotalCount} from "./pageCardsReducer";
//constants
const SET_CARDS = "CARDS/SET-CARDS"
const ADD_CARD = "CARDS/ADD-CARD"
const DELETE_CARD = "CARDS/DELETE-CARD"
const EDIT_CARD = "CARDS/EDIT-CARD"
//reducer

const initialState: CardStateType= {
    cardsPack_id: "",
    cards:[]
}
export const cardsReducer = (state: CardStateType = initialState, action: CardActionType): CardStateType => {
    switch (action.type){
        case SET_CARDS:
            return {...state, cardsPack_id: action.payload.cardsPack_id, cards: action.payload.cards}
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
export const setCards = (cardsPack_id: string, cards: CardType[]) => ({
    type: SET_CARDS,
    payload: {cardsPack_id, cards}
} as const)
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
export const fetchCardsTC = (listID: string): AppThunk => async dispatch => {
    try {
        const res = await cardsAPI.getCards(listID, {page:1,pageCount:8})
        dispatch(setCards(listID, res.data.cards))
        dispatch(setCardsTotalCount(res.data.cardsTotalCount))
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const addCardTC = (question: string): AppThunk => async (dispatch, getState) => {
    try {
        console.log(question)
        const cardsPack_id = getState().cards.cardsPack_id
        const res = await cardsAPI.addCard({cardsPack_id, question})
        if(res.status === 201){
            dispatch(addCard(res.data.newCard))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const deleteCardTC = (cardID: string): AppThunk => async dispatch => {
    try {
        const res = await cardsAPI.deleteCard({id: cardID})
        if(res.status === 200){
            dispatch(deleteCard(cardID))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const editCardTC = (cardID: string, question: string, answer: string): AppThunk => async dispatch => {
    try {
        const res = await cardsAPI.updateCard({_id: cardID, question, answer})
        if(res.status === 200) {
            dispatch(editCard(cardID, question, answer))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export type CardActionType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof addCard>
    | ReturnType<typeof deleteCard>
    | ReturnType<typeof editCard>
export type CardStateType = {
    cardsPack_id: string
    cards:CardType[]
}