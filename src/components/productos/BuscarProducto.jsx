import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "../../hooks/useForm";
import { clienteAxios } from "../../api/axios";

export const BuscarProducto = ({ setFoundProducts }) => {

  const { formState, onInputChange } = useForm({
    searchedProduct: ''
  });

  const { searchedProduct } = formState;

  const handleSubmitSearchProduct = async (e) => {
    e.preventDefault();

    const resp = await clienteAxios.get(`/productos/busqueda/${searchedProduct}`);
    const { data } = await resp;

    setFoundProducts(data);
  }

  return (
    <form onSubmit={handleSubmitSearchProduct}>
      <div className="row g-2">
        <div className="col-auto">
          <label htmlFor="inputPassword6" className="col-form-label">Productos:</label>
        </div>
        <div className="col-sm-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos"
              aria-label="Buscar productos"
              aria-describedby="basic-addon2"
              name="searchedProduct"
              value={searchedProduct}
              onChange={onInputChange}
            />
            <button
              className="input-group-text btn btn-primary"
              type="submit"
              id="button-addon2"><FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
