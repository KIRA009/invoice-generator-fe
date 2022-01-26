import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { Customer } from "../types/customer";

type initialState = Customer[];

const getReducers = () => {
    const addCustomer: CaseReducer<initialState, PayloadAction<Customer>> = (state, action) => {
        state.push(action.payload);
    }
    const editCustomer: CaseReducer<initialState, PayloadAction<Customer>> = (state, action) => {
        let customer = state.find(customer => customer.id === action.payload.id);
        customer = {...action.payload};
    }
    return {
        addCustomer, editCustomer
    }
}

const customers = createSlice({
    name: 'customers',
    initialState: [] as initialState,
    reducers: getReducers()
})

export default customers.reducer;


export const addCustomer = (payload: Customer): AppThunk => async (dispatch) => {
    const id = (new Date()).getTime().toString();
    dispatch(customers.actions.addCustomer({
        ...payload,
        id
    }))
}


export const editCustomer = (payload: Customer): AppThunk => (dispatch) => {
    dispatch(customers.actions.editCustomer({
        ...payload
    }))
}


export const getCustomers = (state: RootState): Customer[] => state.customers;
export const getCustomer = (id: string) => (state: RootState): Customer => {
    const customer = state.customers.find(customer => customer.id === id);
    return customer || {
        id: '',
        name: '',
        address: '',
        currency: ''
    };
}
