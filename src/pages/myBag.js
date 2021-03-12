import React, { useEffect, useState } from 'react';
import { listPoke } from '../helper/LocalStorage';

function MyBag(props) {
    const [pokeMyBagData, setPokeMyBagData] = useState([]);

    const getAllMyBag = async () => {
        const PokeData = await listPoke();
        setPokeMyBagData(PokeData);
    };

    useEffect(() => {
        getAllMyBag();
    }, []);
    return (
        <>
            <div className="container">
                <h1>MyBag</h1>
                <ul id="pokedex">
                    {pokeMyBagData.map((poke, id) => {
                        return (
                            <li className="card">
                                <div >
                                    <img style={{ height: "180px" }} src={poke.value.image} />
                                </div>
                                <h2 className="card-title">{poke.value.name}</h2>
                                {
                                    poke.value.types.map(type => {
                                        return (
                                            <p className="card-subtitle">Type: {type.type.name}</p>
                                        )
                                    })
                                }
                                <p>Weight: {poke.value.weight}</p>
                                <p>Height: {poke.value.height}</p>
                                <p>Ability: {poke.value.ability}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}

export default MyBag;