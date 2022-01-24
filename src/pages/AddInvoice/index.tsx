import { InvoiceBody } from "../../components/InvoiceBody";

export const AddInvoice = () => {
  return (
    <div>
      <h1>New invoice</h1>
      <form>
      <InvoiceBody />
      </form>
    </div>
  );
};
