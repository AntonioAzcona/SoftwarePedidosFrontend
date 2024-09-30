import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "../hooks/useForm";
import { clienteAxios } from "../api/axios";

export const InputSearch = ({ setFoundData, dataToFilter }) => {

  const { formState, onInputChange } = useForm({
    searchedText: ''
  });

  const { searchedText } = formState;

  const handleSubmitSearch = async (e) => {
    e.preventDefault();

    const resp = await clienteAxios.get(`/${dataToFilter}/busqueda/${searchedText}`);
    const { data } = await resp;

    setFoundData(data);
  }

  return (
    <form onSubmit={handleSubmitSearch}>
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
              name="searchedText"
              value={searchedText}
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
