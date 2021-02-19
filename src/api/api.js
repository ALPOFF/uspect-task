import * as axios from "axios";

const instance = axios.create({
    'Access-Control-Allow-Credentials': true,
    baseURL: 'https://anapioficeandfire.com/api/'
});

export const booksAPI = {
    getBooks(currentPage, pageSize) {
        return instance.get(`books?page=${currentPage}&pageSize=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    getBookById(bookId) {
        return instance.get(`books/${bookId}`)
            .then(response => {
                return response.data
            })
    },

    //фильтрация
    getFilteredBooks(bookName, fromReleaseDate, toReleaseDate) {
        return instance.get(`books/?fromReleaseDate=${fromReleaseDate}&toReleaseDate=${toReleaseDate}&name=${bookName}`)
            .then(response => {
                return response.data
            })
    }
}

export const charactersAPI = {
    getCharacters(currentPage = 1, pageSize = 10) {
        return instance.get(`characters?page=${currentPage}&pageSize=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    getCharacterById(characterId) {
        return instance.get(`characters/${characterId}`)
            .then(response => {
                return response.data
            })
    },

    //фильтрация
    getFilteredCharacters(characterName, gender) {
        return instance.get(`characters/?gender=${gender}&name=${characterName}`)
            .then(response => {
                return response.data
            })
    },

    getCharactersGif(characterName) {
        return axios.get(`https://api.giphy.com/v1/gifs/search?api_key=twf9O7mMvbaMMyNGSoGpEKYQBQKKJaWM&q=${characterName}`, { withCredentials: true })
            .then(response => {
                return response.data
            })
    }
}

export const familiesAPI = {
    getFamilies(currentPage = 1, pageSize = 10) {
        return instance.get(`houses/?page=${currentPage}&pageSize=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    getFamilyById(houseId) {
        return instance.get(`houses/${houseId}`)
            .then(response => {
                return response.data
            })
    },

    //фильтрация
    getFilteredFamilies(familyName) {
        return instance.get(`houses/?name=${familyName}`)
            .then(response => {
                return response.data
            })
    },
}

export const appAPI = {
    getNames(urls, current = 0) {
        let urlsx = urls.slice(current, current + 10)
        return axios.all(urlsx.map(el => axios.get(el))).then(axios.spread((...responseT) => {
            let newResponse = responseT.map(el => { return { data: el.data } })
            return newResponse
        })).then((newResponse) => { return newResponse })
    }
}

