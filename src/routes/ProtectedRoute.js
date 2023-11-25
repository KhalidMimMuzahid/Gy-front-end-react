import { Navigate, Outlet } from "react-router-dom";
import { useGetLoginUserQuery } from "../Services/userApi";

// for user
export const ForUserPrivateRoute = ({ roles }) => {
  const { data } = useGetLoginUserQuery();
  let protect = roles.includes(data?.data?.role);
  return protect ? <Outlet /> :  <Navigate to="/dashboard" />;
};
// for admin
export const ForAdminPrivateRoute = ({ roles }) => {
  const { data } = useGetLoginUserQuery();
  let protect = roles.includes(data?.data?.role);

  return protect ? <Outlet /> : <Navigate to="/dashboard" />;
};
