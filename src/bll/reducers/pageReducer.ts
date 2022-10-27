import {AppThunk, RootState, store, StoreType} from "../store";
import {packsAPI} from "../../api/packAPI";
import {setCardPack} from "./cardsUsersReducer";

const initialState = {
    page : 1,
    countPerPage  : 8,
    cardPacksTotalCount : 0,


}


export const pageReducer = (state: InitialStateType = initialState, action: PageActionType): InitialStateType => {
    switch (action.type) {
        case "page/SET-CARDS-TOTAL-COUNT" :

            return {
                ...state,
                cardPacksTotalCount: action.value
            }
        case "page/SET-PAGE":
            return {
                ...state,
                page: action.page
            }

        default:
            return state
    }
}

//Action
export const setCardPacksTotalCount = (value: number) => ({type: 'page/SET-CARDS-TOTAL-COUNT', value} as const)
export const setPage = (page: number) => ({type: 'page/SET-PAGE', page} as const)

//THUNK

export const changePages = (page : number):AppThunk => async (dispatch,getState: () => RootState) =>{
    const result = await packsAPI.getPacks({page, pageCount : getState().page.countPerPage,packName : getState().search.packName})
    dispatch(setPage(page))
    dispatch(setCardPack(result.data.cardPacks))
}
//Type
type InitialStateType = typeof initialState
export type PageActionType =
    | ReturnType<typeof setCardPacksTotalCount>
    | ReturnType<typeof setPage>







// packsAPI.getPacks({page : 1, pageCount : 8,packName : debouncedValue, user_id : props.cardType, min , max})
//     .then(res=>{
//         console.log(res.data)
//         props.callback(res.data.cardPacks)})