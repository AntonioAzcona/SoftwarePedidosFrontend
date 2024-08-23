import { faLeftLong, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useForm } from "../../../hooks/useForm";

export const NuevoClientePage = () => {

  const { formState, onInputChange } = useForm({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  const { nombre, apellido, empresa, email, telefono } = formState;

  return (
    <>
      <h2>Registrar nuevo cliente</h2>

      <legend className="mb-4 mt-3 d-flex justify-content-center">Llena todos los campos</legend>

      <div className="row">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              placeholder="Ej. Anthony"
              className="form-control"
              name="nombre"
              aria-describedby="nombreHelp"
              value={nombre}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input
              type="text"
              placeholder="Ej. Hopkins"
              className="form-control"
              name="apellido"
              onChange={onInputChange}
              value={apellido}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="empresa" className="form-label">Empresa</label>
            <input
              type="text"
              placeholder="Ej. Hollywood"
              className="form-control"
              name="empresa"
              onChange={onInputChange}
              value={empresa}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              placeholder="Ej. antho@correo.com"
              className="form-control"
              name="email"
              onChange={onInputChange}
              value={email}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Telefono</label>
            <input
              type="text"
              placeholder="Ej. 1234567890"
              className="form-control"
              name="telefono"
              onChange={onInputChange}
              value={telefono}
            />
          </div>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center column-gap-2">
          <button type="submit" className="btn btn-success"><FontAwesomeIcon icon={faUserCheck} /> Registrar</button>

          <Link className="list-group-item" to="/clientes/">
            <button className="btn btn-warning" type="button">
              <FontAwesomeIcon icon={faLeftLong} /> Regresar
            </button>
          </Link>

        </div>
      </div>
    </>
  )
}
