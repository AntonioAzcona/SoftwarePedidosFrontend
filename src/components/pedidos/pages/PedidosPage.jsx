import { useEffect, useState } from 'react';
import { clienteAxios } from '../../../api/axios';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '../../../ui/layout/Spinner';
import { Pedido } from '../Pedido';

export const PedidosPage = () => {

  const [pedidos, setPedidos] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    consultarAPI();
  }, [isDelete]);

  useEffect(() => {
    loadClients();
  }, []);

  const consultarAPI = async () => {
    const resp = await clienteAxios.get('/pedidos');
    const { data } = await resp;

    setPedidos(data);
  }

  const loadClients = async () => {
    const resp = await clienteAxios.get('/clientes');
    const { data } = await resp;

    setClientes(data);
  }

  return (
    <>
      <h2>Pedidos</h2>

      <label htmlFor="Seleccionar cliente">Si desea hacer un nuevo pedido, seleccione un cliente</label>
      <div className="row">
        <div className="col-sm-5 mb-3 mb-sm-0">
          
          <select defaultValue={'DEFAULT'} className="form-select" aria-label="Default select example">
            <option value="DEFAULT" disabled>Lista de clientes</option>
            {
              clientes?.map(client => (
                <option
                  key={client._id}
                  value={client._id}>{client.nombre} {client.apellido}
                </option>
              ))
            }
          </select>
        </div>
        <div className="col-sm-4 mb-3 mb-sm-0">
          <Link className="list-group-item" to={`/pedidos/nuevo/`}>
            <button className="btn btn-success mb-3" type="button" disabled>
              <FontAwesomeIcon icon={faUserPlus} /> Nuevo Pedido
            </button>
          </Link>
        </div>
      </div>



      {
        pedidos.length > 0
          ?
          <div className="row">
            {
              pedidos?.map((order) => (
                <Pedido
                  key={order._id}
                  pedido={order}
                  setIsDelete={setIsDelete}
                />
              ))
            }
          </div> : <Spinner />
      }
    </>
  )
}
