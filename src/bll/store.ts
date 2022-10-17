import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {authReducer, setAuthACType} from "./reducers/authReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {cgangeStatusRegistrationACType, registrationReducer} from "./reducers/registration-Reducer";
import {ActionLoginType, loginReducer} from "./reducers/loginReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {setUserACType} from "./reducers/profileReducer";
import {ErrorReducer} from "./reducers/ErrorReducer";

export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type allReducersType = setAuthACType | setUserACType | cgangeStatusRegistrationACType | ActionLoginType
export type AppDispatch = ThunkDispatch<RootState, unknown, allReducersType>
// export type AppDispatch = any
// export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState, unknown, allReducersType>
// export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector

const rootReducer = combineReducers({
    registration: registrationReducer,
    // profileReducer,
    auth : authReducer,
    login : loginReducer,
    error : ErrorReducer

})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

