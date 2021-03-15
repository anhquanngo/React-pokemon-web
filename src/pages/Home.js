import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pikachu from '../pikachu.jpg';
import { listPokemon, getPokemon } from '../helper/api';
import { Link } from 'react-router-dom';
import { createStorePoke } from '../helper/LocalStorage';
import { getListPokemon } from '../redux/action/Pokemon.action';
import GloballLoading from '../components/GloballLoading';
import bagImage from '../assets/images/3865.png';
import { filterPokemon } from '../redux/action/Pokemon.action';

function Home() {
    const [pokemonData, setPokemonData] = useState([])
    const [statusCatch, setStatusCatch] = useState('')
    const [checkCatch, setCheckCatch] = useState(false)
    const dispatch = useDispatch()

    const data = useSelector((state) => state.pokemon.listPokemon)

    useEffect(() => {
        dispatch(getListPokemon())
    }, [])

    useEffect(() => {
        ListPokemons(data)
    }, [data])

    const ListPokemons = async (data) => {
        loadPokemon(data?.data.results)
        return data
    }

    const loadPokemon = async (data) => {
        if (data) {
            let _pokemonData = await Promise.all(data.map(async pokemon => {
                let pokemonRecord = await getPokemon(pokemon)
                return pokemonRecord
            }))
            setPokemonData(_pokemonData);
        }
    }

    const randomRadio = () => {
        return Math.floor(Math.random() * 100 + 1)
    }

    const CatchPokemon = async (name, image, types, height, weight, ability) => {
        //radio là tỉ lên bắt trúng > 10 = 90%
        let ratio = Math.random() * 100 + 1
        if (ratio > randomRadio()) {
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

    const searchPokemon = (e) => {
        const value = e.target.value
        if (value !== '') {
            dispatch(filterPokemon(value))
        }
        dispatch(getListPokemon())
    }

    return (
        <div>
            <GloballLoading />
            <div className="container">
                <h1>Pokedex</h1>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link to={`/myBag`}>
                        <img style={{ width: '100px', margin: 5 }} atr="bag" src={bagImage} />
                    </Link>
                    <input onChange={(e) => searchPokemon(e)} style={{ height: '35px', width: '240px' }} placeholder="Tìm kiếm" />
                </div>
                <ul id="pokedex">
                    {pokemonData.map((poke, id) => {
                        return (
                            <li className="card" key={poke.data.id} style={{ alignItems: "center" }}>
                                <Link to={`/detail/${poke.data.name}`}>
                                    <img className="card-image" src={poke.data.sprites.front_default} />
                                </Link>
                                <h2 className="card-title">{poke.data.id}. {poke.data.name}</h2>
                                {
                                    poke.data.types.map((type, id) => {
                                        return (
                                            <p className={`card-subtitle-${type.type.name}`} key={id}>Type: {type.type.name}</p>
                                        )
                                    })
                                }
                                <p className="card-title-radio" >Tỷ lệ bắt thành công : {randomRadio()}</p>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"
                                    onClick={() => CatchPokemon(poke.data.name, poke.data.sprites.front_default, poke.data.types, poke.data.height, poke.data.weight, poke?.data.abilities[0].ability.name)}>
                                    Catch
                                </button>
                            </li>
                        )
                    })}
                    <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle" style={{ color: "#000" }}>Thu phục</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body" style={{ color: "#000" }}>
                                    {statusCatch}
                                </div>
                                {checkCatch ?
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" data-dismiss="modal">OK</button>
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



export default Home;