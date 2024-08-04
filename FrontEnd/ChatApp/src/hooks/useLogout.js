import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function useLogout() {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://chat-app-mern-d00k.onrender.com/api/auth/logout`, {
                // const response = await fetch(`http://localhost:5000/api/auth/logout`, {

                method: 'POST',
                headers: { "jwt": authUser.token }

            });

            const data = await response.json();

            if (data.error) {
                toast.error(data.error);
            } else {
                localStorage.removeItem('chat-user');
                localStorage.removeItem('jwt_chat_app');
                setAuthUser(null);
                console.log(data);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading };
}

export default useLogout;
