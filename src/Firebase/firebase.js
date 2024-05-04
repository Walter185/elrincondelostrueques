import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { deleteObject, ref, getStorage, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

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
const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();


export const DeleteFile = (imageRef) => {
    const StorageRef = ref(storage, imageRef);
    return deleteObject(StorageRef);
};

export const uploadFile = (file, imageRef, setProgress, setRemoteImg) => {
    const storageRef = ref(storage, imageRef);
    const upload = uploadBytesResumable(storageRef, file);
    upload.on('state_changed',
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
}


export async function getAllProducts(){
    const productsRef = collection(db, "productos");
    const snapshot = await getDocs(productsRef);

    const products = snapshot.docs.map(element => {
        let product = element.data();
        product.id = element.id;
        return product;
    });

    return products;
}
export async function getAllProductsbyOwner(){
    const productsRef = collection(db, "productos");
    const qry = query(productsRef, where("owner", "==", auth?.currentUser?.uid));
    const snapshot = await getDocs(qry);
    const products = snapshot.docs.map(element => {
        let product = element.data();
        product.id = element.id;
        return product;
    });

    return products;
}

export async function getProductsByCategory(categoryid){
    const productsRef = collection(db, "productos");
    const qry = query(productsRef, where("category", "==", categoryid ));
    const snapshot = await getDocs(qry);

    const products = snapshot.docs.map(element => {
        let product = element.data();
        product.id = element.id;
        return product;
    });

    return products;
}

  export async function getProductsByName(searchid){
    const productsRef = collection(db, "productos");
    const snapshot = await getDocs(productsRef);

    let products = snapshot.docs.map(element => {
        let product = element.data();
        product.id = element.id;
        return product;
    });

    products = products.filter((el)=>el.nombreProducto.toLowerCase().includes(searchid.trim().toLowerCase()) || el.departamento.toLowerCase().includes(searchid.trim().toLowerCase()) || el.description.toLowerCase().includes(searchid.trim().toLowerCase())|| el.category.toLowerCase().includes(searchid.trim().toLowerCase()));
    return products;
}

export async function getProduct(id){
    const productsRef = collection(db, "productos");
    const docRef = doc(productsRef, id)
    const snapshot = await getDoc(docRef);

    return { ...snapshot.data(), id: snapshot.id };
}


export default db;