import { BrowserRouter, Route, Routes } from "react-router-dom";
import appRoutes from "../constants/AppRoutes";
import NoPageFound from "../components/Global/NoPageFound";
import { Suspense } from "react";
import ProtectedLayout from "../../@manush/layouts/ProtectedLayout.jsx";
import LoadingSpinner from "../components/Global/LoadingSpinner.jsx";

const RouteWrapper = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {appRoutes.map((route) => {
          const { path, Element, isProtected, isIndexUrl } = route;

          const LazyElement = (
            <Suspense fallback={<LoadingSpinner />}>
              <Element />
            </Suspense>
          );

          if (isProtected) {
            return (
              <Route key={path} element={<ProtectedLayout />}>
                <Route index={isIndexUrl} path={path} element={LazyElement} />
              </Route>
            );
          } else {
            return (
              <Route
                key={path}
                index={isIndexUrl}
                path={path}
                element={LazyElement}
              />
            );
          }
        })}
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteWrapper;
