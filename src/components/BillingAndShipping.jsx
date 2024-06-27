import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { billingDetails, shippingDetails } from "../store/atoms/atoms";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  pincode: Yup.string().matches(/^\d{6}$/, 'Pincode must be exactly 6 digits').required('Required'),
  stateUTCode: Yup.string().matches(/^\d{2}$/, 'State/UT Code must be exactly 2 digits').required('Required'),
});

const Form = ({heading, details, setDetails, errors, touched, handleChange, handleBlur}) => {
  return (
    <section className="flex flex-col lg:w-1/2 gap-4">
      <h1 className="text-2xl font-bold mt-5">{heading}</h1>
      <div className="flex flex-col gap-2">
        <label className="form-label">Name</label>
        <input 
          type="text" 
          placeholder="Enter Name"
          className="form-input"
          name="name"
          value={details.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && <div className="text-red-500">{errors.name}</div>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="form-label">Address</label>
        <input 
          type="text" 
          placeholder="Enter Address"
          className="form-input"
          name="address"
          value={details.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.address && errors.address && <div className="text-red-500">{errors.address}</div>}
      </div>

      <div className="flex flex-col gap-2 md:flex-row justify-between">
        <div className="flex flex-col gap-2 md:w-[30%]">
          <label className="form-label">City</label>
          <input 
            type="text" 
            placeholder="Enter City"
            className="form-input"
            name="city"
            value={details.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.city && errors.city && <div className="text-red-500">{errors.city}</div>}
        </div>
        <div className="flex flex-col gap-2 md:w-[30%]">
          <label className="form-label">State</label>
          <input 
            type="text" 
            placeholder="Enter State"
            className="form-input"
            name="state"
            value={details.state}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.state && errors.state && <div className="text-red-500">{errors.state}</div>}
        </div>
        <div className="flex flex-col gap-2 md:w-[30%]">
          <label className="form-label md">Pin Code</label>
          <input 
            type="text" 
            placeholder="Enter Pin Code"
            className="form-input"
            name="pincode"
            value={details.pincode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.pincode && errors.pincode && <div className="text-red-500">{errors.pincode}</div>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="form-label">State/UT Code</label>
        <input 
          type="text"
          placeholder="Enter State/UT Code"
          className="form-input"
          name="stateUTCode"
          value={details.stateUTCode}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.stateUTCode && errors.stateUTCode && <div className="text-red-500">{errors.stateUTCode}</div>}
      </div>
    </section>
  )
}

const BillingAndShipping = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useRecoilState(billingDetails);
  const [shipping, setShipping] = useRecoilState(shippingDetails);
  const [sameAddress, setSameAddress] = useState(false);

  const formik = useFormik({
    initialValues: {
      ...billing,
      ...shipping,
      placeOfDelivery: shipping.placeOfDelivery
    },
    validationSchema: Yup.object({
      ...validationSchema.fields,
      placeOfDelivery: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      setBilling({
        name: values.name,
        address: values.address,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        stateUTCode: values.stateUTCode
      });
      setShipping({
        name: sameAddress ? values.name : values.shippingName,
        address: sameAddress ? values.address : values.shippingAddress,
        city: sameAddress ? values.city : values.shippingCity,
        state: sameAddress ? values.state : values.shippingState,
        pincode: sameAddress ? values.pincode : values.shippingPincode,
        stateUTCode: sameAddress ? values.stateUTCode : values.shippingStateUTCode,
        placeOfDelivery: values.placeOfDelivery
      });
      navigate('/invoice-detials');
    },
  });

  const handleSameAddressChange = (e) => {
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      formik.setValues({
        ...formik.values,
        shippingName: formik.values.name,
        shippingAddress: formik.values.address,
        shippingCity: formik.values.city,
        shippingState: formik.values.state,
        shippingPincode: formik.values.pincode,
        shippingStateUTCode: formik.values.stateUTCode
      });
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col justify-start gap-2 w-screen mx-10 lg:mx-20">
      <div className="flex flex-col gap-4 md:flex-row md:gap-11">
        <Form 
          heading="Billing Details" 
          details={formik.values} 
          errors={formik.errors} 
          touched={formik.touched} 
          handleChange={formik.handleChange} 
          handleBlur={formik.handleBlur}
        />
        <Form 
          heading="Shipping Details" 
          details={sameAddress ? formik.values : {
            name: formik.values.shippingName,
            address: formik.values.shippingAddress,
            city: formik.values.shippingCity,
            state: formik.values.shippingState,
            pincode: formik.values.shippingPincode,
            stateUTCode: formik.values.shippingStateUTCode
          }} 
          errors={formik.errors} 
          touched={formik.touched} 
          handleChange={formik.handleChange} 
          handleBlur={formik.handleBlur}
        />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="sameAddress"
          checked={sameAddress}
          onChange={handleSameAddressChange}
        />
        <label htmlFor="sameAddress">Shipping address same as billing address</label>
      </div>
      <div className="flex flex-col gap-2 lg:w-1/3">
        <label className="text-xl font-semibold mt-10">Place of Delivery</label>
        <input 
          type="text"
          placeholder="Place of Delivery"
          className="form-input"
          name="placeOfDelivery"
          value={formik.values.placeOfDelivery}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.placeOfDelivery && formik.errors.placeOfDelivery && (
          <div className="text-red-500">{formik.errors.placeOfDelivery}</div>
        )}
      </div>
      <div className="flex justify-center ">
        <button 
          type="submit"
          className="w-[200px] bg-blue-500 text-white px-4 py-2 rounded-md">
          Next
        </button>
      </div>
    </form>
  )
}

export default BillingAndShipping;
