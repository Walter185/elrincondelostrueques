import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db, { storage, DeleteFile, auth } from "../Firebase/firebase";
import { useAuth } from "../Context/context";
import "./Edit.css"

function Edit() {
    const [category, setCategory] = useState("");
    const [categoriaDeseada, setCategoriaDeseada] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [imgUrl2, setImgUrl2] = useState("");
    const [tel, setTel] = useState("");
    const [owner, setOwner] = useState("");
    const [nombreProducto, setNombreProducto] = useState("");
    const [nombreVendedor, setNombreVendedor] = useState("");
    const [departamento,  setDepartamento] = useState("");
    const navigate = useNavigate()
    const location = useLocation();
    const { id } = useParams()
    const { logout } = useAuth();

    useEffect(() => {


        const getProductById = async () => {
            const product = await getDoc(doc(db, "productos", id))
            if (product.exists()) {
                setNombreProducto(product.data().nombreProducto)
                setNombreVendedor(product.data().nombreVendedor)
                setDepartamento(product.data().departamento)
                setCategoriaDeseada(product.data().categoriaDeseada)
                setCategory(product.data().category)
                setDescription(product.data().description)
                setImgUrl(product.data().imgUrl)
                setImgUrl2(product.data().imgUrl2)
                setTel(product.data().tel)
                setOwner(product.data().owner)
            } else {
                console.log("El producto no existe")
            }
        }
        getProductById()
    }, [id])
    
    const handleRedirectToOrBack = () => {
        navigate(location.state?.from ?? '/');
      };
    
    const updateProduct = async (e) => {
        e.preventDefault()
        if (owner === auth?.currentUser?.uid) {
        const product = doc(db, "productos", id)
        const data = {
            nombreProducto: nombreProducto, 
            nombreVendedor: nombreVendedor,
            category: category,
            categoriaDeseada: categoriaDeseada, 
            description: description, 
            imgUrl: imgUrl,
            imgUrl2: imgUrl2,
            tel: tel,
            departamento: departamento
        }
        await updateDoc(product, data)
        navigate("/show")
    }else {
        console.log("No deberias hacer esto, otro intento y quedara bloqueada tu cuenta.", auth?.currentUser?.displayName)
        await logout();
        handleRedirectToOrBack();

    }
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            null,
            (error) => {
                console.error('Error uploading file:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    };
    const handleUpload2 = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            null,
            (error) => {
                console.error('Error uploading file:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl2(downloadURL);
                });
            }
        );
    };

    
    const handleDeleteFile = async (fileURL) => {
        try {
            const imageRef = ref(storage, fileURL);
            await DeleteFile(imageRef);
            if (fileURL === imgUrl) {
                setImgUrl("");
            } 
            navigate("/show")
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };
    const handleDeleteFile2 = async (fileURL) => {
        try {
            const imageRef = ref(storage, fileURL);
            await DeleteFile(imageRef);
            if (fileURL === imgUrl2) {
                setImgUrl2("");
            } 
            navigate("/show")
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

 
    return (
        <div className="container_edit">
            <div className="row">
                <div className="col">
                    <h1 id="edit_titulo">Editar Aviso</h1>

                    <form onSubmit={updateProduct}>
                        <div className="mb-3">
                        <label className="form-label">Nombre del Producto</label>
                            <input
                                type="text"
                                value={nombreProducto}
                                onChange={(e) => setNombreProducto(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Persona de contacto</label>
                            <input
                                type="text"
                                value={nombreVendedor}
                                onChange={(e) => setNombreVendedor(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripcion</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Categoria Publicada</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Seleccionar categoría</option>
                                <option value="Tecnología">Tecnología</option>
                                <option value="Accesorios">Accesorios para Vehículos</option>
                                <option value="Salud">Salud</option>
                                <option value="Belleza">Belleza y Cuidado Personal</option>
                                <option value="Deportes">Deportes</option>
                                <option value="Hogar">Hogar y Muebles</option>
                                <option value="Electrodomesticos">Electrodomesticos</option>
                                <option value="Herramientas">Herramientas</option>
                                <option value="Contrucción">Contrucción</option>
                                <option value="Moda">Moda</option>
                                <option value="Juguetes">Juguetes</option>
                                <option value="Bebés">Bebés</option>
                                <option value="Vehículos">Vehículos</option>
                                <option value="Servicios">Servicios</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Categoria Buscada</label>
                            <select
                                value={categoriaDeseada}
                                onChange={(e) => setCategoriaDeseada(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Seleccionar categoría</option>
                                <option value="Tecnología">Tecnología</option>
                                <option value="Accesorios">Accesorios para Vehículos</option>
                                <option value="Salud">Salud</option>
                                <option value="Belleza">Belleza y Cuidado Personal</option>
                                <option value="Deportes">Deportes</option>
                                <option value="Hogar">Hogar y Muebles</option>
                                <option value="Electrodomesticos">Electrodomesticos</option>
                                <option value="Herramientas">Herramientas</option>
                                <option value="Contrucción">Contrucción</option>
                                <option value="Moda">Moda</option>
                                <option value="Juguetes">Juguetes</option>
                                <option value="Bebés">Bebés</option>
                                <option value="Vehículos">Vehículos</option>
                                <option value="Servicios">Servicios</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Subir Imagen</label>
                            <input
                                type="file"
                                accept="image/*;capture=camera"
                                onChange={handleUpload}
                                className="form-control"
                            />
                            {imgUrl && (
                                <div>
                                    <img src={imgUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    <button onClick={() => handleDeleteFile(imgUrl)}>Eliminar Imagen</button>
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Subir Imagen 2</label>
                            <input
                                type="file"
                                accept="image/*;capture=camera"
                                onChange={handleUpload2}
                                className="form-control"
                            />
                            {imgUrl2 && (
                                <div>
                                    <img src={imgUrl2} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    <button onClick={() => handleDeleteFile2(imgUrl2)}>Eliminar Imagen 2</button>
                                </div>
                            )}
                        </div>
                       
                        <div className="mb-3">
                            <label className="form-label">Telefono del Vendedor</label>
                            <input
                                type="number"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                placeholder="Telefono del Vendedor"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Lugar donde esta el producto</label>
                            <select
                                value={departamento}
                                onChange={(e) => setDepartamento(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Seleccionar Departamento</option>
                                <option value="Soriano">Soriano</option>
                                <option value="Artigas">Artigas</option>
                                <option value="Canelones">Canelones</option>
                                <option value="Cerro Largo">Cerro Largo</option>
                                <option value="Colonia">Colonia</option>
                                <option value="Durazno">Durazno</option>
                                <option value="Flores">Flores</option>
                                <option value="Florida">Florida</option>
                                <option value="Lavalleja">Lavalleja</option>
                                <option value="Maldonado">Maldonado</option>
                                <option value="Montevideo">Montevideo</option>
                                <option value="Paysandú">Paysandú</option>
                                <option value="Río Negro">Río Negro</option>
                                <option value="Rivera">Rivera</option>
                                <option value="Rocha">Rocha</option>
                                <option value="Salto">Salto</option>
                                <option value="San José">San José</option>
                                <option value="Tacuarembó">Tacuarembó</option>
                                <option value="Treinta y Tres">Treinta y Tres</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" id="boton_edit">Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit;