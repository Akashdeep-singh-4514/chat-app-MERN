import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ userName, password }) => {
    // Validate input fields
    const success = handleInputErrors({ userName, password });
    if (!success) return;

    setLoading(true);

    try {
      const response = await fetch(`https://chat-app-mern-d00k.onrender.com/api/auth/login`, {
        // const response = await fetch(`http://localhost:5000/api/auth/login`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("chat-user", JSON.stringify(data));
        localStorage.setItem("jwt_chat_app", JSON.stringify(data.token));


        setAuthUser(data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useLogin;

function handleInputErrors({ userName, password }) {
  if (!userName || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
