import { upDateDB, getDateFirestore } from '../firebase'

import axios from 'axios'
//constante
const initialChart = {
    fetching: false,
    array: [],
    current: {},
    error: '',
    favorite: []
}

let URL = "https://rickandmortyapi.com/api/character",
    GET_CHARACTERS = "GET_CHARACTERS",
    GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS',
    GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR',
    REMOVE_CHARACTERS = 'REMOVE_CHARACTERS',
    ADD_FAVORITE = 'ADD_FAVORITE',
    GET_FAVS = 'GET_FAVS',
    GET_FAVS_SUCCESS = 'GET_FAVS_SUCCESS',
    GET_FAVS_ERROR = 'GET_FAVS_ERROR'


//reducer
export default function ChartUser(state = initialChart, action) {
    switch (action.type) {
    case ADD_FAVORITE:
        return { ...state,
            ...action.payload
        }
    case REMOVE_CHARACTERS:
        return { ...state,
            array: action.payload
        }
    case GET_CHARACTERS:
        return { ...state,
            fetching: true
        }
    case GET_CHARACTERS_SUCCESS:
        return {
            ...state,
            array: action.payload,
            fetching: false
        }

    case GET_CHARACTERS_ERROR:
        return {
            ...state,
            error: action.payload,
            fetching: false
        }
        //favoritos
    case GET_FAVS:
        return { ...state,
            fetching: true
        }
    case GET_FAVS_SUCCESS:
        return {
            ...state,
            favorite: action.payload,
            fetching: false
        }

    case GET_FAVS_ERROR:
        return {
            ...state,
            error: action.payload,
            fetching: false
        }

    default:
        // code
        return state
    }
}

//actions
export let readFavs = () => (dispatch, getState) => {
    dispatch({
        type: GET_FAVS
    })

    let { id } = getState().user;
    return getDateFirestore(id)
        .then(array => {
            // console.log(array.favoritos)
            dispatch({
                type: GET_FAVS_SUCCESS,
                payload: [...array.favoritos]
            })

        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: GET_FAVS_ERROR
            })
        })
}
export let addFavoriteAction = () => (dispatch, getState) => {
    let { array, favorite } = getState().character, { id } = getState().user,
        favoriteCharacter = array.shift()
    favorite.push(favoriteCharacter)
    console.log(favoriteCharacter, favorite, id, )
    upDateDB(favorite, id)
    dispatch({
        type: ADD_FAVORITE,
        payload: { array: [...array], favorite: [...favorite] } //debido a la inmutabilidad siempre quee envies algo nuevo reconstruyelo
    })
    let session = localStorage.getItem('storage'),
        storage = JSON.parse(session)
    storage = { user: storage.user, character: { fetching: true, current: {}, favorite: [...favorite], array: [...array] } }
    //console.log(storage)
    localStorage.storage = JSON.stringify(storage)


}
export let removetCharacterAction = () => (dispatch, getState) => {
    let { array } = getState().character
    array.shift()

    dispatch({
        type: GET_CHARACTERS, //define el tipo para que el reducer identifique la accion
        payload: [...array]
    })

}

export let getCharacterAction = () => (dispatch, getState) => {
    dispatch({
        type: GET_CHARACTERS
    })
    return axios.get(URL)
        .then(resp => {
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: resp.data.results
            })
            //console.log(getState().character)
        })
        .catch(err => {
            console.log(err.message)
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: err.message
            })

        })

}
