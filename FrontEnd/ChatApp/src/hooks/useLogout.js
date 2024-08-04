
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext'
import toast from "react-hot-toast";


function useLogout() {
    const [loading, setloading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setloading(true);
        try {
            await fetch(`https://chat-app-mern-d00k.onrender.com/api/auth/logout`, {

                method: "POST",

            }).then(res => res.json()).then(data => {
                if (data.error) {
                    toast.error(data.error)
                } else {
                    localStorage.removeItem("chat-user");
                    setAuthUser(null);
                    console.log(data);
                }
            })

        } catch (error) {
            toast.error(error.message)
        } finally {
            setloading(false)
        }
    }
    return { logout, loading }
}

export default useLogout
