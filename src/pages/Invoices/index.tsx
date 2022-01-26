import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSelector } from "react-redux"
import { InvoicePage } from "../../components/InvoicePage";
import { getInvoices } from "../../reducers/invoices"
import { Invoice } from "../../types/invoice"

export const Invoices = () => {
    const invoices: Invoice[] = useSelector(getInvoices);
    return (
        <div>
            {invoices.map(invoice => (
                <div key={invoice.id}>
                    Invoice id: {invoice.id}
                    Invoice number: {invoice.number}
                    <PDFDownloadLink
                    document={<InvoicePage invoice={invoice}  />}
                    fileName={`invoice.pdf`}
                    aria-label="Save PDF"
                    >Download</PDFDownloadLink>
                    <InvoicePage invoice={invoice} />
                </div>
            ))}
        </div>
    )
}
