import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [auth, , authLoading] = useAuth();
  const [ok, setOk] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (authLoading) return;

      if (!auth?.token) {
        setOk(false);
        setChecking(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/auth/user-auth", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setOk(res.data.ok);
      } catch (err) {
        setOk(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [auth?.token, authLoading]);

  if (authLoading || checking) return <Spinner />;

  if (!ok) return <Spinner path="login" />;

  return <Outlet />;
}
