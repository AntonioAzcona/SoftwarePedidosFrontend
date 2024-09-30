import React from 'react'

export const Modal = ({ titulo, cliente, informacion, handleCompleteModal }) => {

    return (
        <>
            <div className="modal fade" id="idModal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalLabel">{titulo}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6><strong>Cliente:</strong> {cliente?.nombre} {cliente?.apellido}</h6>
                            <h6><strong>Productos:</strong></h6>
                            <ul className="list-group list-group-flush mb-3">
                                {
                                    informacion?.pedido?.map((elemento) => {
                                        return <li key={elemento.producto} className="list-group-item">{elemento.nombre} <span className="float-sm-end">${elemento.precio} x {elemento.cantidad}</span></li>
                                    })
                                }
                                <li className="list-group-item text-end"><strong>Total: </strong>$ {informacion.total}</li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Regresar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCompleteModal} disabled={informacion.pedido?.length == 0 && true}>Terminar compra</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
