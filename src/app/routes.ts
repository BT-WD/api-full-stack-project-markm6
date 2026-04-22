import { createBrowserRouter } from "react-router";
import Login from "./Login";
import Main from "./Main";
import CreateRoute from "./CreateRoute";
import EditRoute from "./EditRoute";
import NotFound from "./NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
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
