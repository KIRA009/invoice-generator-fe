import { Customer } from "./customer";
import { InvoiceItem } from "./invoice-item";

export interface Invoice {
    id: string;
    customerId: string;
    number: string;
    creationDate: Date;
    subject: string;
    items: InvoiceItem[];
    dueDate?: Date;
}
