import {packsAPI} from "../../api/packAPI";
import {AppThunk} from "../store";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
import {cardsAPI, CardType} from "../../api/cardsAPI";
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
        default:
            return state
    }
}
//AC
const setCards = (cardsPack_id: string, cards: CardType[]) => ({
    type: SET_CARDS,
    payload: {cardsPack_id, cards}
} as const)
const addCard = (card: CardType) => ({
    type: ADD_CARD,
    payload: {card}
}as const)
const deleteCard = (idList: string) => ({
    type: DELETE_CARD,
    payload: {idList}
} as const)
const editCard = (idList: string, title: string) => ({
    type: EDIT_CARD,
    payload: {idList, title}
} as const)
//TC
export const fetchCardsTC = (listID: string): AppThunk => async dispatch => {
    try {
        const res = await cardsAPI.getCards(listID, {})
        dispatch(setCards(listID, res.data.cards))
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
export const deleteListTC = (idList: string): AppThunk => async dispatch => {
    try {
        const res = await packsAPI.deletePack({id: idList})
        if(res.status === 200){
            dispatch(deleteCard(idList))
        }
    }catch (e) {
        const error = e as Error | AxiosError<{error : string}>
        errorUtil(error,dispatch)
    }
}
export const editListTC = (idList: string, title: string): AppThunk => async dispatch => {
    try {
        console.log(idList, title)
        const res = await packsAPI.updatePack({name: title, _id: idList})
        if(res.status === 200) {
            dispatch(editCard(idList, title))
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