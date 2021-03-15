import { LIST_POKEMON, FILTER_POKEMON, FILTER_POKEMON_SUCCESS } from "../../constants/Pokemon";

export const getListPokemon = () => ({
    type: LIST_POKEMON,
});

export const filterPokemon = (keyword) => ({
    type: FILTER_POKEMON,
    payload: { keyword }
})

export const filterTaskSuccess = data => ({
    type: FILTER_POKEMON_SUCCESS,
    payload: {
        data,
    }
})