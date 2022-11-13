import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { showErrorToast } from "../../utils/toaster";

export interface AuthProps {
  isAuthenticated: boolean;
}

/* eslint-disable react/display-name */
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
        showErrorToast("You are not logged in!");
      }
    }, []);

    return (
      <>
        {isAuthenticated && (
          <Component {...props} isAuthenticated={isAuthenticated} />
        )}
      </>
    );
  };

export default withAuth;
