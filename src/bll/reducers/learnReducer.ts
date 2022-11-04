import {cardsAPI} from "../../api/cardsAPI";
import {AppThunk} from "../store";
import {editCardGrade} from "./cardsReducer";

const initialState = {
    packID: "",
    packName: "",
}

export const learnReducer = (state: InitialStateType = initialState, action: LearnActionsType): InitialStateType => {
    switch (action.type) {
        case "learn/SET-PACK":
            return {
                ...state,
                packID: action.payload.packID,
                packName: action.payload.packName
            }
        default :
            return state
    }
}

//AC
export const setUserPack = (payload: { packID: string, packName: string }) => ({
    type: "learn/SET-PACK",
    payload
} as const)

//TC
export const setCardsGrade = (id: string, rate: number): AppThunk => async dispatch => {
    const result = await cardsAPI.updateCardGrade({card_id: id, grade: rate})
    const {grade, card_id, shots} = result.data.updatedGrade
    dispatch(editCardGrade({grade, card_id, shots}))

}

//Type
type InitialStateType = typeof initialState
export type LearnActionsType =
    | ReturnType<typeof setUserPack>

