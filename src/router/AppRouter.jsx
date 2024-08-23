// Routing
import { Routes, Route, Navigate } from "react-router-dom";
import { ClientesPage, ProductosPage, PedidosPage, NuevoClientePage } from "../components/";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="clientes" element={<ClientesPage />} />
      <Route path="clientes/nuevo" element={<NuevoClientePage />} />
      <Route path="productos" element={<ProductosPage />} />
      <Route path="pedidos" element={<PedidosPage />} />

      <Route path="/*" element={<Navigate to="/clientes" />}></Route>
    </Routes>
  )
}
