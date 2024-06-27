import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col justify-center items-center h-screen w-screen gap-7'>
            <img 
              src={logo}
              alt="Amazon Logo"
              className='object-fill h-20'
            />
            <button className="btn"
                onClick={() => {
                    navigate('/seller-details')
                }}
            >Create Invoice</button>
        </div>
    )
}
export default Home