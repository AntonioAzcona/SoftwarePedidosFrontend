import { faCartPlus, faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api/axios";

export const Cliente = ({ client, setIsDelete = false, actionButtons = true }) => {

    const { _id, nombre, apellido, empresa, email, telefono } = client;

    const handleDelete = async () => {
        Swal.fire({
            title: "¿Está seguro de eliminar este cliente?",
            text: "¡No podrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
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
                            if (result.isConfirmed) {
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
                    <ul className="list-group list-group-flush mb-3">
                        <li className="list-group-item"><strong>Nombre de la empresa:</strong> {empresa}</li>
                        <li className="list-group-item"><strong>Correo:</strong> {email}</li>
                        <li className="list-group-item"><strong>Telefono:</strong> {telefono}</li>
                    </ul>

                    {
                        actionButtons &&
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">

                            <Link className="list-group-item" to={`/clientes/editar/${_id}`}>
                                <button className="btn btn-primary" type="button"><FontAwesomeIcon icon={faUserPen} /> Editar</button>
                            </Link>
                            <Link className="list-group-item" to={`/pedidos/nuevo/${_id}`}>
                                <button className="btn btn-warning" type="button"><FontAwesomeIcon icon={faCartPlus} /> Nuevo pedido</button>
                            </Link>
                            <button className="btn btn-danger" type="button" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Eliminar</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
