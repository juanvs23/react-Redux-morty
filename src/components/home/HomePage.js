import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removetCharacterAction, addFavoriteAction } from '../../redux/chartUser'

//let URL = "https://rickandmortyapi.com/api"

function Home({ char, removetCharacterAction, addFavoriteAction }) {






    function renderCharacter() {
        console.log(addFavoriteAction)
        char = char.array[0]
        return (
            <Card leftClick={nextCharacter} rightClick={addFavoriteAction} {...char}/>
        )
    }

    function nextCharacter() {
        removetCharacterAction()
    }



    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

function mapStateToProps(store) {
    return {
        char: store.character

    }
}
export default connect(mapStateToProps, { removetCharacterAction, addFavoriteAction })(Home)
