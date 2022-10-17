const initialState = {
    isAuth: false,

}

type initialStateType = typeof initialState
type AuthReducerType = setAuthACType


export const authReducer = (state:initialStateType = initialState, action:AuthReducerType):initialStateType=> {
    switch (action.type) {
        case "AUTH": {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        default:
            return state
    }
}

//AC
export type setAuthACType = ReturnType<typeof setAuthAC>
export const setAuthAC = (isAuth:boolean) => {
  return {
      type: "AUTH",
      isAuth
  } as const
}