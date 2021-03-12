import { all } from 'redux-saga/effects';
import {
    getListPokemon_ActionWatcher
} from './PokemonSaga';


export default function* rootSaga() {
    yield all([
        getListPokemon_ActionWatcher()
    ]);
}
