import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './Components/Navbar';
import { CartProvider } from './Context/context';
import { ToastContainer } from 'react-toastify';
import Loginpage from './Components/Login';
import Registerpage from './Components/Register';
import NotFound from './pages/ErrorPage';


function App(props) {
  return (
    <>
        <ToastContainer autoClose={2000} hideProgressBar />
        <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes >
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
