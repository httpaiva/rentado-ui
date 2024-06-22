/* eslint-disable react/display-name */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withoutAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        router.push("/locations");
      } else {
        setIsAuthenticated(false);
      }
    }, [router]);

    if (isAuthenticated) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withoutAuth;
