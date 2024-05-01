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
  confirmPasswordReset,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


export const cartContext = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
})

export const useAuth = () => useContext(cartContext)


function CartProvider(props) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [currentUser, setCurrentUser] = useState(null)

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

  const register = async (email, password, confirmPassword, nombre, apellido) => {
    if (password === confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert(currentUser.uid);
        await setDoc(doc(db, "users", auth?.currentUser?.uid), {
          nombre,
          apellido,
          email,
          password
        });
      } catch (err) {
        //handeling error
        console.error(err);
        alert('Hubo un error')
      }
    } else {
      alert('La contraseña no es la misma')
    }
  };

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

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

  function clearCart() {
    setCart([]);
  }

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

  return (
    <cartContext.Provider value={{
      cart,
      // addToCart,
      currentUser,
      signInWithGoogle,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      // removeFromCart, 
      // inCart, 
      // clearCart, 
      // getTotalQuantity, 
      // getTotalPrice 
    }}>
      {props.children}
    </cartContext.Provider>
  )
}

export { CartProvider }
