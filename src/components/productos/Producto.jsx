import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api/axios";

export const Producto = ({ product, setIsDelete, botones = true }) => {

  const { _id, nombre, precio, imagen } = product;

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Está seguro de eliminar este producto?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/productos/${_id}`)
          .then(response => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El producto fué eliminado con éxito",
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
        {
          imagen && <img src={`http://localhost:5001/${imagen}`} className="card-img-top" alt={imagen} />
        }
        <div className="card-body">
          <div className="row align-items-center">

            <div className="col-sm-6">
              <h5 className="card-title">{nombre}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">$ {precio}</li>
              </ul>
            </div>


            {
              botones &&
              <div className="col-sm-6">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link className="list-group-item" to={`/productos/editar/${_id}`}>
                    <button className="btn btn-primary" type="button"><FontAwesomeIcon icon={faUserPen} /> Editar</button>
                  </Link>
                  <button className="btn btn-danger" type="button" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Eliminar</button>
                </div>
              </div>
            }


          </div>
        </div>
      </div>
    </div>
  )
}
