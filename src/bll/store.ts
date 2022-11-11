import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {appReducer, AppActionType} from "./reducers/appReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {ProfileActionType, profileReducer} from "./reducers/profileReducer";
import {RegistrationActionType, regReducer} from "./reducers/regReducer";
import {LoginActionType, authReducer} from "./reducers/authReducer";
import {RecoveryPasswordActionType,
    recoveryReducer
} from "./reducers/recoveryPasswordReducer";
import {PacksActionType, packsReducer} from "./reducers/packsReducer";
import {CardActionType, cardsReducer} from "./reducers/cardsReducer";
import {LearnActionsType, learnReducer} from "./reducers/learnReducer";

export type RootState = ReturnType<typeof store.getState>
export type RootActionType =
    | AppActionType
    | ProfileActionType
    | RegistrationActionType
    | LoginActionType
    | RecoveryPasswordActionType
    | PacksActionType
    | CardActionType
    | LearnActionsType
export type AppDispatch = ThunkDispatch<RootState, unknown, RootActionType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootActionType>

const rootReducer = combineReducers({
    registration: regReducer,
    profile: profileReducer,
    auth : appReducer,
    login : authReducer,
    recovery : recoveryReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn : learnReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

