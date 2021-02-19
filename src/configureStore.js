import { applyMiddleware, combineReducers, createStore } from "redux";
import booksReducer from "./state/books-reducer";
import familiesReducer from "./state/family-reducer";
import appReducer from "./state/app-reducer";
import charactersReducer from "./state/characters-reducer";
import thunkMiddleware from "redux-thunk" //import thunkmiddleware

let reducers = combineReducers({
    booksPage: booksReducer,
    charactersPage: charactersReducer,
    familyPage: familiesReducer,
    appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware)); //second param - middlw for thunk

//window.store = store;

export default store;