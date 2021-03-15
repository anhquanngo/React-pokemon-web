import React, { useEffect, useState } from 'react';
import { listPoke, removePoke } from '../helper/LocalStorage';

function MyBag(props) {
    const [pokeMyBagData, setPokeMyBagData] = useState([]);

    const getAllMyBag = async () => {
        const PokeData = await listPoke();
        setPokeMyBagData(PokeData);
    };

    const RemoveOnePokemon = async (id) => {
        await removePoke(id)
    }

    useEffect(() => {
        getAllMyBag();
    }, [pokeMyBagData]);
    return (
        <>
            <div className="container">
                <h1>MyBag</h1>
                <ul id="pokedex">
                    {pokeMyBagData.map((poke, id) => {
                        return (
                            <li className="card" key={poke.id} style={{ alignItems: "center" }}>
                                <div >
                                    <img style={{ height: "180px" }} src={poke.value.image} />
                                </div>
                                <h2 className="card-title">{poke.value.name}</h2>
                                {
                                    poke.value.types.map((type, id) => {
                                        return (
                                            <p className={`card-subtitle-${type.type.name}`} key={poke.id + id}>Type: {type.type.name}</p>
                                        )
                                    })
                                }
                                <p>Weight: {poke.value.weight}</p>
                                <p>Height: {poke.value.height}</p>
                                <p>Ability: {poke.value.ability}</p>
                                <div>
                                    <button className="btn btn-info" >Chỉnh sửa</button>
                                    <button className="btn btn-danger" onClick={() => RemoveOnePokemon(poke.id)}>Thả</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}

export default MyBag;