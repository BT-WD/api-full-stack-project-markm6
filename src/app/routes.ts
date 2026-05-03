import { createBrowserRouter } from "react-router";
import Login from "./Login";
import Main from "./Main";
import CreateRoute from "./CreateRoute";
import EditRoute from "./EditRoute";
import NotFound from "./NotFound";
import Register from "./Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/main",
    Component: Main,
  },
  {
    path: "/createroute",
    Component: CreateRoute,
  },
  {
    path: "/editroute/:routeId",
    Component: EditRoute,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
