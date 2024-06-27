import OrderForm from "./OrderFrom";
import { orderDetails, invoiceDetails, signatureAtom } from "../store/atoms/atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const OrderItem = () => {
  const [order, setOrder] = useRecoilState(orderDetails);
  
  const handleChange = (e) => {
    setOrder({...order, [e.target.name]: e.target.value});
  }

  return (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Reverse Charge</p>
            <div className="flex flex-row justify-between mx-3">
            <div className="flex flex-row gap-2">
              <input 
                type="radio" 
                name="reverseCharge"
                value={true}
                id="yes"
                checked={order.reverseCharge === true}
                onChange={() => setOrder({...order, reverseCharge: true})}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div className="flex flex-row gap-2">
              <input 
                type="radio" 
                name="reverseCharge"
                value={false}
                id="no"
                checked={order.reverseCharge === false}
                onChange={() => setOrder({...order, reverseCharge: false})}
              />
              <label htmlFor="no">No</label>
            </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <label className="form-label">Order No.</label>
            <input 
              type="text" 
              placeholder="Order No." 
              className="form-input" 
              name="orderId"
              value={order.orderId}
              onChange={handleChange}
            />
            </div>
          <div className="flex flex-col gap-2">
            <label className="form-label">Order Date</label>
            <input 
              type="date" 
              placeholder="Order Date" 
              className="form-input" 
              name="orderDate"
              value={order.orderDate}
              onChange={handleChange}
            />
          </div>
        </div>
  )
}

const InvoiceItem = () => {
  const [invoice, setInvoice] = useRecoilState(invoiceDetails);

  const handleChange = (e) => {
    setInvoice({...invoice, [e.target.name]: e.target.value});
  }

  return (
    <div className="flex flex-col gap-2">
    <div className="flex flex-col gap-2">
      <label className="form-label">Invoice No.</label>
      <input 
        type="number" 
        placeholder="Invoice No." 
        className="form-input" 
        name="invoiceId"
        value={invoice.invoiceId}
        onChange={handleChange}
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="form-label">Invoice Details</label>
      <input 
        type="text" 
        placeholder="Invoice Detail" 
        className="form-input" 
        name="invoiceDetail"
        value={invoice.invoiceDetail}
        onChange={handleChange}
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="form-label">Invoice Date</label>
      <input 
        type="date" 
        placeholder="Invoice Date" 
        className="form-input"
        name="invoiceDate"
        value={invoice.invoiceDate}
        onChange={handleChange}
      />
    </div>
  </div>
  )
}

const Signature = () => {
  const [signature, setSignature] = useRecoilState(signatureAtom);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSignature(reader.result);
    };
  };

  return (
    <div>
      <p className="text-lg font-semibold">Signature Image</p>
      <input type="file" accept="image/*" placeholder="Signature" onChange={handleImageChange} />
      {signature && <img className="w-40 border border-gray-30 mx-auto mb-2" src={signature} alt="Signature" />}
    </div>
  );
};


const OrderInvoiceItemForm = () => {
  const navigate = useNavigate();
  return (
    <form action="/preview">
      <div className="flex flex-col lg:flex-row justify-between gap-10 m-10">
          <OrderForm />
        <section className="flex flex-col gap-2 md:flex-row lg:flex-col md:gap-11 ">
          <OrderItem />
          <InvoiceItem />
          <Signature />
          <button onClick={(e) => {
            e.preventDefault();
            navigate('/invoice')
          }} className='btn'>Preview</button>
        </section>
      </div>
    </form>
  )
};

export default OrderInvoiceItemForm;
