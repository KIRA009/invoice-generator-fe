import { PDFDownloadLink } from '@react-pdf/renderer';
import { useDispatch, useSelector } from 'react-redux';
import { InvoicePage } from '../../components/InvoicePage';
import { getCustomers } from '../../reducers/customers';
import { deleteInvoice, getInvoices } from '../../reducers/invoices';
import { Invoice } from '../../types/invoice';
import { Box, Container, Text } from '@mantine/core';
import { CheckCircledIcon } from '@modulz/radix-icons';
import { Link } from 'react-router-dom';
import classes from './styles.module.scss';
import {
    getInvoiceAmount,
    getInvoiceAmountInString,
} from '../../utils/invoiceAmount';
import { Dispatch, MouseEvent, useState } from 'react';
import { useNotifications } from '@mantine/notifications';
import { NotificationsContextProps } from '@mantine/notifications/lib/types';
import { Customer } from '../../types/customer';
import { getCustomerFromId } from '../../utils/getCustomerDetails';

const InvoiceDetails = (
    invoice: Invoice,
    customer: Customer,
    notifications: NotificationsContextProps,
    dispatch: Dispatch<any>
) => {
    const [showDownloadLink, setShowDownloadLink] = useState(false);
    const sumWithSymbol = getInvoiceAmountInString(
        getInvoiceAmount(invoice),
        customer
    );
    const _deleteInvoice = (
        e: MouseEvent<HTMLAnchorElement>,
        invoiceId: string
    ) => {
        e.preventDefault();

        dispatch(
            deleteInvoice(invoiceId, () => {
                notifications.showNotification({
                    message: 'Invoice deleted successfully',
                    color: 'green',
                    icon: <CheckCircledIcon />,
                });
            })
        );
    };
    return (
        <Box key={invoice.id} className={classes.invoice}>
            <Text component='span'>
                INV - {invoice.number} for {sumWithSymbol}
            </Text>
            <Text component='span'>
                <Link to={`/invoice/edit/${invoice.id}`}>
                    <Text>Edit invoice</Text>
                </Link>
                {showDownloadLink ? (
                    <PDFDownloadLink
                        document={
                            <InvoicePage
                                invoice={invoice}
                                customer={customer}
                            />
                        }
                        fileName={`INV - ${invoice.number}`}
                        aria-label='Save PDF'
                    >
                        Download
                    </PDFDownloadLink>
                ) : (
                    <Link to='#' onClick={(e) => setShowDownloadLink(true)}>
                        <Text>Show download link</Text>
                    </Link>
                )}
                <Link to='#' onClick={(e) => _deleteInvoice(e, invoice.id)}>
                    <Text>Delete invoice</Text>
                </Link>
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
    const sortedInvoices = [...invoices].sort(comp);
    const notifications = useNotifications();
    const dispatch = useDispatch();
    const customers = useSelector(getCustomers);
    return (
        <Container size='xs'>
            <Text component='h1' size='xl'>
                INVOICES
                <Link to='/invoice/add/'>
                    <Text>Create an invoice</Text>
                </Link>
            </Text>
            {sortedInvoices.map((invoice) =>
                InvoiceDetails(
                    invoice,
                    getCustomerFromId(customers, invoice.customerId),
                    notifications,
                    dispatch
                )
            )}
        </Container>
    );
};
