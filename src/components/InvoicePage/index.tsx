import { Document, Page, View, Text, Image } from "@react-pdf/renderer"
import compose from "./compose"
import { Invoice } from "../../types/invoice"
import converter from 'number-to-words';

interface Props {
    invoice: Invoice
}

export const InvoicePage = ({invoice}: Props) => {
    const sum = invoice.items.reduce((a, b) => a + b.amount, 0);
    const wordSum = converter.toWords(sum).split(' ')
    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
    let creationDate: Date = new Date(invoice.creationDate)
    const creationDateStr = 
    ((creationDate.getDate() > 9) ? creationDate.getDate() : ('0' + creationDate.getDate())) + '/' +
    ((creationDate.getMonth() > 8) ? (creationDate.getMonth() + 1) : ('0' + (creationDate.getMonth() + 1))) +
    '/' +  creationDate.getFullYear();
    return (
        <Document>
            <Page style={compose('invoice_wrapper')}>
                <View style={compose('flex')}>
                    <View style={compose('50')}>
                        <Text style={compose('bold fs-medium')}>Shohan Dutta Roy</Text>
                        <Text style={compose('fs-small')}>Assam</Text>
                        <Text style={compose('fs-small')}>India</Text>
                    </View>
                    <View style={compose('50')}>
                        <Text style={compose('fs-large right bold')}>TAX INVOICE</Text>
                        <Text style={compose('fs-small right bold')}># INV - {invoice.number}</Text>
                    </View>
                </View>
                <View style={compose('flex align-center mt-large')}>
                    <View style={compose('50')}>
                        <Text style={compose('fs-small')}>Bill To:</Text>
                        <Text style={compose('fs-small bold mt-small')}>Torchbox Ltd</Text>
                        <Text style={compose('fs-small')}>
                            The Top Floor, Southill Barn, Southill Business Park,
                            Cornbury Park
                            Charlbury, Oxfordshire
                            OX7 3EW
                            United Kingdom
                        </Text>
                    </View>
                    <View style={compose('flex 35 right')}>
                        <Text style={compose('fs-small bold')}>Invoice Date: </Text>
                        <Text style={compose('fs-small bold')}>{creationDateStr}</Text>
                    </View>
                </View>
                <View style={compose('mt-large')}>
                    <Text style={compose('fs-small')}>Subject:</Text>
                    <Text style={compose('fs-small bold mt-small')}>{invoice.subject}</Text>
                </View>
                <View style={compose('mt-large')}>
                    <View style={compose('row flex bg-gray')}>
                        <Text style={compose('fs-small w-8 p-4-8 fl-small')}>#</Text>
                        <Text style={compose('fs-small w-40 p-4-8 left fl-large')}>Item & Description</Text>
                        <Text style={compose('fs-small w-17 p-4-8 right fl-med')}>Hours</Text>
                        <Text style={compose('fs-small w-17 p-4-8 right fl-med')}>Rate</Text>
                        <Text style={compose('fs-small w-18 p-4-8 right fl-med')}>Amount</Text>
                    </View>
                    {invoice.items.map((item, index) => (
                        <View style={compose('row flex')} key={index}>
                            <Text style={compose('fs-small w-8 p-4-8 fl-small')}>{index + 1}</Text>
                            <Text style={compose('fs-small w-40 p-4-8 left fl-large')}>{item.itemDetail}</Text>
                            <Text style={compose('fs-small w-17 p-4-8 right fl-med')}>{item.quantity}</Text>
                            <Text style={compose('fs-small w-17 p-4-8 right fl-med')}>{item.rate}</Text>
                            <Text style={compose('fs-small w-18 p-4-8 right fl-med')}>{item.amount}</Text>
                        </View>
                    ))}
                </View>
                <View style={compose('mt-small flex')}>
                    <Text style={compose('fs-small w-48 p-4-8')}></Text>
                    <Text style={compose('fs-small w-26 p-4-8 right')}>Sub Total</Text>
                    <Text style={compose('fs-small w-26 p-4-8 right')}>£{sum}</Text>
                </View>
                <View style={compose('mt-small flex')}>
                    <Text style={compose('fs-small w-48 p-4-8')}></Text>
                    <Text style={compose('fs-small w-26 p-4-8 right bold bg-light-gray')}>Total</Text>
                    <Text style={compose('fs-small w-26 p-4-8 right bold bg-light-gray')}>£{sum}</Text>
                </View>
                <View style={compose('mt-small flex')}>
                    <Text style={compose('fs-small w-48 p-4-8')}></Text>
                    <Text style={compose('fs-small w-26 p-4-8 right')}>Total in Words:</Text>
                    <Text style={compose('fs-small w-26 p-4-8 right bold')}>Pound Sterling {wordSum}</Text>
                </View>
                <View style={compose('mt-large')}>
                    <Image src="https://iamkira99-personal.s3.ap-south-1.amazonaws.com/my_sig-removebg-preview.png" style={compose('image w-35')} />
                    <Text style={compose('mt-small fs-small')}>Shohan Dutta Roy</Text>
                    <Text style={compose('fs-small')}>Authorized Signature</Text>
                </View>
            </Page>
        </Document>
    )
}
