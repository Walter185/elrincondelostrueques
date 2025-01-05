import React, { useRef, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DividerWithText from '../DividerWithText/index'; // Assuming DividerWithText component is already implemented
import { useAuth } from '../../Context/context';
import "./Login.css"
import validator from "validator";
import { Button } from 'react-bootstrap';

export const Loginpage = () => {
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef = useRef(null);
  const location = useLocation();
  const passwordRef = useRef(null);


  const handleRedirectToOrBack = () => {
    navigate(location.state?.from ?? '/show');
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const { email, password } = getInputs();
      if (isUserCredentialsValid(email, password)) {
        await login(email, password);
        handleRedirectToOrBack();
      } else {
        setError(true);
        setErrorMessage('Ingresa un correo electrónico en forma correcta.');
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage('Email o contraseña incorrectos, vuelve a intentar.');
    }
  };

  const getInputs = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    return { email, password };
  };

  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  return (
    <>
      <div className="App">
        <h1 className="text-center my-12">Iniciar sesión</h1>
        <div className="contenedor">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="block mb-1 text-sm font-medium">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    placeholder='Ingrese su correo...'
                    required
                    ref={emailRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="block mb-1 text-sm font-medium">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    placeholder='Ingrese su contraseña...'
                    required
                    ref={passwordRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <Button type="submit" id='botonLogin'>
                  Ingresar
                </Button>
                {error && (
                  <div className="text-red-500 mt-2 error-message">{errorMessage}</div>
                )}
              </form>
              <span className="flex">
               <Link to="/forgot" className="text-blue-500 hover:underline">
                  Olvidó su contraseña?</Link> 
              </span>
              <span className="flex">
                <Link to="/register" className="text-blue-500 hover:underline">
                  Registrarse</Link>
              </span>
                <DividerWithText><span className='o'>o</span></DividerWithText>
                <Button 
                    className='btn btn-danger'
                    onClick={() =>
                    signInWithGoogle()
                    .then(user => {
                      handleRedirectToOrBack()
                      console.log(user)
                    })
                    .catch(e => console.log(e.message))
                  } id='botonGoogle'>
                        <FaGoogle />
                        <span> Ingresar con Google</span>
              </Button>
            </div>
            </div>
          </div>
        </div>
s    </>
  );
};
