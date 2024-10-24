import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { clienteAxios } from "../../../api/axios";
import { useForm } from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { Cliente } from "../../clientes/Cliente";
import { InputSearch } from "../../InputSearch";
import { ProductosPage } from "../../productos/pages/ProductosPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../Modal";

export const NuevoPedidoPage = () => {

    const navigate = useNavigate();
    const { idClient } = useParams();

    const [clientes, setClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});
    const [foundProducts, setFoundProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [order, serOrder] = useState([]);

    const { formState } = useForm({
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

    const handleSubmitOrder = (e) => {
        e.preventDefault();

        let total = 0;
        cart.map(elemento => {
            total += elemento.precio * elemento.cantidad;
        });

        const finalOrder = {
            "cliente": idClient,
            "pedido": cart,
            "total": total
        }

        serOrder(finalOrder);
    }

    const handleCompleteModal = async () => {

        let newOrder = order;
        newOrder.pedido.map(elemento => {
            delete elemento.precio;
            delete elemento.nombre;
        });

        await clienteAxios.post('/pedidos', newOrder)
            .then(response => {
                if (response.data.code === 11000) {
                    console.log('Duplicidad en uno o varios campos en la DB');
                } else {
                    Swal.fire({
                        title: "¡Pedido registrado con éxito!",
                        text: "Ahora te llevarémos a visualizar tus pedidos",
                        icon: "success",
                        confirmButtonColor: "#198754"
                    }).then(result => {
                        if (result.isConfirmed) {
                            navigate('/pedidos', {
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
    }

    return (
        <>
            <h2 className="mb-4">Realizar un nuevo pedido</h2>

            <legend>Datos del cliente</legend>
            <Cliente
                client={selectedClient}
                actionButtons={false}
            />

            <legend>Agrega productos a tu pedido</legend>

            <InputSearch
                setFoundData={setFoundProducts}
                dataToFilter={'productos'}
            />

            <ProductosPage
                foundProducts={foundProducts}
                btnNewProduct={false}
                btnsAccion={false}
                btnAddToCart={true}
                cart={cart}
                setCart={setCart}
            />

            <Modal
                titulo={"Resumen de compra"}
                cliente={selectedClient}
                informacion={order}
                handleCompleteModal={handleCompleteModal}
            />

            <div className="col-12 d-flex justify-content-end align-items-center column-gap-2">
                <button type="button" className="btn btn-success" onClick={handleSubmitOrder} disabled={validationForm()} data-bs-toggle="modal" data-bs-target="#idModal">
                    <FontAwesomeIcon icon={faCartPlus} /> Ver carrito
                </button>

                <Link className="list-group-item" to="/clientes/">
                    <button className="btn btn-danger" type="button">
                        <FontAwesomeIcon icon={faBan} /> Cancelar
                    </button>
                </Link>
            </div>
        </>
    )
}
