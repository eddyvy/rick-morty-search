import React, { useContext } from 'react'
import { CharactersContext } from '../RickMortyApp'

export const SearchBar = ({ setCharsFiltered }) => {

    const characters = useContext(CharactersContext)

    const findCharsMatching = (str) => {
        const strWanted = str.trim().toLowerCase()
        
        const charsMatching = characters.filter( character => {
            const char = character.data

            const charValues = Object.values(char).map( value => value.toString().trim().toLowerCase() )
            for (let i = 0; i < 6; i++) {
                charValues.pop()
            }
            charValues.push(char.location.name.trim().toLowerCase())
            charValues.push(char.origin.name.trim().toLowerCase())

            if (charValues.find( value => value.includes(strWanted))) {
                return char
            }

            return null

        } )

        setCharsFiltered( charsMatching )

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const searchingStr = e.target[0].value

        findCharsMatching(searchingStr)
    }

    return (
        <form
            className="input-group m-3 mt-5"
            style={{ minWidth: '300px', width: '70vw' }}
            onSubmit={ handleSubmit }
        >
            <input type="text" className="form-control" placeholder="Search anything" aria-label="Search anything" aria-describedby="button-addon2"/>
            <button className="btn btn-primary me-3" type="submit" id="button-addon2">Search</button>
        </form>  
    )
}
