import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import socketReducer from './socketReducer';
import mainReducer from './mainReducer';
import cctvReducer from './cctvReducer';

const rootReducer = combineReducers({
    opc: socketReducer,
    main: mainReducer,
    cctv: cctvReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(thunk)
);



