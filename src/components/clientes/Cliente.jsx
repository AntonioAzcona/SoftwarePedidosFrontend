import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Cliente = ({ client }) => {
    const { nombre, apellido, empresa, email, telefono } = client; 
    return (
        <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{nombre} {apellido}</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{empresa}</li>
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">{telefono}</li>
                    </ul>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary" type="button"><FontAwesomeIcon icon={faUserPen} /> Editar</button>
                        <button className="btn btn-danger" type="button"><FontAwesomeIcon icon={faTrash} /> Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
