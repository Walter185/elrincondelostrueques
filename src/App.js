import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './Components/Navbar';
import { TruequeProvider } from './Context/context';
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


function App(props) {
  return (
    <>
      <ToastContainer autoClose={2000} hideProgressBar />
      <TruequeProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes >
            <Route exact path="/" element={<LandingPage />} />
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
          </Routes>
   
        </BrowserRouter>

      </TruequeProvider>
    </>
  );
}

export default App;
