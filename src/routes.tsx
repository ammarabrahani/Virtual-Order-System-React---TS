import Login from "./layouts/authentication/login";
import Dashboard from "./layouts/dashboard/dashboard";
import Principals from "./layouts/dashboard/views/principals/principals";
import Products from "./layouts/dashboard/views/products/products";
import UpdateStock from "./layouts/dashboard/views/updateStock/updateStock";
import Orders from "./layouts/dashboard/views/orders/orders";

import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/principals" element={<Principals />} />
        <Route
          path="/principals/:principalId/products"
          element={<Products />}
        />
        <Route
          path="/principals/:principalId/updatestock"
          element={<UpdateStock />}
        />
        <Route path="/orders" element={<Orders />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
