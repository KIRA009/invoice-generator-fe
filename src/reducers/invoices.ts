import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { Invoice } from "../types/invoice";

type initialState = Invoice[];

const invoices = createSlice({
    name: 'invoices',
    initialState: [],
    reducers: {
        addInvoice: (state: initialState, action: PayloadAction<Invoice>) => {
            state.push(action.payload);
        },
        editInvoice: (state: initialState, action: PayloadAction<Invoice>) => {
            let invoice = state.find(
                (invoice) => invoice.id === action.payload.id
            );
            invoice = { ...action.payload };
        },
    },
});

export default invoices.reducer;

export const addInvoice =
    (payload: Invoice): AppThunk =>
    async (dispatch) => {
        const id = new Date().getTime().toString();
        dispatch(
            invoices.actions.addInvoice({
                ...payload,
                id,
            })
        );
    };

export const editInvoice =
    (payload: Invoice): AppThunk =>
    (dispatch) => {
        dispatch(
            invoices.actions.editInvoice({
                ...payload,
            })
        );
    };

export const getInvoices = (state: RootState) => state.invoices;
