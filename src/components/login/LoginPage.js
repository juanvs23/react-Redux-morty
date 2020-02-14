import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { googleLoginAction, logOutAction } from '../../redux/duckUser'

function LoginPage({ name, loggeIn, googleLoginAction, logOutAction }) {

    //console.log(logOutAction)

    function login() {
        googleLoginAction()
    }

    function logOut() {
        logOutAction()
    }

    function googleCondicion() {
        // body...
        if (loggeIn) {
            return (
                <div className={styles.container}>
            
            <h1>
                Cierra tu sesión
            </h1>
            <h2 style={{textAlign:'center'}}>{name}</h2>
            <button onClick={logOut}>
                Cerrar Sesión
            </button>
        </div>
            )
        }
        else {

            return (
                <div className={styles.container}>
            <h1>
                Inicia Sesión con Google
            </h1>
            <button onClick={login}>
                Iniciar
            </button>
           
           
        </div>
            )
        }
    }
    return googleCondicion()

}



function mapStateToProps({ user }) {
    // console.log(user)
    return user
}
export default connect(mapStateToProps, { googleLoginAction, logOutAction })(LoginPage)
