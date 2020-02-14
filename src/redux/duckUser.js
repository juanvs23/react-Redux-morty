import firebaseLogin, { logOutGoogle } from '../firebase'
import { readFavs } from './chartUser'
//constantes
const LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_ERROR = "LOGIN_ERROR",
    LOGIN_OUT = "LOGIN_OUT",
    initialState = {
        loggeIn: false,
        fetching: false
    }


//reducer
const InitialReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN:
        return { ...state, fetching: true }
    case LOGIN_SUCCESS:
        return { ...state, loggeIn: true, fetching: false, ...action.payload }
    case LOGIN_ERROR:
        return { ...state, fetching: false, error: action.payload }
    case LOGIN_OUT:
        return { ...initialState }
    default:
        // base
        return state
    }
}
export default InitialReducer
//aux guardar en el storage
function guardaLocal(store) {
    // console.log(store)
    localStorage.storage = JSON.stringify(store)
}
//actions
//cierra sesion google
export let logOutAction = () => (dispatch, getState) => {
    //aqui cierraseccion
    logOutGoogle()
    //indica a redux cerrar sesion
    dispatch({
        type: LOGIN_OUT
    })
    //borra datos del store
    localStorage.removeItem('storage')
}
//copia el contenido del local store y lo pasa a redux
export let restoreLoginAction = () => (dispatch, getState) => {
    let session = localStorage.getItem('storage'),
        storage = JSON.parse(session)
    if (storage && storage.user) {
        //aqui hace la magia
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                id: storage.user.id,
                name: storage.user.name,
                photo: storage.user.photo,
                email: storage.user.email,
                fetching: storage.user.fetching,
                loggeIn: storage.user.loggeIn


            }

        })

    }
}
//loguea con google
export let googleLoginAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN
    })

    return firebaseLogin()
        .then(user => {
            return dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        id: user.uid,
                        name: user.displayName,
                        photo: user.photoURL,
                        email: user.email


                    }

                }),
                guardaLocal(getState()),
                readFavs()(dispatch, getState)

        })
        .catch(e => {
            console.log(e)
            return dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })
        })
}
