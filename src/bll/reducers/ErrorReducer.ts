
const initialState = {
    error  : ''
}

export const ErrorReducer = (state : InitialStateType = initialState, action : ActionErrorType) : InitialStateType => {
    switch (action.type) {
        case "error/SET-ERROR":
            return {
                ...state,
                error: action.error
            }
        default :
            return state
    }
}


//ACTIONS
export const setError = (error : string) => ({type : 'error/SET-ERROR',error} as const)

//TYPES

export type InitialStateType = typeof initialState
export type ActionErrorType = ReturnType<typeof setError>