import { Invoice } from '../types/invoice';

export const getInvoiceAmount = (invoice: Invoice): number => {
    return invoice.items.reduce((a, b) => a + b.amount, 0);
};
