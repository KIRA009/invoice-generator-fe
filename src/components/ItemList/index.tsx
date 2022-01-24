import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { InvoiceItem } from "../../types/invoice-item"

interface Props {
    items: InvoiceItem[];
    setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>
}


export const ItemList = ({items, setItems}: Props) => {
    const [total, setTotal] = useState(0 as number);
    const itemDescriptionRef = useRef<HTMLInputElement>(null);
    const itemQuantityRef = useRef<HTMLInputElement>(null);
    const itemRateRef = useRef<HTMLInputElement>(null);
    const addItem = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setItems(prev => {
            if (!itemDescriptionRef.current || !itemQuantityRef.current || !itemRateRef.current) return prev;
            const itemDetails: InvoiceItem = {
                itemDetail: itemDescriptionRef.current.value,
                quantity: Number(itemQuantityRef.current.value),
                rate: Number(itemRateRef.current.value),
                amount: 0
            };
            itemDetails.amount = itemDetails.rate * itemDetails.quantity;
            if (itemDetails.amount === 0 || itemDetails.itemDetail.length === 0) return prev;
            let newItems = [...prev];
            newItems.push(itemDetails)
            return newItems;
        })
    }
    const removeItem = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        setItems(prev => {
            let newItems = [...prev];
            newItems.splice(index, 1);
            return newItems;
        })
    }
    useEffect(() => {
        setTotal(items.reduce((a, b) => a + b.amount, 0))
    }, [items])
    return (
        <div>
            <table>
                <caption>Items</caption>
                <thead>
                    <tr>
                        <th>Item description</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" ref={itemDescriptionRef} /></td>
                        <td><input type="text" ref={itemQuantityRef} /></td>
                        <td><input type="text" ref={itemRateRef} /></td>
                        <td><input type="text" readOnly /><button onClick={addItem}>Add</button></td>
                    </tr>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.itemDetail}</td>
                            <td>{item.quantity}</td>
                            <td>{item.rate}</td>
                            <td>{item.amount} <button onClick={e => removeItem(e, index)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                Subtotal: {total}
            </div>
            <div>
                Total: {total}
            </div>
        </div>
    )
}
