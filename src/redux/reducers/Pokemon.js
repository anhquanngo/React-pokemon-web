import { LIST_POKEMON } from '../../constants/Pokemon';

export default function Pokemon(state = {}, action) {
    switch (action.type) {
        case LIST_POKEMON:
            return { ...state, listPokemon: action.payload }
        default:
            return state
    }
}