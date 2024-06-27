import React from 'react';
import bin from '../assets/bin.png';
import { useRecoilState } from 'recoil';
import { itemsState } from '../store/atoms/atoms';

const OrderForm = () => {
  const [items, setItems] = useRecoilState(itemsState);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setItems(prevItems => prevItems.map((item, i) => i === index ? { ...item, [name]: value } : item));
  };

  const handleAdd = () => {
    setItems([...items, { description: '', unitPrice: '', quantity: '', discount: '', taxRate: 18 }]);
  };

  const handleDelete = (index) => {
    const list = [...items];
    list.splice(index, 1);
    setItems(list);
  };

  return (
    <div className='flex w-full lg:w-4/5 flex-col gap-3'>
      <div className='flex w-full gap-2'>
        <label className='w-1/12 font-medium'>Sr. No</label>
        <label className='w-1/6 font-medium'>Description</label>
        <label className='w-1/6 font-medium'>Unit Price</label>
        <label className='w-1/6 font-medium'>Quantity</label>
        <label className='w-1/6 font-medium'>Discount</label>
        <label className='w-1/6 font-medium'>Net Amount</label>
        <label className='w-1/6 font-medium'>Tax Rate</label>
        <label className='w-1/12 font-medium'>Delete</label>
      </div>
      {items.map((item, index) => (
        <div key={index} className='flex w-full gap-2'>
          <span className='w-1/12'>{index + 1}</span>
          <input className='w-1/6' name="description" value={item.description} onChange={e => handleChange(e, index)} placeholder="Description" />
          <input className='w-1/6' name="unitPrice" value={item.unitPrice} onChange={e => handleChange(e, index)} placeholder="Unit Price" type="number" />
          <input className='w-1/6' name="quantity" value={item.quantity} onChange={e => handleChange(e, index)} placeholder="Quantity" type="number" />
          <input className='w-1/6' name="discount" value={item.discount} onChange={e => handleChange(e, index)} placeholder="Discount" type="number" />
          <input className='w-1/6' name="netAmount" value={(item.unitPrice * item.quantity - item.discount)} readOnly placeholder="Net Amount" type="number" />
          <input className='w-1/6' name="taxRate" value={item.taxRate} onChange={e => handleChange(e, index)} placeholder="Tax Rate" type="number" />
          <button type="button" className='w-1/12' onClick={() => handleDelete(index)}>
            <img src={bin} alt='delete' className='w-5 h-5'/>
          </button>
        </div>
      ))}
      <button type="button" className='bg-black text-sm text-white p-2 rounded-md w-1/6 min-w-28' onClick={handleAdd}>Add Item</button>
    </div>
  );
};

export default OrderForm;
