import { createBrowserRouter } from "react-router-dom";

import ProductList from "../Pages/Product/ProductList.jsx";
import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Auth/Login.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/product",
        element: <ProductList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
