import { createStore } from 'redux';
import CHANGE from './typeAction';


const initialState = {
    direction: []
};

function itemsReducer(state = initialState, action) {
    switch (action.type) {

        case CHANGE:
            const newState = { ...state };
            newState.direction = action.array
            return newState;

        default:
            return state;
    }
}

console.log(initialState);

const store = createStore(
    itemsReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;