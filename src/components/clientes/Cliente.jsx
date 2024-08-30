import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api/axios";

export const Cliente = ({ client, setIsDelete }) => {

    const { _id, nombre, apellido, empresa, email, telefono } = client;

    const handleDelete = async() => {
        Swal.fire({
            title: "¿Está seguro de eliminar este cliente?",
            text: "¡No podrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Si, eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/clientes/${_id}`)
                    .then(response => {
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "El cliente fué eliminado con éxito",
                            icon: "success",
                            confirmButtonColor: "#198754"
                        }).then(result => {
                            if(result.isConfirmed) {
                                // window.location.reload();
                                setIsDelete(true);
                            }
                        });
                    });
            }
        });        
    }

    return (
        <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{nombre} {apellido}</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{empresa}</li>
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">{telefono}</li>
                    </ul>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">

                        <Link className="list-group-item" to={`/clientes/editar/${_id}`}>
                            <button className="btn btn-primary" type="button"><FontAwesomeIcon icon={faUserPen} /> Editar</button>
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
