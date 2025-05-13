import { FC } from "react";
import { useAuth } from "../../providers/auth-provider";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../loader";

const Protected: FC = () => {
  const { user, loading } = useAuth();

  if (loading || user === undefined) {
    return <Loader />;
  }

  if (user === null) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default Protected;
