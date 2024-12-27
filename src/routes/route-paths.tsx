import { Login } from "../pages";
// import { RouteType } from "./types";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import {
  ConstructScout,
  ViewAvailableScouts,
  ViewScoutDetails,
} from "../modules";
import { RouteProps } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

const routes: RouteProps[] = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <ConstructScout />
      </PrivateRoute>
    ),
  },
  {
    path: "/coach",
    element: (
      <PrivateRoute>
        <ConstructScout />
      </PrivateRoute>
    ),
  },
  {
    path: "/coach/construct-scout",
    element: (
      <PrivateRoute>
        <ConstructScout />
      </PrivateRoute>
    ),
  },
  {
    path: "/player",
    element: (
      <PrivateRoute>
        <ViewAvailableScouts />
      </PrivateRoute>
    ),
  },
  {
    path: "/player/:teamId",
    element: (
      <PrivateRoute>
        <ViewScoutDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
];

export { routes };
