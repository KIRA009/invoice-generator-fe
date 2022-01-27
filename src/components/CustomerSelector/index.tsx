import React from 'react';

import { useSelector } from 'react-redux';
import { getCustomers } from '../../reducers/customers';
import { Customer } from '../../types/customer';

interface Props {
    customerRef: React.RefObject<HTMLSelectElement>;
}

export const CustomerSelector = ({ customerRef }: Props) => {
    const customers: Customer[] = useSelector(getCustomers);
    return (
        <select name='customer' id='customer-select' ref={customerRef}>
            {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                    {customer.name}
                </option>
            ))}
        </select>
    );
};
