import React, { useEffect, useState } from 'react'
import useConversations from '../zustand/useConversations'
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setloading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversations()
    // console.log(selectedConversation);
    useEffect(() => {

        const getMessages = async () => {
            setloading(true);

            try {
                await fetch(`https://chat-app-mern-d00k.onrender.com/api/messages/${selectedConversation._id}`).then(res => res.json()).then(data => {
                    setMessages(data)
                    console.log(data);
                    if (data.error) {
                        toast.error(data.error)
                    }
                })
            } catch (error) {
                toast.error(error.message);
            } finally {
                setloading(false);
            }
        };

        if (selectedConversation !== null) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
}

export default useGetMessages
