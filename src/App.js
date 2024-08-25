import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import { Loginpage } from './Components/Login';
import Registerpage from './Components/Register';
import NotFound from './pages/ErrorPage';
import Show from './Admin/Show';
import Edit from './Admin/Edit';
import Create from './Admin/Create';
import RequireAuth from './Components/Login/RequireAuth';
import ItemListContainer from './Components/ItemListContainer';
import ForgotPassword from './Components/Forgot';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import { Foot } from './Components/Footer';
import HomeContainer from './Components/Homecontainer';
import { Cafecito } from './Components/Cafecito';
import { Condiciones } from './Components/Condiciones';

function App(props) {
  return (
    <>
      <ToastContainer autoClose={2000} hideProgressBar />
        <BrowserRouter>
          <Navbar/>
          <Routes >
            <Route exact path="/" element={<HomeContainer />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/category/:categoryid" element={<ItemListContainer />} />
            <Route path="/search/:searchid" element={<ItemListContainer />} />
            <Route path="/show" element={<RequireAuth><Show /></RequireAuth>} />
            <Route path="/create" element={<RequireAuth><Create /></RequireAuth>} />
            <Route path="/edit/:id" element={<RequireAuth><Edit /></RequireAuth>} />
            <Route path='/cafecito' element={<Cafecito />} />
            <Route path='/condiciones' element={<Condiciones />} />
          </Routes>
          <Foot />
        </BrowserRouter>
    </>
  );
}

export default App;
