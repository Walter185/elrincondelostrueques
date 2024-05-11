import React, { useState, useEffect, useRef } from 'react';
import { FaGoogle } from 'react-icons/fa';
import DividerWithText from '../DividerWithText/index';
import validator from "validator";
import { useAuth } from '../../Context/context';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Register.css";

export default function Registerpage() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();
  const { register } = useAuth();
  const location = useLocation();
  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const nacimientoRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRedirectToOrBack = () => {
    navigate(location.state?.from ?? '/show');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { nombre, apellido, nacimiento, email, password, confirmPassword } = getInputs();
      if (isSignupValid({ nombre, apellido, nacimiento, email, password, confirmPassword })) {
        await register(nombre, apellido, nacimiento,  email, password );
        handleRedirectToOrBack();
      } else {
        alert(`Cannot create your account, ${email} might be existed, please try again!`);
      }
    } catch (error) {
    }
  };

  const getInputs = () => {
    const nombre = nombreRef.current.value;
    const apellido = apellidoRef.current.value;
    const nacimiento = nacimientoRef.current.value; // Corrected accessing the value
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    return { nombre, apellido, nacimiento, email, password, confirmPassword };
  };

  const isSignupValid = ({ nombre, apellido, nacimiento, email, password, confirmPassword }) => {
    if (validator.isEmpty(nombre) || !validator.isLength(nombre, { min: 3 })) {
      alert("Por favor ingrese su nombre");
      return false;
    }
    if (validator.isEmpty(apellido) || !validator.isLength(apellido, { min: 2 })) {
      alert("Por favor ingrese su apellido");
      return false;
    }
    if (!validator.isEmail(email)) {
      alert("Please input your email");
      return false;
    }
    if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
      alert("Please input your password. You password must have at least 6 characters");
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      alert("Please input your confirm password");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Confirm password and password must be the same");
      return false;
    }
    // Validate age
    const today = new Date();
    const birthDate = new Date(nacimiento);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      alert("Debe ser mayor de edad para registrarse.");
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="App2">
        <h1 className="text-left">Club del Trueque | Registrarse</h1>
        <div className="contenedor">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4">
              <form onSubmit={handleSignup} >
                <div className="form-group">
                  <label htmlFor="nombre" className="block mb-2 text-sm font-medium">Nombre</label>
                  <input
                    type="text"
                    placeholder="Ingrese nombre..."
                    required
                    ref={nombreRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido" className="block mb-2 text-sm font-medium">Apellido</label>
                  <input
                    type="text"
                    placeholder="Ingrese apellido..."
                    required
                    ref={apellidoRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nacimiento" className="block mb-2 text-sm font-medium">Fecha de Nacimiento (Debes ser mayor de edad)</label>
                  <input
                    type="date"
                    required
                    ref={nacimientoRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email address</label>
                  <input
                    type="email"
                    placeholder="Ingrese email..."
                    required
                    ref={emailRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Contraseña</label>
                  <input
                    type="password"
                    placeholder="Ingrese contraseña..."
                    required
                    ref={passwordRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">Confirme contraseña</label>
                  <input
                    type="password"
                    placeholder="Confirme contraseña..."
                    required
                    ref={confirmPasswordRef}
                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button type="submit" id="botonLogin"> Registrarse </button>
                {error && (
                  <div className="text-red-500 mt-2 error-message">{errorMessage}</div>
                )}
              </form>
              <span className="flex">
                <Link to="/forgot" className="text-blue-500 hover:underline">
                  Olvidó su contraseña?
                </Link> 
              </span>
              <span className="flex">
                <Link to="/login" className="text-blue-500 hover:underline">
                  Ya tiene usuario? Ingrese aquí
                </Link>
              </span>
            </div>
            <DividerWithText><span className='o'>o</span></DividerWithText>
            <button onClick={() =>
              signInWithGoogle()
                .then(user => {
                  handleRedirectToOrBack()
                  console.log(user)
                })
                .catch(e => console.log(e.message))
            } id='botonGoogle'>
              <FaGoogle />
              <span> Ingresar con Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
