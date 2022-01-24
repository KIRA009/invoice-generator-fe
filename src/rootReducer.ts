import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-cycle
import customerReducer from './reducers/customers';

export const createRootReducer = () => {
    return combineReducers({
        customers: customerReducer,
    });
};
