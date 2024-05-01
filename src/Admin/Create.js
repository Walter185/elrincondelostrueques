import { useState } from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment";
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db, { storage, DeleteFile, auth } from "../Firebase/firebase";

const Create = () => {
    const [ owner, setOwner ] = useState("");
    const [nombreProducto, setNombreProducto] = useState("");
    const [categoriaPublicada, setCategoriaPublicada] = useState("");
    const [categoriaDeseada, setCategoriaDeseada] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
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
            categoriaPublicada,
            categoriaDeseada,
            description, 
            imgUrl,
            departamento,
            tel,
            timestamp
        })
        navigate("/")
        alert('Funciono bien');
        setOwner("");
        setNombreProducto("");
        setCategoriaPublicada("");
        setCategoriaDeseada("");
        setDescription("");
        setImgUrl("");
        setTel("");
        setDepartamento("");
        } catch (error) {
            alert('Algo funcionó mal');
            console.log(error.message);
        }

        setOwner();

    };
    // const handleUploadPdf = async (e) => {
    //     const file = e.target.files[0];
    //     const storageRef = ref(storage, `pdfs/${file.name}`);
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     uploadTask.on('state_changed',
    //         null,
    //         (error) => {
    //             console.error('Error uploading PDF:', error);
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 // Update the state with the download URL
    //                 setPdf(downloadURL);
    //             });
    //         }
    //     );
    // };


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


    const handleDeleteFile = async (fileURL) => {
        try {
            const imageRef = ref(storage, fileURL);
            await DeleteFile(imageRef);
            if (fileURL === imgUrl) {
                setImgUrl("");
            } 
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Crear Aviso Nuevo</h1>

                    <form onSubmit={store}>
                        <div className="mb-3">
                            <label className="form-label">Nombre del Producto</label>
                            <input
                                type="text"
                                value={nombreProducto}
                                onChange={(e) => setNombreProducto(e.target.value)}
                                placeholder="Nombre del Producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripcion</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Detalle del Producto"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Categoria Publicada</label>
                            <select
                                value={categoriaPublicada}
                                onChange={(e) => setCategoriaPublicada(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Seleccionar categoría</option>
                                <option value="ropa">Ropa</option>
                                <option value="juguete">Juguete</option>

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
                                <option value="ropa">Ropa</option>
                                <option value="juguete">Juguete</option>

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
                        {/* <div className="mb-3">
                            <label className="form-label">Nombre del Vendedor</label>
                            <input
                                type="text"
                                value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}
                                placeholder="Nombre del Vendedor"
                                className="form-control"
                            />
                        </div> */}

                        <div className="mb-3">
                            <label className="form-label">Telefono del Vendedor</label>
                            <input
                                type="text"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                placeholder="Telefono del Vendedor"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Lugar donde esta el producto</label>
                            <input
                                type="text"
                                value={departamento}
                                onChange={(e) => setDepartamento(e.target.value)}
                                placeholder="Lugar donde esta el producto"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create;