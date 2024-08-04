import { useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import toast from "react-hot-toast"



function useLogin() {
  const [loading, setloading] = useState(false)
  const { setAuthUser } = useAuthContext()
  const login = async ({ userName, password }) => {
    // console.log(userName, password);
    const success = handleInputErrors({ userName, password });
    if (!success) return;
    setloading(true)
    try {
      await fetch(`https://chat-app-mern-d00k.onrender.com/api/auth/login`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      }).then(res => res.json()).then(data => {
        if (data.error) {
          toast.error(data.error)
        } else {
          localStorage.setItem("chat-user", JSON.stringify(data));
          setAuthUser(data);
          // console.log(data);
        }
      })

    } catch (error) {
      toast.error(error.message)
    } finally {
      setloading(false)
    }
  }

  return { loading, login }

}

export default useLogin

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
