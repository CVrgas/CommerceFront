import { Outlet } from "react-router-dom";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Order from "./Pages/Order";
import ProductIndex from "./Pages/ProductIndex";
import Signup from "./Pages/Signin";
import TestWrapper from "./Components/TestWrapper";
import { RouteItem } from "./Types/Route";
import Menu from "./Pages/Product/Menu.tsx";
import CategoryProduct from "./Pages/Product/CategoryProduct.tsx";
import ProductDetail from "./Pages/Product/ProductDetail.tsx";

const routes: RouteItem[] = [
  {
    path: "/Menu",
    name: "Menu",
    icon: "",
    component: Menu,
    children: [
      {
        path: ":category",
        name: "Products Categories",
        icon: "",
        component: CategoryProduct,
        children: [],
      },
      {
        path: ":category/:product",
        name: "Products Categories",
        icon: "",
        component: ProductDetail,
        children: [],
      },
    ],
    access: [1, 2, 3],
  },
  {
    path: "/home",
    name: "home",
    icon: "",
    component: Home,
    children: [],
    access: [1, 2, 3],
  },
  {
    path: "/",
    name: "home",
    icon: "",
    component: Home,
    children: [],
    access: [1, 2, 3],
  },
  {
    path: "/NotFound",
    name: "product",
    icon: "",
    component: NotFound,
    children: [],
    access: [1, 2, 3],
  },
  {
    path: "/cart",
    name: "Cart",
    icon: "",
    component: Cart,
    children: [],
    access: [1, 2, 3],
  },
  {
    path: "/products/:page?",
    name: "Products",
    icon: "",
    component: ProductIndex,
    children: [],
    access: [1, 2, 3],
  },
  {
    path: "/order",
    name: "Order",
    icon: "",
    component: Order,
    children: [],
    access: [1, 2, 3],
  },
  {
    path: "/Auth",
    name: "Auth",
    icon: "",
    component: Outlet,
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        name: "Auth",
        icon: "",
        component: Login,
        children: [],
        access: [1],
      },
      {
        path: "signin",
        name: "Auth",
        icon: "",
        component: Signup,
        children: [],
        access: [1],
      },
    ],
    access: [1],
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "",
    component: Order,
    children: [],
    access: [2, 3],
  },
  {
    path: "/test",
    name: "test",
    icon: "",
    component: TestWrapper,
    children: [],
    access: [1, 3],
  },
];

export function GetRoutes(
  name?: string | string[],
  basePath?: string | string[],
  role?: Role,
) {
  return routes.filter((route) => {
    const isNameMatched = matchesAny(route.name, name);

    const isBaseMatched = matchesAny(route.basePath, basePath);

    const isAccessMatched =
      role && route.access
        ? route.access.some((allowedRole) => role === allowedRole)
        : true;

    return isNameMatched && isBaseMatched && isAccessMatched;
  });
}

function matchesAny(toCompare?: string, targets?: string | string[]) {
  if (!toCompare || !targets) return true;

  const targetArray = Array.isArray(targets)
    ? targets.map((v) => v.toLowerCase())
    : [targets.toLowerCase()];

  return targetArray.some((target) => target === toCompare.toLowerCase());
}
