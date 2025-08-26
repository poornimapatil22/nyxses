import AppRoutes from "../router/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthOnLoad } from "../features/auth/slice/authSlice";

import "../index.css"; // Tailwind + theme variables

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
    dispatch(checkAuthOnLoad());
    }
  }, [dispatch]);
  

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
