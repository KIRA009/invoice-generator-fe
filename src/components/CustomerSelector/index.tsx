import { useSelector } from "react-redux";
import { getCustomers } from "../../reducers/customers";
import { Customer } from "../../types/customer";

export const CustomerSelector = () => {
    const customers: Customer[] = useSelector(getCustomers);
    return (
        <select name="customer" id="customer-select">
            {customers.map(customer => (
                <option value={customer.id}>{customer.name}</option>
            ))}
        </select>
    )
};
