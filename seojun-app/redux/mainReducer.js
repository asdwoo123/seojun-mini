import {createAction, handleActions} from 'redux-actions';


const cycleTime = 'cycleTime';
const c_total = 'c_total';
const sPartnumber = 'sPartnumber';
const image_uri = 'image_uri';
export const getCycleTime = createAction(cycleTime);
export const getC_total = createAction(c_total);
export const getsPartnumber = createAction(sPartnumber);
export const getImage_uri = createAction(image_uri);

const initialState = {
    cycleTime: 0,
    c_total: 0,
    sPartnumber: '###',
    image_uri: null
};

export default handleActions({
    [cycleTime]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            cycleTime: data
        }
    },
    [c_total]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            c_total: data
        }
    },
    [sPartnumber]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            sPartnumber: data
        }
    },
    [image_uri]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            image_uri: data
        }
    }
}, initialState);
