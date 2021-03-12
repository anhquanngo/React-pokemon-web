import { createStore, combineReducers, applyMiddleware } from 'redux';
import PokemonReducer from './reducers/Pokemon';
// import createSagaMiddleware from 'redux-saga'
// import rootSaga from './saga';

// const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
    Pokemon: PokemonReducer,
})

const store = createStore(rootReducer,
    // applyMiddleware(sagaMiddleware)
)
// sagaMiddleware.run(rootSaga) 

export default store;