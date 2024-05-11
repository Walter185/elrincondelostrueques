import { createContext, useContext, useEffect, useState } from 'react';
import db, { auth } from '../Firebase/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


const truequeContext = createContext({
  currentUser: null,
  darkMode: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  // forgotPassword: () => Promise,
  resetPassword: () => Promise,
})

export const useAuth = () => useContext(truequeContext)

function TruequeProvider({ children }) {
  const [ cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [ currentUser, setCurrentUser] = useState(null)
  const [ theme, setTheme] = useState('light');
  const [ loading, setLoading] = useState(true);
  
  const toggleTheme = () => {
    setTheme( theme === 'light' ? 'dark' : 'light');
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user ? user : null)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser])

  
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (nombre, apellido, nacimiento, email, password ) => {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", auth?.currentUser?.uid), {
          nombre,
          apellido,
          nacimiento,
          email,
          password
        });
     
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(email);
  };

  function logout() {
    return signOut(auth)
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  useEffect(() => {
    (cart.length > 0) ? localStorage.setItem('cart', JSON.stringify(cart)) : localStorage.clear();

  }, [cart]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  // function addToCart(product){
  //     let newCart = [...cart];

  //     let index = cart.findIndex( element => element.id === product.id);
  //     (index !== -1) ? newCart[index].quantity += product.quantity : newCart.push(product);

  //     setCart(newCart);
  // }

  // function removeFromCart(id){
  //     let newCart = [...cart];

  //     let index = newCart.findIndex( element => element.id === id);
  //     if(index !== -1){
  //         (newCart[index].quantity > 1) ? newCart[index].quantity-- : newCart.splice(index, 1);
  //         setCart(newCart);
  //     }
  // }

  // function clearCart() {
  //   setCart([]);
  // }

  // function inCart(id){
  //     let index = cart.findIndex( element => element.id === id);
  //     let state = (index !== -1) ? true : false;
  //     return state;
  // }

  // function getTotalQuantity(){
  //     let totalQ = 0;
  //     for(const product of cart){
  //         totalQ += product.quantity;
  //     }
  //     return totalQ;
  // }

  // function getTotalPrice(){
  //     let totalP = 0;
  //     for(const product of cart){
  //         totalP += (product.price * product.quantity);
  //     }
  //     return totalP;
  // }

  const value={
    cart,
    // addToCart,
    currentUser,
    theme, 
    toggleTheme,
    signInWithGoogle,
    login,
    register,
    logout,
    resetPassword,
    // removeFromCart, 
    // inCart, 
    // clearCart, 
    // getTotalQuantity, 
    // getTotalPrice 
  };

  return (
    <truequeContext.Provider value={value}>
     {!loading && children}
  </truequeContext.Provider>
  )
}

export { TruequeProvider, truequeContext};
