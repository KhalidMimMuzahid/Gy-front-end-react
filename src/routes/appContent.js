import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useGetLoginUserQuery } from "../Services/userApi";
import { getLocalStorage } from "../utils/function/localStorage";
import { routers } from "./_routers";
import Loading from "../components/Loading/Loading";

const AppContent = () => {
  const { data } = useGetLoginUserQuery();
  const navigate = useNavigate();
  const token = getLocalStorage("safe_secure_token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const perRoute = routers?.filter((rt) => rt?.permission?.includes(data?.data?.role));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Suspense
        fallback={
          <Loading/>
        }
      >
        <Routes>
          <>
            {perRoute?.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.component />}
                  />
                )
              );
            })}
          </>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppContent;
