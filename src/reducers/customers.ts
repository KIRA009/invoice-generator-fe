import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { Customer } from "../types/customer";

interface initialState {
    customers: Customer[]
}

const customers = createSlice({
    name: 'customers',
    initialState: {
        customers: []
    },
    reducers: {
        addCustomer: (state: initialState, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
        },
        editCustomer: (state: initialState, action: PayloadAction<Customer>) => {
            let customer = state.customers.find(customer => customer.id === action.payload.id);
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
