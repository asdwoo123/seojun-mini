import { createAction, handleActions } from 'redux-actions';

const cctv = 'cctv';
export const setCctv = createAction(cctv);

const initialState = {
  cctv: null
};

export default handleActions({
    [cctv]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            cctv: data
        }
    }
}, initialState);