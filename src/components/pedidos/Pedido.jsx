import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api/axios";
import { Producto } from "../productos/Producto";

export const Pedido = ({ pedido: order, setIsDelete }) => {

    const { _id, cliente, pedido, total } = order;

    const handleDelete = async () => {
        Swal.fire({
            title: "¿Está seguro de eliminar este pedido?",
            text: "¡No podrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Si, eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/pedidos/${_id}`)
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
                    <h5 className="card-title">Cliente: {cliente.nombre} {cliente.apellido}</h5>
                    <div className="row">
                        {
                            pedido?.map(producto => (
                                <Producto
                                    key={producto.producto._id}
                                    product={producto.producto}
                                    botones={false}
                                />
                            ))
                        }
                    </div>
                    <h5 className="card-title">Total: ${ total }</h5>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">

                        <Link className="list-group-item" to={`/pedidos/editar/${_id}`}>
                            <button className="btn btn-primary" type="button"><FontAwesomeIcon icon={faUserPen} /> Editar</button>
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
