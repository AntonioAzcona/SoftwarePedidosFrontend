import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { clienteAxios } from '../../../api/axios';
import { Link } from "react-router-dom";

import { Producto } from '../Producto';
import { Spinner } from '../../../ui/layout/Spinner';
// import { Pagination } from '../../Pagination';

export const ProductosPage = ({ foundProducts = [], btnNewProduct = true, btnsAccion = true, btnAddToCart = false, cart, setCart }) => {

  const [productos, setProductos] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const { hasNextPage, hasPrevPage, limit, nextPage, offset, page, pagingCounter, totalDocs, totalPages  } = productos;

  const consultarAPI = async () => {
    const resp = await clienteAxios.get('/productos');
    const { data } = await resp;

    console.log(data.docs);

    if (foundProducts.length > 0) {
      setProductos(foundProducts);
    } else {
      setProductos(data);
    }
  }

  useEffect(() => {
    consultarAPI();
  }, [isDelete]); // foundProducts

  return (
    <>
      <h2>Productos</h2>

      {/* <Pagination
        elementos={productos}
        hasNextPage={hasNextPage} 
        hasPrevPage={hasPrevPage} 
        limit={limit}
        nextPage={nextPage}
        offset={offset}
        page={page}
        pagingCounter={pagingCounter}
        totalDocs={totalDocs}
        totalPages={totalPages}
      /> */}

      {
        btnNewProduct &&
        <Link className="list-group-item" to="/productos/nuevo">
          <button className="btn btn-success mb-3" type="button">
            <FontAwesomeIcon icon={faUserPlus} /> Nuevo Producto
          </button>
        </Link>
      }

      {
        productos?.docs?.length > 0
          ? <div className="row">
            {
              productos?.docs?.map((product) => (
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4" key={product._id}>
                  <Producto
                    product={product}
                    setIsDelete={setIsDelete}
                    actionButtons={btnsAccion}
                    btnAddToCart={btnAddToCart}
                    cart={cart}
                    setCart={setCart}
                  />
                </div>
              ))
            }
          </div> : <Spinner />
      }
    </>
  )
}
