import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);



  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://chat-app-mern-d00k.onrender.com/api/users`, {
          method: "GET",
          headers: { jwt_chat_app: authUser.token }
        });
        console.log(response);

        // if (!response.ok) {
        //   const errorText = await response.text();
        //   //     console.error("Server error:", errorText);
        //   toast.error("Server error: " + errorText);
        //   return;
        // }
        const data = await response.json();
        console.log(data);

        if (data.error) {
          toast.error(data.error);
        } else {
          setConversations(data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
