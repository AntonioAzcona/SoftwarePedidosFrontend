import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { clienteAxios } from '../../../api/axios';
import { Link } from "react-router-dom";

import { Producto } from '../Producto';
import { Spinner } from '../../../ui/layout/Spinner';

export const ProductosPage = () => {

  const [productos, setProductos] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const consultarAPI = async () => {
    const resp = await clienteAxios.get('/productos');
    const { data } = await resp;

    setProductos(data);
  }

  useEffect(() => {
    consultarAPI();
  }, [isDelete]);

  return (
    <>
      <h2>Productos</h2>

      <Link className="list-group-item" to="/productos/nuevo">
        <button className="btn btn-success mb-3" type="button">
          <FontAwesomeIcon icon={faUserPlus} /> Nuevo Producto
        </button>
      </Link>

      {
        productos.length > 0
          ? <div className="row">
            {
              productos?.map((product) => (
                <Producto
                  key={product._id}
                  product={product}
                  setIsDelete={setIsDelete}
                />
              ))
            }
          </div> : <Spinner />
      }

    </>
  )
}
