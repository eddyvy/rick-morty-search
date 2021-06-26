import React, { useEffect, useState } from 'react'

import { SearchBar } from './components/SearchBar'
import { MultipleCards } from './components/MultipleCards'
import { getAllCharacters } from './helper/getAllCharacters'

export const CharactersContext = React.createContext()

export const RickMortyApp = () => {

    const [characters, setCharacters] = useState(null)
    const [charsFiltered, setCharsFiltered] = useState(null)

    useEffect(() => {
        const getCharacters = async() => {
            const characters = await getAllCharacters()
            setCharacters( characters )
        }
        getCharacters()
    }, [setCharacters])

    useEffect(() => {
        setCharsFiltered(characters)
    }, [setCharsFiltered, characters])

    return (
        <CharactersContext.Provider value={ characters } >
            <main className="d-flex flex-column align-items-center pb-5" >
                <SearchBar setCharsFiltered={ setCharsFiltered }  />
                <MultipleCards charsFiltered={ charsFiltered } />
            </main>
        </CharactersContext.Provider>
    )
}
