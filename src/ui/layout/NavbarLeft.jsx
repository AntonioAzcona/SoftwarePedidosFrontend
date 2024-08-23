import { faBoxesStacked, faTruckFast, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

export const NavbarLeft = () => {
  return (
    <div className="container text-start">
      <div className="row row-cols-1 list-group list-group-flush px-5">
        <h3 className="pt-5 list-group-item list-group-item-action" href="#">Administración</h3>
      </div>
      <div className="row row-cols-1 list-group list-group-flush px-5">
        <NavLink className="py-3 list-group-item list-group-item-action" to="/clientes"><FontAwesomeIcon icon={faUsers} /> Clientes</NavLink>

        <NavLink className="py-3 list-group-item list-group-item-action" to="/productos"><FontAwesomeIcon icon={faBoxesStacked} /> Productos</NavLink>

        <NavLink className="py-3 list-group-item list-group-item-action" to="/pedidos"><FontAwesomeIcon icon={faTruckFast} /> Pedidos</NavLink>
      </div>
    </div>
  )
}
