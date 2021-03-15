import { createStore, combineReducers, applyMiddleware } from 'redux';
import PokemonReducer from './reducers/Pokemon';
import UiReducer from './reducers/ui';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
    pokemon: PokemonReducer,
    ui: UiReducer,
})

const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware),
    ),
)
sagaMiddleware.run(rootSaga)

export default store;