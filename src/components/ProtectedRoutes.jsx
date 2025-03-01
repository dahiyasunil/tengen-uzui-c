import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loggedIn) navigate("/");
  }, []);

  return loggedIn && children;
};

export default ProtectedRoutes;
