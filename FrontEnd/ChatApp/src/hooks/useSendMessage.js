import { useState } from 'react'
import toast from 'react-hot-toast'
import useConversations from '../zustand/useConversations';
import { useAuthContext } from '../contexts/AuthContext';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversations();
    const { authUser } = useAuthContext();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`https://chat-app-mern-d00k.onrender.com/api/messages/send/${selectedConversation._id}`, {
                // const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation._id}`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "jwt": authUser.token
                },
                body: JSON.stringify({ message }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};
export default useSendMessage;
