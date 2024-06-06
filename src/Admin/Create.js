import { useState } from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment";
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db, { storage, DeleteFile, auth } from "../Firebase/firebase";
import "./Create.css"

const Create = () => {
    const [ owner, setOwner ] = useState("");
    const [nombreProducto, setNombreProducto] = useState("");
    const [nombreVendedor, setNombreVendedor] = useState("");
    const [category, setCategory] = useState("");
    const [categoriaDeseada, setCategoriaDeseada] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [imgUrl2, setImgUrl2] = useState("");
    const [tel, setTel] = useState("");
    const [departamento, setDepartamento] = useState("");
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        const timestamp = moment().format();
        try {
            await addDoc(collection(db,"productos"), {
            owner: auth?.currentUser?.uid, 
            nombreProducto,
            nombreVendedor,
            category,
            categoriaDeseada,
            description, 
            imgUrl,
            imgUrl2,
            departamento,
            tel,
            timestamp
        })
        navigate("/")
        alert('Aviso creado satisfactoriamente');
        setOwner("");
        setNombreProducto("");
        setNombreVendedor("");
        setCategory("");
        setCategoriaDeseada("");
        setDescription("");
        setImgUrl("");
        setImgUrl2("");
        setDepartamento("");
        setTel("");
        } catch (error) {
            alert('Algo funcionó mal');
            console.log(error.message);
        }
        setOwner();

    };
    

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
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="container_create">
            <div className="row">
                <div className="col">
                    <h1 id="crear_titulo">Crear Aviso Nuevo</h1>
                    <form onSubmit={store}>
                        <div className="mb-3">
                            <label className="form-label">Nombre del Producto</label>
                            <input
                                type="text"
                                required
                                value={nombreProducto}
                                onChange={(e) => setNombreProducto(e.target.value)}
                                placeholder="Ingrese Nombre del Producto..."
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Persona de contacto</label>
                            <input
                                type="text"
                                required
                                value={nombreVendedor}
                                onChange={(e) => setNombreVendedor(e.target.value)}
                                placeholder="Ingrese su nombre..."
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripcion</label>
                            <input
                                type="text"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ingrese Detalle del Producto..."
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Categoria Publicada</label>
                            <select
                                value={category}
                                required
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
                                required
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
                                required
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
                                required
                                accept="image/*;capture=camera"
                                onChange={handleUpload2}
                                className="form-control"
                            />
                            {imgUrl && (
                                <div>
                                    <img src={imgUrl2} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    <button onClick={() => handleDeleteFile2(imgUrl2)}>Eliminar Imagen</button>
                                </div>
                            )}
                        </div>
                    
                        <div className="mb-3">
                            <label className="form-label">Teléfono de Contacto</label>
                            <input
                                type="number"
                                required
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                placeholder="Ingrese teléfono de contacto..."
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Lugar donde esta el trueque</label>
                            <select
                                value={departamento}
                                required
                                onChange={(e) => setDepartamento(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Seleccionar Departamento</option>
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
                                <option value="Soriano">Soriano</option>
                                <option value="Tacuarembó">Tacuarembó</option>
                                <option value="Treinta y Tres">Treinta y Tres</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" id="boton_create">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create;