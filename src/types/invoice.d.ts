import { Customer } from "./customer";

export interface Invoice {
    id: string;
    customer: Customer;
    number: string;
    creationDate: Date;
    dueDate?: Date;
}
