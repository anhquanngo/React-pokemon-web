import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pikachu from '../pikachu.jpg';
import { listPokemon, getPokemon } from '../helper/api';
import { Link } from 'react-router-dom';
import { createStorePoke } from '../helper/LocalStorage';

function ListPokemon() {
    const [pokemonData, setPokemonData] = useState([])
    const [statusCatch, setStatusCatch] = useState('')
    const [checkCatch, setCheckCatch] = useState(false)
    console.log("🚀 ~ file: Home.js ~ line 8 ~ ListPokemon ~ pokemonData", pokemonData)

    const ListPokemons = async () => {
        const data = await listPokemon();
        loadPokemon(data.data.results)
        return data
    }

    const loadPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon)
            return pokemonRecord
        }))
        setPokemonData(_pokemonData);
    }

    const CatchPokemon = async (name, image, types, height, weight, ability) => {
        //radio là tỉ lên bắt trúng > 10 = 90%
        let ratio = Math.random() * 100 + 1
        if (ratio > 10) {
            setStatusCatch('Đang bắt Pokemon')
            setCheckCatch(false)
            setTimeout(async () => {
                setStatusCatch('Đã bắt được Pokemon')
                setCheckCatch(true)
                let DataPoke = {
                    name, image, types, height, weight, ability
                }
                await createStorePoke(DataPoke)
            }, 2000)
        } else {
            setCheckCatch(false)
            setStatusCatch('Đang bắt Pokemon')
            setTimeout(() => {
                setStatusCatch('Đã bắt trượt Pokemon')
                setCheckCatch(true)
            }, 2000)
        }
    }

    useEffect(() => {
        ListPokemons()
    }, [])
    return (
        <div>
            <div className="container">
                <h1>Pokedex</h1>
                <Link to={`/myBag`}>
                    <button>My Bag</button>
                </Link>
                <ul id="pokedex">
                    {pokemonData.map((poke, id) => {
                        return (
                            <li className="card" key={id}>
                                <Link to={`/detail/${poke.data.name}`}>
                                    <img className="card-image" src={poke.data.sprites.front_default} />
                                </Link>
                                <h2 className="card-title">{id}. {poke.data.name}</h2>
                                {
                                    poke.data.types.map(type => {
                                        return (
                                            <p className="card-subtitle">Type: {type.type.name}</p>
                                        )
                                    })
                                }
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"
                                    onClick={() => CatchPokemon(poke.data.name, poke.data.sprites.front_default, poke.data.types, poke.data.height, poke.data.weight, poke?.data.abilities[0].ability.name)}>
                                    Catch
                                </button>
                            </li>
                        )
                    })}
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle" style={{ color: "#000" }}>Thu phục</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body" style={{ color: "#000" }}>
                                    {statusCatch}
                                </div>
                                {checkCatch ?
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-success" data-dismiss="modal">OK</button>
                                    </div>
                                    :
                                    <div>
                                        Chờ 1 chút
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
}



export default ListPokemon;