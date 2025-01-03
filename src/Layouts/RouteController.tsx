import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { RouteItem } from "../Types/Route";
import MainLayout from "./MainLayout";
import { GetRoutes } from "../Routes";
import RedirectWithOutlet from "../Components/RedirectWithOutlet";
import userStore from "../App/Store/user";
import { Role } from "../Types/Role.ts";

function RouteController() {
  const user = userStore((state) => state.user);
  return (
    <>
      <RouterProvider router={router(user.role)}></RouterProvider>
    </>
  );
}

function router(role: Role) {
  const renderRoute = (routes: RouteItem[], basePath = "") =>
    routes.map((route) => {
      const fullPath = `${basePath}${route.path}`.replace(/\/+/g, "/");

      const element = route.redirect ? (
        <RedirectWithOutlet redirectTo={route.redirect} />
      ) : (
        <route.component />
      );

      return (
        <Route key={fullPath} path={fullPath} element={element}>
          {route.children && renderRoute(route.children, fullPath)}
        </Route>
      );
    });

  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        {...renderRoute(GetRoutes(undefined, undefined, role))}

        <Route
          path={"*"}
          element={<Navigate to={"/"} replace={true} />}
        ></Route>
      </Route>,
    ),
  );
}

export default RouteController;
