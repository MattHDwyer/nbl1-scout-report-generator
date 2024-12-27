// import React, { useEffect, useMemo } from "react";
// import { useAuthProvider } from "../utils/auth";
// import { routes } from "./route-paths";
// import { RouteType } from "./types";
// import {
//   Route,
//   Routes as DomRoutes,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// export const Routes = () => {
//   const auth = useAuthProvider();
//   const location = useLocation();
//   useEffect(() => {
//     console.log(location.pathname);
//   }, []);

//   const filterRoutes = (routes: RouteType[]): RouteType[] => {
//     return routes.reduce(function filter(
//       prev: RouteType[],
//       item: RouteType
//     ): RouteType[] {
//       if (item.childRoutes && item.childRoutes.length > 0) {
//         return [
//           ...prev,
//           {
//             ...item,
//             childRoutes: item.childRoutes.reduce(filter, []),
//           },
//         ];
//       } else {
//         return [...prev, item];
//       }
//     },
//     []);
//   };

//   const filteredRoutes = useMemo(() => {
//     return filterRoutes(routes)
//       .filter((route) => route.private == true)
//       .map((route, i) => {
//         return (
//           <Route
//             key={i}
//             path={route.path}
//             element={<route.component childRoutes={route.childRoutes} />}
//           />
//         );
//       });
//   }, [auth.user]);

//   useEffect(() => {
//     console.log(auth.isAuthenticated);
//   }, [auth]);

//   // give access to all routes if user is authenticated
//   if (auth.isAuthenticated) {
//     console.log("FILTERED ROUTES: ", filteredRoutes);
//     return <DomRoutes>{filteredRoutes}</DomRoutes>;
//   }

//   // if user is not authenticated, and tries to hit a private route redirect to login
//   return (
//     <DomRoutes>
//       {getPublicRoutes(routes)}
//       {getPrivateRoutes(routes)}
//     </DomRoutes>
//   );
// };

// const getPublicRoutes = (routes: RouteType[]) => {
//   return routes
//     .filter((route) => route.private == false)
//     .map((route, i) => {
//       return (
//         <Route
//           key={i}
//           path={route.path}
//           element={<route.component childRoutes={route.childRoutes} />}
//         />
//       );
//     });
// };

// const getPrivateRoutes = (routes: RouteType[]) => {
//   return routes
//     .filter((route) => route.private == true)
//     .map((route, i) => {
//       return (
//         <Route key={i} path={route.path} element={<Navigate to="/login" />} />
//       );
//     });
// };
import React from "react";

export const Routes = () => {
  return <div>Routes</div>;
};
