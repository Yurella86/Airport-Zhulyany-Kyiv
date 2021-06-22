import { createStore } from 'redux';
const CHANGE = 'CHANGE';

const store = createStore(Reducer);

const initialState = {
    direction: []
};

export function change(array) {
    return {
        type: CHANGE,
        array
    };
}


function Reducer(state = initialState, action) {
    switch (action.type) {

        case CHANGE:
            const newState = { state };
            newState.direction = [newState.direction, action.array];
            return newState;

        default:
            return state;
    }
}


export default store;