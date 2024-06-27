import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sellerDetails } from "../store/atoms/atoms";

const SellerDetails = () => {
  const navigate = useNavigate();
  const [seller, setSeller] = useRecoilState(sellerDetails);

  const formik = useFormik({
    initialValues: {
      name: seller.name,
      address: seller.address,
      city: seller.city,
      state: seller.state,
      pincode: seller.pincode,
      PAN_No: seller.PAN_No,
      GST_No: seller.GST_No,
      placeOfSupply: seller.placeOfSupply,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      pincode: Yup.string().matches(/^\d{6}$/, 'Invalid pincode').required('Required'),
      PAN_No: Yup.string().matches(/^[A-Z]{5}\d{4}[A-Z]$/, 'Invalid PAN No.').required('Required'),
      GST_No: Yup.string()
      .matches(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        'Invalid GST No.'
      )
      .required('Required'),
      placeOfSupply: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      setSeller(values);
      navigate("/billing-and-shipping");
    },
  });

  return (
    <div className="flex flex-col justify-start items-center w-screen mx-10">
      <h1 className="text-2xl font-bold m-5">Enter Seller Details</h1>
      <form className="flex flex-col w-full lg:w-1/2 gap-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="form-label">Seller Name</label>
          <input
            type="text"
            placeholder="Enter Seller Name"
            className="form-input"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="form-label">Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            className="form-input"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-500">{formik.errors.address}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 md:flex-row justify-between">
            <div className="flex flex-col gap-2">
            <label className="form-label">City</label>
            <input
                type="text"
                placeholder="Enter City"
                className="form-input"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? (
                <div className="text-red-500">{formik.errors.city}</div>
            ) : null}
            </div>

            <div className="flex flex-col gap-2">
            <label className="form-label">State</label>
            <input
                type="text"
                placeholder="Enter State"
                className="form-input"
                name="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
            />
            {formik.touched.state && formik.errors.state ? (
                <div className="text-red-500">{formik.errors.state}</div>
            ) : null}
            </div>

            <div className="flex flex-col gap-2">
            <label className="form-label">Pincode</label>
            <input
                type="number"
                placeholder="Enter Pincode"
                className="form-input"
                name="pincode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pincode}
            />
            {formik.touched.pincode && formik.errors.pincode ? (
                <div className="text-red-500">{formik.errors.pincode}</div>
            ) : null}
            </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="form-label">PAN No.</label>
          <input
            type="text"
            placeholder="Enter PAN No."
            className="form-input"
            name="PAN_No"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.PAN_No}
          />
          {formik.touched.PAN_No && formik.errors.PAN_No ? (
            <div className="text-red-500">{formik.errors.PAN_No}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="form-label">GST No.</label>
          <input
            type="text"
            placeholder="Enter GST No."
            className="form-input"
            name="GST_No"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.GST_No}
          />
          {formik.touched.GST_No && formik.errors.GST_No ? (
            <div className="text-red-500">{formik.errors.GST_No}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="form-label">Place of Supply</label>
          <input
            type="text"
            placeholder="Enter Place of Supply"
            className="form-input"
            name="placeOfSupply"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.placeOfSupply}
          />
          {formik.touched.placeOfSupply && formik.errors.placeOfSupply ? (
            <div className="text-red-500">{formik.errors.placeOfSupply}</div>
          ) : null}
        </div>

        <div className="flex justify-between">
          <button
            className="w-[200px] bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => navigate('/')}>
            Previous
          </button>
          <button
            className="w-[200px] bg-blue-500 text-white px-4 py-2 rounded-md"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerDetails;