import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { clienteAxios } from '../../../api/axios';
import { Producto } from '../../productos/Producto';

export const DetallePedidoPage = () => {

  const [order, setOrder] = useState({});
  const { idPedido } = useParams();

  const { _id, cliente, pedido, total } = order;

  const loadOrder = async () => {
    const resp = await clienteAxios.get(`/pedidos/${idPedido}`);
    const { data } = await resp;

    if (data) {
      setOrder(data);
    } else {
      console.log('Aun no hay data');
    }
  }

  useEffect(() => {
    loadOrder();
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h3 className="text-center">Información del pedido</h3>
          <h4><strong>Cliente</strong></h4>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item"><strong>Nombre:</strong> {cliente?.empresa}</li>
            <li className="list-group-item"><strong>Correo:</strong> {cliente?.email}</li>
            <li className="list-group-item"><strong>Empresa:</strong> {cliente?.empresa}</li>
            <li className="list-group-item"><strong>Telefono:</strong> {cliente?.telefono}</li>
          </ul>

          <h4><strong>Artículos</strong></h4>
          <div className="row">
            {
              pedido?.map(({ producto, cantidad }) => (
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4" key={producto._id}>
                  <Producto
                    product={producto}
                    setIsDelete={false}
                    actionButtons={false}
                    btnAddToCart={false}
                    cantidadArt={cantidad}
                  />
                </div>
              ))
            }
          </div>

          <h4><strong>Total:</strong><span> ${total}</span></h4>
        </div>
      </div>
    </div>
  )
}
