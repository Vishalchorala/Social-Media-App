import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Roller } from 'react-awesome-spinners'
import { paths } from "../../constant/Paths";


const GuestRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-white">
        <Roller size={64} color="#ff4e7b" />
        <p className="mt-4 text-xl font-mono text-[#1d3557] font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to={paths.home} replace /> : children;
};

export default GuestRoute;