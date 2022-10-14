const initialState = {
    subscribe: false
}

type initialStateType = typeof initialState
type profileReducerActionType = cgangeStatusRegistrationACType

export const registrationReducer = (state: initialStateType = initialState, action: profileReducerActionType): initialStateType => {
    switch (action.type) {
        case "REGIS/CHANGE_STATUS": {
            return {
                ...state,
                subscribe: action.value
            }
        }
        default:
            return state
    }
}

export type cgangeStatusRegistrationACType = ReturnType<typeof cgangeStatusRegistrationAC>
export const cgangeStatusRegistrationAC = (value: boolean) => {
    return {
        type: "REGIS/CHANGE_STATUS",
        value
    } as const
}