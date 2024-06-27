import { atom } from 'recoil';

export const sellerDetails = atom({
    key: 'SellerDetail',
    default: {
        name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        PAN_No: '',
        GST_No: '',
        placeOfSupply: ''
    }
});

export const billingDetails = atom({
    key: 'BillingDetail',
    default: {
        name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        stateUTCode: ''
    }
});

export const shippingDetails = atom({
    key: 'ShippingDetail',
    default: {
        name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        stateUTCode: '',
        placeOfDelivery: '',
    }
});

export const orderDetails = atom({
    key: 'OrderDetail',
    default: {
        orderId: '',
        orderDate: '',
        reverseCharge: false
    }
});

export const invoiceDetails = atom({
    key: 'InvoiceDetail',
    default: {
        invoiceId: '',
        invoiceDetail: '',
        invoiceDate: '',
    }
});

export const itemsState = atom({
    key: "ItemsState",
    default: [{ 
        description: '', 
        unitPrice: '',
        quantity: '', 
        discount: '', 
        taxRate: 18 
    }]
});

export const signatureAtom = atom({
    key: 'signatureAtom',
    default: null,
  });