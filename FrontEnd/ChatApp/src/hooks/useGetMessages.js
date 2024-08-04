import React, { useEffect, useState } from 'react';
import useConversations from '../zustand/useConversations';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversations();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id) return;

            setLoading(true);

            try {
                const response = await fetch(`https://chat-app-mern-d00k.onrender.com/api/messages/${selectedConversation._id}`);
                const data = await response.json();

                if (data.error) {
                    toast.error(data.error);
                } else {
                    setMessages(data);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
