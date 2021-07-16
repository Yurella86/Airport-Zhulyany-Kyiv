import CHANGE from './typeAction';

export function change(array) {
    return {
        type: CHANGE,
        array
    };
};