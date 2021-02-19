const ADD_NEW_FAVORITE = 'app/ADD_NEW_FAVORITE';

let initialState = {
    favorites: {
        books: { key: 'books', categoryName: 'Книги', dataArr: [] },
        characters: { key: 'characters', categoryName: 'Герои', dataArr: [] }, houses: { key: 'houses', name: 'Дома/Семьи', dataArr: [] }
    },
};

let editObj = (state, favData) => {
    for (let key in state.favorites) {
        if (key == favData.favType) {
            state.favorites[key].dataArr.push(favData.favVal)
        }
    }
    return state.favorites;
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_FAVORITE:
            return {
                ...state,
                favorites: editObj(state, action.favData)
            };
        default:
            return state;
    }
};

export const addNewFavorite = (favData) => {
    return {
        type: ADD_NEW_FAVORITE,
        favData
    }
};

export default appReducer;