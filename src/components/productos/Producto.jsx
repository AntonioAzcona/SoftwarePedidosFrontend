import { faCartPlus, faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api/axios";
import { useState } from "react";

export const Producto = ({ product, setIsDelete, actionButtons = true, btnAddToCart, cart, setCart }) => {

  const { _id, nombre, precio, imagen } = product;
  const [isSelectedProduct, setIsSelectedProduct] = useState(false);
  const [quantityProduct, setQuantityProduct] = useState(1);

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

  const handleAddToCar = () => {
    setIsSelectedProduct(true);

    let auxCart = cart;
    let existe = false;

    auxCart.map((elemento, index) => {
      if(elemento.producto == _id) {
        auxCart[index].cantidad = quantityProduct;
        existe=true;
      }
    });
    if(!existe) {
      auxCart.push({ 'producto': _id, cantidad: quantityProduct, precio: precio, nombre: nombre });
    }

    // console.log(auxCart);
    setCart(auxCart);
    // setCart([...cart, { 'producto': _id, cantidad: quantityProduct, precio: precio, nombre: nombre }]);

    Swal.fire({
      title: "Se agregó al carrito",
      icon: "success",
      showConfirmButton: false,
      timer: 1000
    });
  }

  const handleQuantityProduct = (e) => {
    setIsSelectedProduct(false);
    setQuantityProduct(e.target.valueAsNumber);
  }

  return (
    <div className="col-sm-6 mb-3 mb-sm-0">
      <div className="card mb-3">
        {
          imagen && <img src={`http://localhost:5001/${imagen}`} className="card-img-top" alt={imagen} />
        }
        <div className="card-body">

          <div className="row">
            <div className="col-sm-6"><h5 className="card-title">{nombre}</h5></div>
            <div className="col-sm-6 text-end ml-6"><span className="mx-2">${precio}</span></div>
          </div>

          <div className="row">
            {
              actionButtons &&
              <div className="col-sm-12">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link className="list-group-item" to={`/productos/editar/${_id}`}>
                    <button className="btn btn-primary" type="button"><FontAwesomeIcon icon={faUserPen} /> Editar</button>
                  </Link>
                  <button className="btn btn-danger" type="button" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Eliminar</button>
                </div>
              </div>
            }

            {
              btnAddToCart &&
              <div className="d-flex flex-row-reverse align-items-center">
                <div className="col-sm-auto">
                  <button className="btn btn-primary" type="button" onClick={handleAddToCar} disabled={isSelectedProduct}><FontAwesomeIcon icon={faCartPlus} /> Añadir</button>
                </div>
                <div className="col-sm-2 px-2">
                  <input
                    className="form-control"
                    type="number"
                    value={quantityProduct}
                    onChange={handleQuantityProduct}
                  />
                </div>
                <div className="col-sm-auto">
                  <span>Cantidad:</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
