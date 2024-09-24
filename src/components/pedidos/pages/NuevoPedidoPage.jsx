import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { clienteAxios } from "../../../api/axios";
import { useForm } from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { Cliente } from "../../clientes/Cliente";
import { BuscarProducto } from "../../productos/BuscarProducto";
import { ProductosPage } from "../../productos/pages/ProductosPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faUserCheck } from "@fortawesome/free-solid-svg-icons";

export const NuevoPedidoPage = () => {

    const { idClient } = useParams();

    const [clientes, setClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});
    const [foundProducts, setFoundProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const { formState, onInputChange, onResetForm } = useForm({
        cliente: '',
        pedido: [],
        total: ''
    });

    const { cliente, pedido, total } = formState;

    useEffect(() => {
        loadClients();
    }, []);

    useEffect(() => {
        validationForm()
    }, []);

    const loadClients = async () => {
        const resp = await clienteAxios.get('/clientes');
        const { data } = await resp;

        setClientes(data);

        const foundClient = data?.find(element => element._id == idClient);
        setSelectedClient(foundClient);
    }

    const validationForm = () => {
        // return !(!!cliente.length && pedido.length > 0 && !!total.length);
    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        const order = {
            "cliente": idClient,
            "pedido": cart,
            "total": "129.99"
        }
        console.log(cart);
        // console.log('handleSubmitOrder');
    }

    // const handleSubmitOrder = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('nombre', nombre);
    //     formData.append('precio', precio);
    //     formData.append('imagen', file);

    //     await clienteAxios.post(`/productos`, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }).then(response => {
    //         if (Object.keys(response.data).length === 0) {
    //             Swal.fire({
    //                 icon: "warning",
    //                 title: "Oops...",
    //                 text: "Este producto tiene campos sin rellenar o no tiene imagen",
    //                 confirmButtonColor: "#198754"
    //             });
    //         } else if (response.data.code === 11000) {
    //             console.log('Duplicidad en uno o varios campos en la DB');
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Oops...",
    //                 text: "Este producto tiene uno o mas campos iguales a otro producto",
    //                 confirmButtonColor: "#198754"
    //             });
    //         } else {
    //             Swal.fire({
    //                 title: "Producto actualizado con éxito!",
    //                 text: "Ahora te llevarémos a visualizar tus productos",
    //                 icon: "success",
    //                 confirmButtonColor: "#198754"
    //             }).then(result => {
    //                 if (result.isConfirmed) {
    //                     navigate('/productos', {
    //                         replace: true
    //                     });
    //                 }
    //             });
    //             console.log(response.data);
    //         }
    //     })
    //         .catch(error => {
    //             console.log('¡Ups! Ocurrió un error', error);
    //         });

    //     onResetForm();
    // }

    return (
        <>
            <h2 className="mb-4">Realizar un nuevo pedido</h2>

            <legend>Datos del cliente</legend>
            <Cliente
                client={selectedClient}
                botones={false}
            />

            {/* <form onSubmit={handleSubmitOrder}> */}

            {/* <div className="row">
                    <div className="col-sm-4 mb-3 mb-sm-0">
                        <label htmlFor="Seleccionar cliente">Clientes</label>
                        <select defaultValue={'DEFAULT'} className="form-select mt-1" aria-label="Default select example">
                            <option value="DEFAULT" disabled>Selecciona el cliente</option>
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
                </div> */}


            <legend>Agrega productos a tu pedido</legend>

            <BuscarProducto
                setFoundProducts={setFoundProducts}
            />

            <ProductosPage
                foundProducts={foundProducts}
                btnNewProduct={false}
                btnsAccion={false}
                btnAddToCar={true}
                cart={cart}
                setCart={setCart}
            />

            <div className="col-12 d-flex justify-content-end align-items-center column-gap-2">
                <button type="button" className="btn btn-success" onClick={handleSubmitOrder} disabled={validationForm()}>
                    <FontAwesomeIcon icon={faUserCheck} /> Realizar pedido
                </button>

                <Link className="list-group-item" to="/clientes/">
                    <button className="btn btn-danger" type="button">
                        <FontAwesomeIcon icon={faBan} /> Cancelar
                    </button>
                </Link>
            </div>

            {/* </form> */}
        </>
    )
}
