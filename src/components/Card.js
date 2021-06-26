import React, { useContext } from 'react'

import { CharactersContext } from '../RickMortyApp'


export const Card = ({ id }) => {

    const characters = useContext(CharactersContext)
    
    const character = characters[ id - 1 ].data
    
    const {
        gender,
        image,
        location,
        name,
        origin,
        species,
        status,
        type
    } = character

    return (
        <div className="card m-5" style={{ width: '18rem' }}>
            <img src={ image } className="card-img-top" alt={ name }/>
            <div className="card-body">
                <h5 className="card-title"><b>{ name }</b></h5>
                <div className="container">
                    <div className="row">
                        <div className="col-6">

                            {
                                ( status === 'Alive' )  && (<img style={{width: '20px'}} src="https://support.lasers.leica-geosystems.com/lino/p5/es/Content/Resources/Images/led_blinksgreen.gif" alt="green dot" />)
                            }
                            {
                                ( status === 'Dead' )   && (<img style={{width: '20px'}} src="https://i.pinimg.com/originals/93/6b/3a/936b3a9a817fed848e7025c0430cbb10.gif" alt="green dot" />)
                            }
                            {
                                ( status === 'unknow' ) && (<img style={{width: '20px'}} src="https://www.fionanormanphotography.com/wp-content/uploads/2018/01/fiona-norman-LOGO-GREY-dot.jpg" alt="green dot" />)
                            }
                            <span className="card-text"><b>{ status }</b></span>
                        </div>
                        <div className="col-6">
                            <span className="card-text"><b>{ gender }</b></span>
                        </div>
                    </div>
                    <div className="row">
                        <span className="card-text">Origin: <b>{ origin.name }</b></span>
                    </div>
                    <div className="row">
                        <span className="card-text">Location: <b>{ location.name }</b></span>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <span className="card-text"><b>{ species }</b></span>
                        </div>
                        <div className="col-6">
                            <span className="card-text"><b>{ type }</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
