import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import { InvoicePage } from '../../components/InvoicePage';
import { getCustomer } from '../../reducers/customers';
import { getInvoices } from '../../reducers/invoices';
import { Invoice } from '../../types/invoice';

const InvoiceDetails = (invoice: Invoice) => {
    const customer = useSelector(getCustomer(invoice.customerId));
    return (
        <div key={invoice.id}>
            Invoice id: {invoice.id}
            Invoice number: {invoice.number}
            <PDFDownloadLink
                document={<InvoicePage invoice={invoice} customer={customer} />}
                fileName={`invoice.pdf`}
                aria-label='Save PDF'
            >
                Download
            </PDFDownloadLink>
        </div>
    );
};

export const Invoices = () => {
    const invoices: Invoice[] = useSelector(getInvoices);
    return <div>{invoices.map((invoice) => InvoiceDetails(invoice))}</div>;
};
