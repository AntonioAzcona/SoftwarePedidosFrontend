import { useEffect, useState } from 'react';
import { clienteAxios } from '../../../api/axios';
import { Link } from "react-router-dom";

import { Cliente } from '../Cliente';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '../../../ui/layout/Spinner';

export const ClientesPage = () => {

  const [clientes, setClientes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const consultarAPI = async () => {
    const resp = await clienteAxios.get('/clientes');
    const { data } = await resp;

    setClientes(data);
  }

  useEffect(() => {
    consultarAPI();
  }, [isDelete]);

  return (
    <>
      <h2>Clientes</h2>

      <Link className="list-group-item" to="/clientes/nuevo">
        <button className="btn btn-success mb-3" type="button">
          <FontAwesomeIcon icon={faUserPlus} /> Nuevo Cliente
        </button>
      </Link>

      {
        clientes.length > 0
          ?
          <div className="row">
            {
              clientes?.map((client) => (
                <Cliente
                  key={client._id}
                  client={client}
                  setIsDelete={setIsDelete}
                />
              ))
            }
          </div> : <Spinner />
      }


    </>
  )
}
