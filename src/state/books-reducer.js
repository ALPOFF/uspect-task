import { appAPI, booksAPI } from "../api/api";

const SET_BOOKS = 'books/SET_BOOKS';
const SET_BOOK_DETAILS = 'books/SET_BOOK_DETAILS';
const TOGGLE_IS_FETCHING = 'books/TOGGLE_IS_FETCHING';

let initialState = {
    isFetching: false,
    books: [],
    bookDetails: [],
};

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKS:
            return {
                ...state,
                books: action.books,
            };
        case SET_BOOK_DETAILS:
            return {
                ...state,
                bookDetails: action.bookDetails
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

//set books data
const setBooksData = (books) => {
    return {
        type: SET_BOOKS,
        books
    }
};

export const getBooksData = (currentPage, pageSize) => async (dispatch) => {

    let response = await booksAPI.getBooks(currentPage, pageSize);
    if (response.length != 0) {
        dispatch(setBooksData(response))
        dispatch(toggleIsFetching(false))
    }
};

//set book descr data
const setBookDetailsData = (bookDetails) => {
    return {
        type: SET_BOOK_DETAILS,
        bookDetails
    }
};

export const getBookDetailsData = (bookId) => async (dispatch) => {
    let response = await booksAPI.getBookById(bookId);
    if (response.length != 0) {
        let charactersData = await appAPI.getNames(response.characters)
        response.characters = charactersData
        let povCharactersData = await appAPI.getNames(response.povCharacters)
        response.povCharacters = povCharactersData
        dispatch(setBookDetailsData(response))
        dispatch(toggleIsFetching(false))
    }
};

//Фильтрация

export const getFilteredBooksData = (bookName, fromReleaseDate, toReleaseDate) => async (dispatch) => {
    let response = await booksAPI.getFilteredBooks(bookName, fromReleaseDate, toReleaseDate);
    dispatch(setBooksData(response))
};

export default booksReducer;