import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { Invoice } from '../types/invoice';

type initialState = Invoice[];

const invoices = createSlice({
    name: 'invoices',
    initialState: [],
    reducers: {
        addInvoice: (state: initialState, action: PayloadAction<Invoice>) => {
            state.push(action.payload);
        },
        editInvoice: (state: initialState, action: PayloadAction<Invoice>) => {
            let invoiceIndex = -1;
            state.forEach((invoice, index) => {
                if (invoiceIndex !== -1) return;
                if (invoice.id === action.payload.id) invoiceIndex = index;
            });
            if (invoiceIndex !== -1) {
                state[invoiceIndex] = {
                    ...action.payload,
                    id: state[invoiceIndex].id,
                };
            }
        },
    },
});

export default invoices.reducer;

export const addInvoice =
    (payload: Invoice, cb: () => void): AppThunk =>
    async (dispatch) => {
        const id = new Date().getTime().toString();
        dispatch(
            invoices.actions.addInvoice({
                ...payload,
                id,
            })
        );
        cb();
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

export const getInvoices = (state: RootState): Invoice[] => state.invoices;
