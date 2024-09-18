import { faLeftLong, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { clienteAxios } from "../../../api/axios";

import { useForm } from "../../../hooks/useForm";

export const NuevoClientePage = () => {

  const navigate = useNavigate();

  const { formState, onInputChange, onResetForm } = useForm({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  const { nombre, apellido, empresa, email, telefono } = formState;

  const validationForm = () => {
    return !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;
  }

  const handleSubmitClient = async (e) => {
    e.preventDefault();
    
    await clienteAxios.post('/clientes', formState)
      .then(response => {
        if (response.data.code === 11000) {
          console.log('Duplicidad en uno o varios campos en la DB');
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ese cliente ya está registrado",
            confirmButtonColor: "#198754"
          });
        } else {
          Swal.fire({
            title: "¡Cliente registrado con éxito!",
            text: "Ahora te llevarémos a visualizar tus clientes",
            icon: "success",
            confirmButtonColor: "#198754"
          }).then(result => {
            if (result.isConfirmed) {
              navigate('/clientes', {
                replace: true
              });
            }
          });
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log('¡Ups! Ocurrió un error', error);
      });

    onResetForm();
  }

  return (
    <>
      <h2>Registrar nuevo cliente</h2>

      <form onSubmit={handleSubmitClient}>

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
            <button type="submit" className="btn btn-success" disabled={validationForm()}>
              <FontAwesomeIcon icon={faUserCheck} /> Registrar
            </button>

            <Link className="list-group-item" to="/clientes/">
              <button className="btn btn-warning" type="button">
                <FontAwesomeIcon icon={faLeftLong} /> Regresar
              </button>
            </Link>

          </div>
        </div>
      </form>
    </>
  )
}
