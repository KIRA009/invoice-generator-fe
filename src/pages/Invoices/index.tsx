import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import { InvoicePage } from '../../components/InvoicePage';
import { getCustomer } from '../../reducers/customers';
import { getInvoices } from '../../reducers/invoices';
import { Invoice } from '../../types/invoice';
import { Box, Container, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './styles.module.scss';
import {
    getInvoiceAmount,
    getInvoiceAmountInString,
} from '../../utils/invoiceAmount';

const InvoiceDetails = (invoice: Invoice) => {
    const customer = useSelector(getCustomer(invoice.customerId));
    const sumWithSymbol = getInvoiceAmountInString(
        getInvoiceAmount(invoice),
        customer
    );
    return (
        <Box key={invoice.id} className={classes.invoice}>
            <Text component='span'>
                INV - {invoice.number} for {sumWithSymbol}
            </Text>
            <Text component='span'>
                <PDFDownloadLink
                    document={
                        <InvoicePage invoice={invoice} customer={customer} />
                    }
                    fileName={`INV - ${invoice.number}`}
                    aria-label='Save PDF'
                >
                    Download
                </PDFDownloadLink>
            </Text>
        </Box>
    );
};

const getDate = (invoice: Invoice) => {
    const [day, month, year] = invoice.creationDate.split('/');
    return new Date(month + '/' + day + '/' + year);
};

const comp = (a: Invoice, b: Invoice) => {
    return getDate(b).getTime() - getDate(a).getTime();
};

export const Invoices = () => {
    const invoices: Invoice[] = useSelector(getInvoices);
    return (
        <Container size='xs'>
            <Text component='h1' size='xl'>
                INVOICES
                <Link to='/invoice/add/'>
                    <Text>Create an invoice</Text>
                </Link>
            </Text>
            {invoices.sort(comp).map((invoice) => InvoiceDetails(invoice))}
        </Container>
    );
};
