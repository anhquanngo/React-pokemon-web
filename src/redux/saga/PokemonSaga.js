import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { LIST_POKEMON } from '../../constants/Pokemon';
import { listPokemon } from '../../helper/api'

function* getListPokemon() {
  let res = yield listPokemon();
  yield put({ type: LIST_POKEMON, data: res.data });
}

export function* getListPokemon_ActionWatcher() {
  yield takeEvery(LIST_POKEMON, getListPokemon);
}