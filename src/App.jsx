import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SellerDetails from './components/SellerDetails';
import BillingAndShipping from './components/BillingAndShipping';
import OrderInvoiceItemForm from './components/OrderInvoiceItemForm';
import { RecoilRoot } from 'recoil';
import Invoice from './components/Invoice';

function App() {
  return (
    <main className='flex h-full w-full items-center'>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/seller-details" element={<SellerDetails/>} />
            <Route path='/billing-and-shipping' element={<BillingAndShipping/>} />
            <Route path='/invoice-detials' element={<OrderInvoiceItemForm />} />
            <Route path='/invoice' element={<Invoice />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </main>
  )
}

export default App;
