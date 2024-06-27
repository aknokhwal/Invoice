import React from 'react';
import logo from '../assets/logo.svg';
import { 
  orderDetails, 
  sellerDetails, 
  invoiceDetails, 
  shippingDetails, 
  billingDetails, 
  itemsState, 
  signatureAtom } from '../store/atoms/atoms';
import { useRecoilValue } from 'recoil';
import { ToWords } from 'to-words';


const Invoice = () => {
  const toWords = new ToWords();
  const seller = useRecoilValue(sellerDetails);
  const billing = useRecoilValue(billingDetails);
  const shipping = useRecoilValue(shippingDetails);
  const order = useRecoilValue(orderDetails)
  const invoice = useRecoilValue(invoiceDetails);
  const items = useRecoilValue(itemsState);

  const placeOfDelivery = shipping.placeOfDelivery.toUpperCase();
  const placeOfSupply = seller.placeOfSupply.toUpperCase();

  const calculateTaxes = (amount, taxRate) => {
    if (isSameState) {
      const cgst = (amount * (taxRate / 2)) / 100;
      const sgst = cgst;
      return { cgst, sgst, igst: 0 };
    } else {
      const igst = (amount * taxRate) / 100;
      return { cgst: 0, sgst: 0, igst };
    }
  };

  const isSameState = placeOfDelivery === placeOfSupply;
  const calculateTotals = () => {
    let subtotal = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;

    items.forEach(item => {
      const itemTotal = item.unitPrice * item.quantity;
      subtotal += itemTotal;
      const { cgst, sgst, igst } = calculateTaxes(itemTotal, item.taxRate);
      totalCGST += cgst;
      totalSGST += sgst;
      totalIGST += igst;
    });


    const totalTax = totalCGST + totalSGST + totalIGST;
    const grandTotal = subtotal  + totalTax;

    return {
      subtotal,
      totalTax,
      grandTotal
    };
  };

  
  const { subtotal, totalTax, grandTotal } = calculateTotals();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg" id='invoice'>
      <div className="flex justify-between items-start mb-8">
        <img src={logo} alt="Amazon.in logo" className="w-32" />
        <div className="text-right">
          <h2 className="text-xl font-bold">Tax Invoice/Bill of Supply/Cash Memo</h2>
          <p className="text-sm">(Original for Recipient)</p>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <h3 className="font-bold mb-2">Sold By :</h3>
          <p>{seller.name}</p>
          <p>{seller.address}</p>
          <p>{seller.city}, {seller.state}, {seller.pincode}</p>
          <p>PAN No: {seller.PAN_No}</p>
          <p>GST Registration No: {seller.GST_No}</p>
        </div>
        <div className="flex flex-col gap-2 mb-8 text-right">
          <div>
            <h3 className="font-bold mb-2">Billing Address :</h3>
            <p>{billing.name}</p>
            <p>{billing.company}</p>
            <p>{billing.address}</p>
            <p>{billing.city}, {billing.state}, {billing.pincode}</p>
            <p>State/UT Code: {billing.stateUTCode}</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Shipping Address :</h3>
            <p>{shipping.name}</p>
            <p>{shipping.company}</p>
            <p>{shipping.address}</p>
            <p>{shipping.city}, {shipping.state}, {shipping.pincode}</p>
            <p>State/UT Code: {billing.stateUTCode}</p>
          </div>
          <div>
            <p><b>Place of supply:</b> {seller.placeOfSupply.toUpperCase()}</p>
            <p><b>Place of Delivery:</b> {shipping.placeOfDelivery.toUpperCase()}</p>
          </div>
        </div>
      </div>
      

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <p><span className="font-bold">Order Number:</span> {order.orderId}</p>
          <p><span className="font-bold">Order Date:</span> {order.orderDate}</p>
        </div>
        <div>
          <p><span className="font-bold">Invoice Number:</span> {invoice.invoiceId}</p>
          <p><span className="font-bold">Invoice Date:</span> {invoice.invoiceDate}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className='p-2'>S.No</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-right">Unit Price</th>
            <th className="p-2 text-right">Qty</th>
            <th className="p-2 text-right">Net Amount</th>
            {isSameState ? (
              <>
                <th className="p-2 text-right">CGST</th>
                <th className="p-2 text-right">SGST</th>
              </>
            ) : (
              <th className="p-2 text-right">IGST</th>
            )}
            <th className="p-2 text-right">Tax Amount</th>
            <th className="p-2 text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const netAmount = item.unitPrice * item.quantity;
            const { cgst, sgst, igst } = calculateTaxes(netAmount, item.taxRate);
            const totalAmount = netAmount + cgst + sgst + igst;
            return (
              <React.Fragment key={index}>
                <tr>
                  <td className='p-2'>{index + 1}</td>
                  <td className="p-2">{item.description}</td>
                  <td className='p-2 text-right'>{item.unitPrice}</td>
                  <td className="p-2 text-right">{item.quantity}</td>
                  <td className='p-2 text-right'>{netAmount}</td>
                  {isSameState ? (
                    <>
                      <td className="p-2 text-right">₹{cgst.toFixed(2)} <span className='font-medium'>({item.taxRate/2}%)</span></td>
                      <td className="p-2 text-right">₹{sgst.toFixed(2)} <span className='font-medium'>({item.taxRate/2}%)</span></td>
                    </>
                  ) : (
                    <td className="p-2 text-right">₹{igst.toFixed(2)} <span className='font-medium'>({item.taxRate}%)</span></td>
                  )}
                  <td className='p-2 text-right'>{(cgst + sgst + igst).toFixed(2) }</td>
                  <td className='p-2 text-right'>{totalAmount.toFixed(2)}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      
      <div>
        
        <div className="flex justify-between mb-8">
        <div className='text-xl font-bold w-2/3' >
          <span>Amount in Words:</span><br/>
          {toWords.convert(grandTotal.toFixed(2), {currency: true})}
        </div>
        <div className="w-1/3">
          <div className="flex justify-between border-b py-2">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span>Total Tax:</span>
            <span>₹{totalTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold py-2">
            <span>Grand Total:</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex flex-col">
          <p className="font-bold mb-2">For {seller.name}:</p>
          <div className="w-40 h-20 border border-gray-30 mx-auto mb-2">
            <img className='w-full h-full' src={useRecoilValue(signatureAtom) || '/path/to/fallback-image.jpg'} alt="Signature" />
          </div>
          <p>Authorized Signatory</p>
        </div>
      </div>

      <p className="mt-8 text-sm">Whether tax is payable under reverse charge - {order.reverseCharge ? "Yes" : 
      "No"}</p>
    </div>
  );
};

export default Invoice;