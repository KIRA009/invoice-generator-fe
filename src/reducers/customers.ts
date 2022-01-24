import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState, Store } from "../store";
import { Customer } from "../types/customer";

type initialState = Customer[];

const customers = createSlice({
    name: 'customers',
    initialState: [],
    reducers: {
        addCustomer: (state: initialState, action: PayloadAction<Customer>) => {
            state.push(action.payload);
        },
        editCustomer: (state: initialState, action: PayloadAction<Customer>) => {
            let customer = state.find(customer => customer.id === action.payload.id);
            customer = {...action.payload};
        }
    }
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


export const getCustomers = (state: RootState) => state.customers;
