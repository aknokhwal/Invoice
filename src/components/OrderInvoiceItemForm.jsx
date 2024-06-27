import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { orderDetails, invoiceDetails, signatureAtom } from "../store/atoms/atoms";
import OrderForm from "./OrderFrom";

const validationSchema = Yup.object({
  reverseCharge: Yup.boolean().required('Required'),
  orderId: Yup.string().required('Required'),
  orderDate: Yup.date().required('Required'),
  invoiceId: Yup.number().required('Required').positive('Must be a positive number'),
  invoiceDetail: Yup.string().required('Required'),
  invoiceDate: Yup.date().required('Required'),
  signature: Yup.mixed().required('Signature is required')
});

const OrderItem = ({ formik }) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold">Reverse Charge</p>
      <div className="flex flex-row justify-between mx-3">
        <div className="flex flex-row gap-2">
          <input 
            type="radio" 
            name="reverseCharge"
            value="true"
            id="yes"
            checked={formik.values.reverseCharge === true}
            onChange={() => formik.setFieldValue('reverseCharge', true)}
          />
          <label htmlFor="yes">Yes</label>
        </div>
        <div className="flex flex-row gap-2">
          <input 
            type="radio" 
            name="reverseCharge"
            value="false"
            id="no"
            checked={formik.values.reverseCharge === false}
            onChange={() => formik.setFieldValue('reverseCharge', false)}
          />
          <label htmlFor="no">No</label>
        </div>
      </div>
      {formik.touched.reverseCharge && formik.errors.reverseCharge ? (
        <div className="text-red-500">{formik.errors.reverseCharge}</div>
      ) : null}
    </div>
    <div className="flex flex-col gap-2 mt-1">
      <label className="form-label">Order No.</label>
      <input 
        type="text" 
        placeholder="Order No." 
        className="form-input" 
        name="orderId"
        {...formik.getFieldProps('orderId')}
      />
      {formik.touched.orderId && formik.errors.orderId ? (
        <div className="text-red-500">{formik.errors.orderId}</div>
      ) : null}
    </div>
    <div className="flex flex-col gap-2">
      <label className="form-label">Order Date</label>
      <input 
        type="date" 
        placeholder="Order Date" 
        className="form-input" 
        name="orderDate"
        {...formik.getFieldProps('orderDate')}
      />
      {formik.touched.orderDate && formik.errors.orderDate ? (
        <div className="text-red-500">{formik.errors.orderDate}</div>
      ) : null}
    </div>
  </div>
);

const InvoiceItem = ({ formik }) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-col gap-2">
      <label className="form-label">Invoice No.</label>
      <input 
        type="number" 
        placeholder="Invoice No." 
        className="form-input" 
        name="invoiceId"
        {...formik.getFieldProps('invoiceId')}
      />
      {formik.touched.invoiceId && formik.errors.invoiceId ? (
        <div className="text-red-500">{formik.errors.invoiceId}</div>
      ) : null}
    </div>
    <div className="flex flex-col gap-2">
      <label className="form-label">Invoice Details</label>
      <input 
        type="text" 
        placeholder="Invoice Detail" 
        className="form-input" 
        name="invoiceDetail"
        {...formik.getFieldProps('invoiceDetail')}
      />
      {formik.touched.invoiceDetail && formik.errors.invoiceDetail ? (
        <div className="text-red-500">{formik.errors.invoiceDetail}</div>
      ) : null}
    </div>
    <div className="flex flex-col gap-2">
      <label className="form-label">Invoice Date</label>
      <input 
        type="date" 
        placeholder="Invoice Date" 
        className="form-input"
        name="invoiceDate"
        {...formik.getFieldProps('invoiceDate')}
      />
      {formik.touched.invoiceDate && formik.errors.invoiceDate ? (
        <div className="text-red-500">{formik.errors.invoiceDate}</div>
      ) : null}
    </div>
  </div>
);

const Signature = ({ formik }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        formik.setFieldValue('signature', reader.result);
      };
    }
  };

  return (
    <div>
      <p className="text-lg font-semibold">Signature Image</p>
      <input 
        type="file" 
        accept="image/*" 
        placeholder="Signature" 
        onChange={handleImageChange} 
      />
      {formik.touched.signature && formik.errors.signature ? (
        <div className="text-red-500">{formik.errors.signature}</div>
      ) : null}
      {formik.values.signature && (
        <img className="w-40 border border-gray-30 mx-auto mb-2" src={formik.values.signature} alt="Signature" />
      )}
    </div>
  );
};

const OrderInvoiceItemForm = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useRecoilState(orderDetails);
  const [invoice, setInvoice] = useRecoilState(invoiceDetails);
  const [signature, setSignature] = useRecoilState(signatureAtom);

  const formik = useFormik({
    initialValues: {
      reverseCharge: order.reverseCharge,
      orderId: order.orderId,
      orderDate: order.orderDate,
      invoiceId: invoice.invoiceId,
      invoiceDetail: invoice.invoiceDetail,
      invoiceDate: invoice.invoiceDate,
      signature: signature
    },
    validationSchema,
    onSubmit: (values) => {
      setOrder({
        reverseCharge: values.reverseCharge,
        orderId: values.orderId,
        orderDate: values.orderDate
      });
      setInvoice({
        invoiceId: values.invoiceId,
        invoiceDetail: values.invoiceDetail,
        invoiceDate: values.invoiceDate
      });
      setSignature(values.signature);
      navigate('/invoice');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col lg:flex-row justify-between gap-10 m-10">
        <OrderForm />
        <section className="flex flex-col gap-2 md:flex-row lg:flex-col md:gap-11 ">
          <OrderItem formik={formik} />
          <InvoiceItem formik={formik} />
          <Signature formik={formik} />
          <button 
            type="submit"
            className='btn'
          >
            Preview
          </button>
        </section>
      </div>
    </form>
  );
};

export default OrderInvoiceItemForm;