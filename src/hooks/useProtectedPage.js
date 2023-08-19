import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToFeed } from "../routes/coordinator";

export const useProtectedpage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (!token) {
      goToFeed(navigate);
    }
  }, []);
};
