import { appAPI, charactersAPI } from "../api/api";

const SET_CHARACTERS = 'characters/SET_CHARACTERS';
const SET_CHRACTER_DETAILS = 'characters/SET_CHRACTER_DETAILS';
const TOGGLE_IS_FETCHING = 'characters/TOGGLE_IS_FETCHING';

let initialState = {
    isFetching: false,
    characters: [],
    characterDetails: [],
};

const charactersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHARACTERS:
            return {
                ...state,
                characters: action.characters,
            };
        case SET_CHRACTER_DETAILS:
            return {
                ...state,
                characterDetails: action.characterDetails,
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        default:
            return state;
    }
};

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
};

const setCharactersData = (characters) => {
    return {
        type: SET_CHARACTERS,
        characters
    }
};

export const getCharactersData = (currentPage, pageSize) => async (dispatch) => {
    toggleIsFetching(true)
    let response = await charactersAPI.getCharacters(currentPage, pageSize);
    if (response.length != 0) {
        dispatch(setCharactersData(response))
        dispatch(toggleIsFetching(false))
    }
};

const setBookDetailsData = (characterDetails) => {
    return {
        type: SET_CHRACTER_DETAILS,
        characterDetails
    }
};

export const getCharacterDetailsData = (characterId) => async (dispatch) => {
    let response = await charactersAPI.getCharacterById(characterId);
    if (response.length != 0) {
        let respBooks = await appAPI.getNames(response.books);
        let respHouses = await appAPI.getNames(response.allegiances);
        let respPovBooks = await appAPI.getNames(response.povBooks);
        response.books = respBooks
        response.allegiances = respHouses
        response.povBooks = respPovBooks
        dispatch(setBookDetailsData(response))
        dispatch(toggleIsFetching(false))
    }
};

//Фильтрация

export const getFilteredCharactersData = (characterName, gender) => async (dispatch) => {
    let response = await charactersAPI.getFilteredCharacters(characterName, gender);
    dispatch(setCharactersData(response))
};

export default charactersReducer;