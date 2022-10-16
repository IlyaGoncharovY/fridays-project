import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {authReducer} from "./reducers/authReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {registrationReducer} from "./reducers/registration-Reducer";
import {loginReducer} from "./reducers/loginReducer";

export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
// export type AppDispatch = any

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState, unknown, AnyAction>


const rootReducer = combineReducers({
    registration: registrationReducer,
    // profileReducer,
    auth : authReducer,
    login : loginReducer

})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

