import { createStore } from 'redux';

function todosReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_TODO:

            const newState = { ...state };
            newState.todos = [...newState.todos, action.data];
            newState.count = newState.count + 1;
            return newState;

        case REMOVE_TODO:

            const copyState = { ...state };
            copyState.todos = copyState.todos.filter(item => item.id !== action.id);
            copyState.count = copyState.count - 1;

            return copyState;

        default:
            return state;
    }
}




const store = createStore()