import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInvoice, getInvoices } from '../../reducers/invoices';
import { InvoiceItem } from '../../types/invoice-item';
import { CustomerSelector } from '../CustomerSelector';
import { ItemList } from '../ItemList';
import { Invoice } from '../../types/invoice';

export const InvoiceBody = () => {
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const invoices = useSelector(getInvoices);
    const dispatch = useDispatch();
    const numberRef = useRef<HTMLInputElement>(null);
    const creationDateRef = useRef<HTMLInputElement>(null);
    const dueDateRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const customerRef = useRef<HTMLSelectElement>(null);
    const save = (e: React.MouseEvent) => {
        e.preventDefault();
        if (
            !customerRef.current ||
            !numberRef.current ||
            !creationDateRef.current ||
            !dueDateRef.current ||
            !subjectRef.current
        )
            return;
        if (
            !creationDateRef.current.valueAsDate ||
            !numberRef.current.value ||
            !customerRef.current.value ||
            !subjectRef.current.value
        )
            return;

        const invoice: Invoice = {
            id: '',
            items,
            customerId: customerRef.current.value,
            creationDate: creationDateRef.current.valueAsDate,
            number: numberRef.current.value,
            subject: subjectRef.current.value,
        };

        if (dueDateRef.current.valueAsDate) {
            invoice.dueDate = dueDateRef.current.valueAsDate;
        }

        dispatch(addInvoice(invoice));
    };
    const defaultInvoiceNum = useMemo(() => {
        let maxInvoiceNum = 0;
        for (const invoice of invoices) {
            if (!isNaN(Number(invoice.number))) {
                maxInvoiceNum = Math.max(maxInvoiceNum, Number(invoice.number));
            }
        }
        const newInvoiceNum = maxInvoiceNum + 1;
        return String(newInvoiceNum).padStart(6, '0');
    }, [invoices]);

    return (
        <>
            <CustomerSelector customerRef={customerRef} />
            <div className='input'>
                <label htmlFor='invoice-number'>Invoice Number</label>
                <input
                    id='invoice-number'
                    defaultValue={defaultInvoiceNum}
                    ref={numberRef}
                    type='text'
                    required
                />
            </div>
            <div className='input'>
                <label htmlFor='invoice-date'>Invoice date</label>
                <input
                    id='invoice-date'
                    ref={creationDateRef}
                    type='date'
                    required
                />
            </div>
            <div className='input'>
                <label htmlFor='invoice-due-date'>Invoice due date</label>
                <input id='invoice-due-date' ref={dueDateRef} type='date' />
            </div>
            <div className='input'>
                <label htmlFor='invoice-subject'>Subject</label>
                <input id='invoice-subject' ref={subjectRef} type='text' />
            </div>
            <ItemList items={items} setItems={setItems} />
            <button onClick={save}>Save</button>
        </>
    );
};
