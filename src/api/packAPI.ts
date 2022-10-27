import {instance} from "./instace"

export const packsAPI = {
    getPacks(params: GetPacksParamsType) {
        return instance.get<ResponseGetPackType>("cards/pack", {params: {...params}})
    },
    addPack(cardsPack: CardsPackType) {
        return instance.post<ResponsePackType>("cards/pack", {cardsPack: {...cardsPack}})
    },
    updatePack(cardsPack: UpdatePackParamsType) {
        return instance.put<ResponsePackType>("cards/pack", {cardsPack:cardsPack})
    },
    deletePack(params: { id: string }) {
        return instance.delete("cards/pack", {params})
    }

}

type GetPacksParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
    block?: boolean
}

export type ResponseGetPackType = {
    user_id: string
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    params: QueryParamsType
}

export type ResponsePackType = {
    newCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
}

export type PackType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
}
type QueryParamsType = {
    user_id: string;
    page: number;
    pageCount: number;
    sortPacks: string;
    min?: number;
    max?: number;
    cardPacksTotalCount: number;
    packName: string;
}
type CardsPackType = {
    name: string // если не отправить будет таким
    deckCover?: string // не обязателен
    private?: boolean
}

type UpdatePackParamsType = {
    _id: string
    name?: string // не обязательно
    private?: boolean // не обязательно
}


