import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {AuthActionType, authReducer} from "./reducers/authReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {ProfileActionType, profileReducer} from "./reducers/profileReducer";
import {RegistrationActionType, regReducer} from "./reducers/regReducer";
import {LoginActionType, loginReducer} from "./reducers/loginReducer";
import {RecoveryPasswordActionType,
    recoveryReducer
} from "./reducers/recoveryPasswordReducer";
import {PacksActionType, packsReducer} from "./reducers/packsReducer";
import {CardActionType, cardsReducer} from "./reducers/cardsReducer";
import {LearnActionsType, learnReducer} from "./reducers/learnReducer";

export type RootState = ReturnType<typeof store.getState>
export type AppActionType =
    | AuthActionType
    | ProfileActionType
    | RegistrationActionType
    | LoginActionType
    | RecoveryPasswordActionType
    | PacksActionType
    | CardActionType
    | LearnActionsType
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>

const rootReducer = combineReducers({
    registration: regReducer,
    profile: profileReducer,
    auth : authReducer,
    login : loginReducer,
    recovery : recoveryReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn : learnReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

