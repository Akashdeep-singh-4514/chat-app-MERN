import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function useLogout() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://chat-app-mern-d00k.onrender.com/api/auth/logout`, {
                method: 'POST',
            });

            const data = await response.json();

            if (data.error) {
                toast.error(data.error);
            } else {
                localStorage.removeItem('chat-user');
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
