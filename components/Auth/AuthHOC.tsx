import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface AuthProps {
  isAuthenticated: boolean;
}

const withAuth =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const isAuth =
        (localStorage.getItem("is-authenticated") || "") === "true";
      setAuthenticated(isAuth);
      if (!isAuth) {
        router.push("/");
      }
    }, []);

    return <Component {...props} isAuthenticated={isAuthenticated} />;
  };

export default withAuth;
