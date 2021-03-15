import { FILTER_POKEMON_SUCCESS, GET_LIST_POKEMON_SUCCESS, LIST_POKEMON } from '../../constants/Pokemon';

export default function Pokemon(state = {}, action) {
    switch (action.type) {
        case LIST_POKEMON:
            return { ...state }
        case GET_LIST_POKEMON_SUCCESS:
            return { ...state, listPokemon: action.payload }
        case FILTER_POKEMON_SUCCESS: {
            const { data } = action.payload
            return { ...state, listPokemon: data }
        }
        default:
            return state
    }
}