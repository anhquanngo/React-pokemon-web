import React, { useEffect, useState } from 'react';
import { getPokemon } from '../helper/api';

function DetailPokemon(props) {
    const [poke, setPoke] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    console.log("🚀 ~ file: Detail.js ~ line 7 ~ DetailPokemon ~ poke", poke)

    const getOnePokemon = async () => {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + props.match.params.name
        let pokemonRecord = await getPokemon({ url })
        setPoke(pokemonRecord)
        setIsLoading(!isLoading)
    }
    useEffect(() => {
        getOnePokemon()
    }, [])

    return (
        <>
            {isLoading ? <div>
                <div className="container">
                    <h1>Pokedex</h1>
                    <ul id="pokedex">
                        <li className="card">
                            <div >
                                <img style={{ height: "180px" }} src={poke?.data.sprites.front_default} />
                            </div>
                            <h2 className="card-title">{props.match.params.name}</h2>
                            {
                                poke.data.types.map(type => {
                                    return (
                                        <p className="card-subtitle">Type: {type.type.name}</p>
                                    )
                                })
                            }
                            <p>Weight: {poke?.data.weight}</p>
                            <p>Height: {poke?.data.height}</p>
                            <p>Ability: {poke?.data.abilities[0].ability.name}</p>
                        </li>
                    </ul>
                </div>
            </div>
                :
                <div>Loading...</div>
            }
        </>

    );
}

export default DetailPokemon;