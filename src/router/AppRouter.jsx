// Routing
import { Routes, Route, Navigate } from "react-router-dom";
import { ClientesPage, ProductosPage, PedidosPage, NuevoClientePage } from "../components/";
import { EditarClientePage } from "../components/clientes/pages/EditarClientePage";
import { NuevoProductoPage } from "../components/productos/pages/NuevoProductoPage";
import { EditarProductoPage } from "../components/productos/pages/EditarProductoPage";
import { NuevoPedidoPage } from "../components/pedidos/pages/NuevoPedidoPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="clientes" element={<ClientesPage />} />
      <Route path="clientes/nuevo" element={<NuevoClientePage />} />
      <Route path="clientes/editar/:idClient" element={<EditarClientePage />} />

      <Route path="productos" element={<ProductosPage />} />
      <Route path="productos/nuevo" element={<NuevoProductoPage />} />
      <Route path="productos/editar/:idProduct" element={<EditarProductoPage />} />
      
      <Route path="pedidos" element={<PedidosPage />} />
      <Route path="pedidos/nuevo/:idClient" element={<NuevoPedidoPage />} />

      <Route path="/*" element={<Navigate to="/clientes" />}></Route>
    </Routes>
  )
}
