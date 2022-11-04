import {instance} from "./instance"

export const packsAPI = {
    getPacks(params: PacksParamsType) {
        return instance.get<ResponsePacksType>("cards/pack", {params})
    },
    addPack(cardsPack: AddPackType) {
        return instance.post<ResponseAddPackType>("cards/pack", {cardsPack})
    },
    updatePack(cardsPack: UpdatePackType) {
        return instance.put<ResponseUpdatePackType>("cards/pack", {cardsPack})
    },
    deletePack(id: string) {
        return instance.delete<ResponseDeletePackType>(`cards/pack?id=${id}`)
    }
}
//Types = payload
export type PacksParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
    block?: boolean
}
type AddPackType = {
    name: string
    deckCover?: string
    private?: boolean
}

type UpdatePackType = {
    _id: string
    name?: string
    private?: boolean
}
export type ResponsePacksType = {
    cardPacks: PackType[]
    user_id: string
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}
//Types - response
export type ResponseAddPackType = {
    newCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
}
export type ResponseUpdatePackType = {
    updatedCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
}
export type ResponseDeletePackType = {
    deletedCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
}
//Type - common
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



