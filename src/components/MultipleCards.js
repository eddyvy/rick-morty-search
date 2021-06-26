import React, { useState } from 'react'

import { Card } from './Card'
import { Loading } from './Loading'


export const MultipleCards = ({ charsFiltered }) => {

    const interval = 25
    const [charsWanted, setCharsWanted] = useState(interval)
    const characters = charsFiltered

    const handleClick = () => {
        setCharsWanted( charsWanted + interval )
    }

    return (
        <>
            <div className="d-flex flex-wrap justify-content-center m-3 mb-5">
                {
                    ( !characters ) && <Loading />
                }
                {
                    ( characters )
                    &&(
                        ( characters.length === 0 ) && <h3 className="mt-5">Could not find any match :(</h3>
                    )
                }
                { 
                    ( characters )
                    &&(
                        ( characters.length > 0 )
                        && (
                            characters.map( (char, index) => ( (index < charsWanted) && ( <Card key={ char.data.id } id={ char.data.id } /> ) ))
                        )
                    )
                }
            </div>
            { 
                ( characters )
                &&(
                    ( characters.length > 0 )
                    && (
                        <button
                            type="button"
                            className="btn btn-primary mb-5"
                            onClick={ handleClick }
                        >
                            Load { interval } more
                        </button>
                    )
                )
            }
        </>
    )
}
