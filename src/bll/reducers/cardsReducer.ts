import {AppThunk} from "../store";
import {AxiosError} from "axios";
import {errorUtil} from "../../utils/error-util";
import {cardsAPI, CardsParamsType, CardType} from "../../api/cardsAPI";
import {setStatusAC} from "./appReducer";

//constants
const SET_CARDS = "CARDS/SET-CARDS"
const SET_CARDS_PACK_ID = "CARDS/SET-CARDS-PACK-ID"
const ADD_CARD = "CARDS/ADD-CARD"
const DELETE_CARD = "CARDS/DELETE-CARD"
const EDIT_CARD = "CARDS/EDIT-CARD"
const EDIT_CARD_GRADE = "CARDS/EDIT-CARD-GRADE"
const SET_CARDS_TOTAL_COUNT = "CARDS/SET-CARDS-TOTAL-COUNT"
const SET_CARDS_PAGE = "CARDS/SET-CARDS-PAGE"
const SET_SEARCH_MODE = "CARDS/SET-SEARCH-MODE"
const SET_SORT_CARD = "CARDS/SET-SORT-CARD"

const initialState: CardStateType = {
    cardsPack_id: "",
    cards: [],
    sortCards: "1grade",
    cardsSorted: '',
    page: 1,
    cardsTotalCount: 1,
    pageCount: 8,
    cardAnswer: "",
    cardQuestion: "",
    questionImg: ""
}
//reducer
export const cardsReducer = (state: CardStateType = initialState, action: CardActionType): CardStateType => {
    switch (action.type) {
        case SET_CARDS:
            return {...state, cards: action.payload.cards}
        case SET_CARDS_PACK_ID:
            return {...state, cardsPack_id: action.payload.cardsPack_id}
        case ADD_CARD:
            return {...state, cards: [action.payload.card, ...state.cards]}
        case DELETE_CARD:
            return {...state, cards: state.cards.filter(card => card._id !== action.payload.cardID)}
        case EDIT_CARD:
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload.cardID
                    ? {
                        ...card,
                        question: action.payload.question,
                        answer: action.payload.answer,
                        questionImg: action.payload.questionImg
                    }
                    : card)
            }
        case EDIT_CARD_GRADE:
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload.card_id
                    ? {
                        ...card,
                        grade: action.payload.grade,
                        shots: action.payload.shots
                    } : card)
            }
        case SET_CARDS_TOTAL_COUNT:
            return {
                ...state,
                cardsTotalCount: action.payload.value
            }
        case SET_CARDS_PAGE:
            return {
                ...state,
                page: action.payload.page
            }
        case SET_SEARCH_MODE:
            return {
                ...state,
                cardQuestion: action.payload.cardQuestion,
                cardAnswer: action.payload.cardAnswer
            }
        case SET_SORT_CARD:
            return {
                ...state,
                sortCards: action.payload.sortCards
            }
        default:
            return state
    }
}
//AC
export const setCards = (cards: CardType[]) => ({
    type: SET_CARDS,
    payload: {cards}
} as const)
export const setCardsPackID = (cardsPack_id: string) => ({
    type: SET_CARDS_PACK_ID,
    payload: {cardsPack_id}
} as const)
const addCard = (card: CardType) => ({
    type: ADD_CARD,
    payload: {card}
} as const)
const deleteCard = (cardID: string) => ({
    type: DELETE_CARD,
    payload: {cardID}
} as const)
const editCard = (cardID: string, question: string, answer: string, questionImg:string) => ({
    type: EDIT_CARD,
    payload: {cardID, question, answer, questionImg}
} as const)
export const editCardGrade = (payload: { grade: number, shots: number, card_id: string }) =>
    ({type: EDIT_CARD_GRADE, payload} as const)
const setCardsTotalCount = (value: number) => ({
    type: SET_CARDS_TOTAL_COUNT,
    payload: {value}
} as const)
const setCardsPage = (page: number) => ({
    type: SET_CARDS_PAGE,
    payload: {page}
} as const)
const setSearchMode = (cardAnswer: string | undefined, cardQuestion: string) => ({
    type: SET_SEARCH_MODE,
    payload: {cardAnswer, cardQuestion}
} as const)
const setSortCards = (sortCards: string) => ({
    type: SET_SORT_CARD,
    payload: {sortCards}
} as const)
//TC
export const fetchCardsTC = (params: CardsParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await cardsAPI.getCards(params)
        dispatch(setCards(res.data.cards))
        dispatch(setCardsTotalCount(res.data.cardsTotalCount))
        dispatch(setCardsPackID(params.cardsPack_id))
        dispatch(setCardsPage(res.data.page))
        dispatch(setSearchMode(params.cardAnswer, params.cardQuestion))
        dispatch(setSortCards(params.sortCards))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}

export const addCardTC = (question: string, answer: string, questionImg?: string): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setStatusAC("loading"))
        const cardsPack_id = getState().cards.cardsPack_id
        const res = await cardsAPI.addCard({cardsPack_id, question, answer , questionImg})
        dispatch(addCard(res.data.newCard))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
export const deleteCardTC = (id: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        await cardsAPI.deleteCard(id)
        dispatch(deleteCard(id))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
export const editCardTC = (_id: string, question: string, answer: string, questionImg?: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        await cardsAPI.updateCard({_id, question, answer, questionImg})
        dispatch(editCard(_id, question, answer, questionImg!))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        errorUtil(error, dispatch)
    }
}
//type
export type CardActionType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCardsPackID>
    | ReturnType<typeof addCard>
    | ReturnType<typeof deleteCard>
    | ReturnType<typeof editCard>
    | ReturnType<typeof editCardGrade>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof setSearchMode>
    | ReturnType<typeof setSortCards>

export type CardStateType = {
    cardsPack_id: string
    cards: CardType[]
    sortCards: string
    cardsSorted: string
    page: number
    cardsTotalCount: number
    pageCount: number
    cardAnswer: string | undefined
    cardQuestion: string
    questionImg: null | string
}