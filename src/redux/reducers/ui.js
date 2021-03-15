import * as types from '../../constants/ui';

const ininState = {
    showLoading: false
}

const reducer = (state = ininState, action) => {
    switch (action.type) {
        case types.SHOW_LOADING: {
            return { ...state, showLoading: true }
        }
        case types.HIDE_LOADING: {
            return { ...state, showLoading: false }
        }
        default:
            return state;
    }
}

export default reducer