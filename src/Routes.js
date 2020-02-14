import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/HomePage'
import FavPage from './components/favs/FavPage'
import LoginPage from './components/login/LoginPage'

//este es una manera rapida de crear redirecctionamientos en base a local store
function ToLogin({ path, component, ...rest }) {
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    //console.log(storage)

    if (storage && storage.user) {
        return <Route path={path} component={component}{...rest}/>

    }
    else {
        return <Redirect to='/login' component={LoginPage}/>
    }

}


export default function Routes() {

    return (
        <Switch>
            <ToLogin exact path="/" component={Home} />
            <ToLogin path="/favs" component={FavPage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    )
}
