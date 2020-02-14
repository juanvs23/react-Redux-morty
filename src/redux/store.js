import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import InitialReducer, { restoreLoginAction } from './duckUser'
import ChartUser, { getCharacterAction } from './chartUser'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    user: InitialReducer,
    character: ChartUser
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const generateStore = () => {
    let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    getCharacterAction()(store.dispatch, store.getState)
    restoreLoginAction()(store.dispatch)
    return store
}
export default generateStore
