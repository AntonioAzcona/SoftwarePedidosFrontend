import { faFloppyDisk, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import productDefaultImg from '../../../assets/pictures/newProduct.png';
import { clienteAxios } from "../../../api/axios";
import { useForm } from "../../../hooks/useForm";
import { useEffect, useState } from "react";

const misImagenes = require.context('../../../assets/pictures', true);

export const NuevoProductoPage = () => {

  const navigate = useNavigate();

  const { formState, onInputChange, onResetForm } = useForm({
    nombre: '',
    precio: '',
  });

  const { nombre, precio } = formState;

  const [file, setFile] = useState({});

  useEffect(() => {
    validationForm()
  }, [file]);

  const updateFile = ({ target }) => {
    setFile(target.files[0]);
  }

  const validationForm = () => {
    return !(!!nombre.length && precio > 0);
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('imagen', file);

    await clienteAxios.post(`/productos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
        if (Object.keys(response.data).length === 0) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Este producto tiene campos sin rellenar o no tiene imagen",
            confirmButtonColor: "#198754"
          });
        } else if (response.data.code === 11000) {
          console.log('Duplicidad en uno o varios campos en la DB');
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Este producto tiene uno o mas campos iguales a otro producto",
            confirmButtonColor: "#198754"
          });
        } else {
          Swal.fire({
            title: "Producto actualizado con éxito!",
            text: "Ahora te llevarémos a visualizar tus productos",
            icon: "success",
            confirmButtonColor: "#198754"
          }).then(result => {
            if (result.isConfirmed) {
              navigate('/productos', {
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
      <h2 className="mb-4">Registrar nuevo producto</h2>

      <form onSubmit={handleSubmitProduct}>

        <div className="row">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card mb-3">
              {/* {
                  imagen
                    ? <img src={`http://localhost:5001/${imagen}`} className="card-img-top" alt={imagen} />
                    : <img src={misImagenes('./newProduct.png')} className="img-thumbnail" alt="..."></img>
                } */}
              <input
                className="form-control form-control-sm"
                type="file"
                id="formFile"
                onChange={updateFile}
              />
            </div>
          </div>

          <div className="col-5">

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                placeholder="Ej. Playera Azul"
                className="form-control"
                name="nombre"
                aria-describedby="nombreHelp"
                value={nombre}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="precio" className="form-label">Precio</label>
              <input
                type="text"
                placeholder="100"
                className="form-control"
                name="precio"
                aria-describedby="nombreHelp"
                value={precio}
                onChange={onInputChange}
              />
            </div>

            <div className="mt-5 d-flex justify-content-end align-items-center column-gap-2">
              <button type="submit" className="btn btn-success" disabled={validationForm()}>
                <FontAwesomeIcon icon={faFloppyDisk} /> Guardar cambios
              </button>

              <Link className="list-group-item" to="/productos/">
                <button className="btn btn-warning" type="button">
                  <FontAwesomeIcon icon={faLeftLong} /> Regresar
                </button>
              </Link>
            </div>

          </div>

        </div>
      </form>
    </>
  )
}
