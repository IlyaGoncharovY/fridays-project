import {instance} from "./instance"

export const cardsAPI = {
    getCards(cardsPack_id: string, params: CardsParamsType) {
        return instance.get<ResponseCardsType>(`cards/card?cardsPack_id=${cardsPack_id}`,
            {params: {...params}}
            // {params}
        )
    },
    addCard(card: { cardsPack_id: string; question?: string; answer?: string }) {
        return instance.post("cards/card", {card})
    },
    updateCard(card: { _id: string; question?: string; answer?: string }) {
        return instance.put("cards/card", {card})
    },
    deleteCard(params: { id: string }) {
        return instance.delete("cards/card", {params})
    }
}

type CardsParamsType = {
    cardAnswer?: string // не обязательно
    cardQuestion?: string // не обязательно
    cardsPack_id?: string
    min?: number // не обязательно
    max?: number // не обязательно
    sortCards?: string // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
}

type ResponseCardsType = {
    cards: CardType[],
    packUserI: string,
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
}