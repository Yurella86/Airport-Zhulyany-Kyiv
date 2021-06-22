import { createStore } from 'redux';
const CHANGE = 'CHANGE';

export function change(array) {
    return {
        type: CHANGE,
        array
    };
};

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

const store = createStore(itemsReducer);

export default store;