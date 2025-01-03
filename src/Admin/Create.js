import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db, { storage, DeleteFile, auth } from "../Firebase/firebase";
import "./Create.css";
import moment from "moment";
import { Button } from "react-bootstrap";

const Create = () => {
    const [owner, setOwner] = useState("");
    const [nombreProducto, setNombreProducto] = useState("");
    const [nombreVendedor, setNombreVendedor] = useState("");
    const [category, setCategory] = useState("");
    const [categoriaDeseada, setCategoriaDeseada] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrls, setImgUrls] = useState([]);
    const [tel, setTel] = useState("");
    const [departamento, setDepartamento] = useState("");
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        if (imgUrls.length === 0) {
            alert('Debe cargar al menos una imagen.');
            return;
        }

        const timestamp = moment().format();
        try {
            const docRef = await addDoc(collection(db, "productos"), {
                owner: auth?.currentUser?.uid,
                nombreProducto,
                nombreVendedor,
                category,
                categoriaDeseada,
                description,
                imgUrls,
                departamento,
                tel,
                timestamp,
            });

            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                departamento,
                tel,
                productos: [docRef.id]
            });

            navigate("/show");
            alert('Aviso creado satisfactoriamente');
            setOwner("");
            setNombreProducto("");
            setNombreVendedor("");
            setCategory("");
            setCategoriaDeseada("");
            setDescription("");
            setImgUrls([]);
            setDepartamento("");
            setTel("");
        } catch (error) {
            alert('Algo funcionó mal');
            console.log(error.message);
        }
    };

    const handleUpload = async (e) => {
        if (imgUrls.length >= 4) {
            alert("Tú puedes cargar un máximo de 4 imágenes.");
            return;
        }

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
                    setImgUrls((prevImgUrls) => [...prevImgUrls, downloadURL]);
                });
            }
        );
    };

    const handleDeleteFile = async (fileURL) => {
        try {
            const imageRef = ref(storage, fileURL);
            await DeleteFile(imageRef);
            setImgUrls((prevUrls) => prevUrls.filter((url) => url !== fileURL));
            navigate("/show");
        } catch (error) {
            console.error("Error eliminando la imagen:", error);
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
                            <label className="form-label">Descripción</label>
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
                                <option value="Electrodomésticos">Electrodomésticos</option>
                                <option value="Herramientas">Herramientas</option>
                                <option value="Construcción">Construcción</option>
                                <option value="Moda">Moda</option>
                                <option value="Juguetes">Juguetes</option>
                                <option value="Bebés">Bebés</option>
                                <option value="Vehículos">Vehículos</option>
                                <option value="Mascotas">Mascotas</option>
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
                                <option value="Electrodomésticos">Electrodomésticos</option>
                                <option value="Herramientas">Herramientas</option>
                                <option value="Construcción">Construcción</option>
                                <option value="Moda">Moda</option>
                                <option value="Juguetes">Juguetes</option>
                                <option value="Bebés">Bebés</option>
                                <option value="Mascotas">Mascotas</option>
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
                            {imgUrls.map((url, index) => (
                                <div key={index}>
                                    <img src={url} alt={`Preview ${index + 1}`} className="Preview" />
                                    <Button className="btn btn-danger" onClick={() => handleDeleteFile(url)}>Borrar Imagen</Button>
                                </div>
                            ))}
                            {imgUrls.length < 4 && (
                                <div className="mb-3">
                                    <label className="form-label">Subir Imagen Adicional</label>
                                    <input
                                        type="file"
                                        accept="image/*;capture=camera"
                                        onChange={handleUpload}
                                        className="form-control"
                                    />
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
                            <label className="form-label">Lugar donde está el trueque</label>
                            <select
                                value={departamento}
                                required
                                onChange={(e) => setDepartamento(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Seleccionar Lugar</option>
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
                        <button type="submit" id="btnCrear" className="btn btn-primary">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;
