import { fork, take, call, put, delay, takeLatest, select } from 'redux-saga/effects';
import * as PokemonTypes from '../../constants/Pokemon';
import { listPokemon } from '../../helper/api';
import { STATUS_CODE } from '../../constants/';
import { showLoading, hideLoading } from '../action/ui.action';
import { filterTaskSuccess } from '../action/Pokemon.action';

/**
*   B1: Thuc thi action axios pokemon
*   B2: Goi API
*   B3: Kiem tra status code
*   neu Thanh cong...
*   neu that bai...
*   B4: Tat loading
*   B5: Thuc thi cong viec tiep theo
*/
function* watchAxiosListPokemon() {
    while (true) {
        yield take(PokemonTypes.LIST_POKEMON)
        yield put(showLoading())
        const resp = yield call(listPokemon)
        const { status, data } = resp
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: PokemonTypes.GET_LIST_POKEMON_SUCCESS,
                payload: { data }
            })
        } else {
            yield put({
                type: PokemonTypes.GET_LIST_POKEMON_FAIL,
            })
        }
        yield delay(800)
        yield put(hideLoading())
    }
}

function* filterPokemonsaga({ payload }) {
    yield delay(1000);
    const { keyword } = payload;
    const list = yield select(state => state.pokemon.listPokemon)
    const { data } = list
    const filterPoke = data.results.filter(
        poke => poke.name
            .trim()
            .toLowerCase()
            .includes(keyword.trim().toLowerCase()))
    yield put(filterTaskSuccess({ data: { results: filterPoke } }))
}

export default function* rootSaga() {
    yield fork(watchAxiosListPokemon)
    yield takeLatest(PokemonTypes.FILTER_POKEMON, filterPokemonsaga)
}
