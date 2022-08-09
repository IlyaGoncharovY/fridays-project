const initialState = {
    name: "",
    id: ""
}
type initialStateType = typeof initialState

type profileReducerActionType = setUserACType

export const profileReducer = (state: initialStateType=initialState, action:profileReducerActionType):initialStateType => {
    switch (action.type) {
        case "SET_USER": {
            return {
                ...state,
                name: action.name,
                id: action.id
            }
        }
        default:
            return state
    }
}

//AC
type setUserACType = ReturnType<typeof setUserAC>
export const setUserAC = (name:string, id:string) => {
    return {
        type: "SET_USER",
        name,
        id
    } as const
}