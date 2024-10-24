import { faBan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api/axios";
import { Producto } from "../productos/Producto";

export const Pedido = ({ pedido: order, setIsDelete }) => {

    const { _id, cliente, pedido, total } = order;

    const handleCancel = async () => {
        Swal.fire({
            title: "¿Está seguro de cancelar este pedido?",
            text: "¡No podrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "¡Si, cancelarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/pedidos/${_id}`)
                    .then(response => {
                        Swal.fire({
                            title: "Cancelado!",
                            text: "El pedido fué cancelado con éxito",
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
                            pedido.map(({producto, cantidad}, index) => (
                                (index < 2) &&
                                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6" key={producto._id + '' + index}>
                                    <Producto
                                        product={producto}
                                        actionButtons={false}
                                        cantidadArt={cantidad}
                                    />
                                </div>
                            ))
                        }
                        {
                            (pedido.length > 2) &&
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <h6>+{pedido.length - 2} productos</h6>
                            </div>
                        }
                    </div>
                    <h5 className="card-title">Total: ${total}</h5>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">

                        <Link className="list-group-item" to={`/pedidos/${_id}`}>
                            <button className="btn btn-info" type="button"><FontAwesomeIcon icon={faUserPen} /> Ver detalle</button>
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={handleCancel}><FontAwesomeIcon icon={faBan} /> Cancelar pedido</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
