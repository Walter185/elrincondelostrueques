import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {
  deleteObject,
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const DeleteFile = async (fileRef) => {
  try {
    await deleteObject(fileRef);
    console.log("Archivo eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    throw error; // Puedes manejar el error según tu lógica de aplicación
  }
};

export const uploadFile = (file, imageRef, setProgress, setRemoteImg) => {
  const storageRef = ref(storage, imageRef);
  const upload = uploadBytesResumable(storageRef, file);
  upload.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
        setRemoteImg({ url: downloadURL, imageRef: imageRef });
      });
    }
  );
};

export async function getAllProducts() {
  const productsRef = collection(db, "productos");
  const snapshot = await getDocs(productsRef);

  const products = snapshot.docs.map((element) => {
    let product = element.data();
    product.id = element.id;
    product.imgUrls = product.imgUrls || [];
    return product;
  });

  return products;
}

export const getAllProductsbyOwner = async () => {
  const q = query(
    collection(db, "productos"),
    where("owner", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });
  return products;
};

export async function getUltimosProductos() {
  try {
    const productsRef = collection(db, "productos");
    const q = query(productsRef, orderBy("timestamp", "desc"), limit(4));
    const snapshot = await getDocs(q);

    const lastFourProducts = snapshot.docs.map((doc) => {
      let product = doc.data();
      product.id = doc.id;
      return product;
    });

    return lastFourProducts;
  } catch (error) {
    console.error("Error al obtener los últimos 4 productos:", error);
    return [];
  }
}

export async function getProductsByCategory(categoryid) {
  const productsRef = collection(db, "productos");
  const qry = query(productsRef, where("category", "==", categoryid));
  const snapshot = await getDocs(qry);

  const products = snapshot.docs.map((element) => {
    let product = element.data();
    product.id = element.id;
    return product;
  });

  return products;
}

export async function getProductsByName(searchid) {
  const productsRef = collection(db, "productos");
  const snapshot = await getDocs(productsRef);

  let products = snapshot.docs.map((element) => {
    let product = element.data();
    product.id = element.id;
    return product;
  });

  products = products.filter(
    (el) =>
      el.nombreProducto.toLowerCase().includes(searchid.trim().toLowerCase()) ||
      el.departamento.toLowerCase().includes(searchid.trim().toLowerCase()) ||
      el.description.toLowerCase().includes(searchid.trim().toLowerCase()) ||
      el.category.toLowerCase().includes(searchid.trim().toLowerCase())
  );
  return products;
}

export async function getProduct(id) {
  const productsRef = collection(db, "productos");
  const docRef = doc(productsRef, id);
  const snapshot = await getDoc(docRef);

  return { ...snapshot.data(), id: snapshot.id };
}

export default db;
