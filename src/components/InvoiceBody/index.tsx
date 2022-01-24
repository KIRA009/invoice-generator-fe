import { useState } from "react"
import { InvoiceItem } from "../../types/invoice-item";
import { CustomerSelector } from "../CustomerSelector"
import { ItemList } from "../ItemList"

export const InvoiceBody = () => {
    const [items, setItems] = useState([] as InvoiceItem[]);
    return (
        <>
        <CustomerSelector />
        <div className="input">
            <label htmlFor="invoice-number">Invoice Number</label>
            <input id="invoice-number" type="text" required />
        </div>
        <div className="input">
            <label htmlFor="invoice-date">Invoice date</label>
            <input id="invoice-date" type="date" required />
        </div>
        <div className="input">
            <label htmlFor="invoice-due-date">Invoice due date</label>
            <input id="invoice-due-date" type="date" />
        </div>
        <ItemList items={items} setItems={setItems} />
        </>
    )
}
