import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { connect } from 'react-redux'

function FavPage({ characters = [0] }) {

    function renderCharacter(char, i) {
        //console.log(char)
        return (
            <Card hide 
            image={char.image}
            name={char.name}
            key={i} />
        )
    }
    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {characters.map(renderCharacter)}
            {!characters.length && <h3>No hay personajes agregados</h3>}
        </div>
    )
}

function mapToStateToProps(state) {
    //con local storage
    /*let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    console.log(state, storage.character.favorite)
    return { characters: storage.character.favorite }*/
    //Con firebase
    //console.log(character.favorite)
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    console.log(storage)
    let { array, fetching, current, error, favorite } = storage.character
    console.log(state)
    let up = {
        user: state.user,
        character: {
            array,
            fetching,
            current,
            error,
            favorite: state.character.favorite
        }
    }
    console.log(up)
    localStorage.storage = JSON.stringify(up)


    return { characters: state.character.favorite }
}

export default connect(mapToStateToProps)(FavPage)
