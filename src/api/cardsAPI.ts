import {instance} from "./instance"

export const cardsAPI = {
    getCards(params: CardsParamsType) {
        return instance.get<ResponseCardsType>("cards/card", {params})
    },
    addCard(card: AddCardType) {
        return instance.post<ResponseAddCardType>("cards/card", {card})
    },
    updateCard(card: UpdateCardType) {
        return instance.put<ResponseUpdateCardType>("cards/card", {card})
    },
    updateCardGrade(card: SendGradeCardType) {
        return instance.put<UpdatedGradeType>("cards/grade", card)
    },
    deleteCard(id: string) {
        return instance.delete<ResponseDeletedCardType>(`cards/card?id=${id}`)
    }
}
//Types - payload
export type CardsParamsType = {
    cardAnswer?: string
    cardQuestion: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards: string
    page: number
    pageCount: number
}
export type AddCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    comments?: string
    questionImg?: string | null
}
export type SendGradeCardType = {
    card_id: string
    grade: number
}
//Types - response
export type ResponseCardsType = {
    cards: CardType[],
    packUserId: string,
    packName: string,
    packPrivate: boolean,
    packCreated: string,
    packUpdated: string,
    page: number,
    pageCount: number,
    cardsTotalCount: number,
    minGrade: number,
    maxGrade: number,
    token: string,
    tokenDeathTime: number
}
export type ResponseAddCardType = {
    newCard: CardType
    token: string,
    tokenDeathTime: number
}
export type ResponseUpdateCardType = {
    updatedCard: CardType
    token: string,
    tokenDeathTime: number
    packDeckCover?: null | string
}
export type ResponseDeletedCardType = {
    deletedCard: CardType
    token: string,
    tokenDeathTime: number
}
//Common type
export type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
    card_id: string;
    questionImg: string
}

export type UpdatedGradeType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
    token: string
    tokenDeathTime: number
}