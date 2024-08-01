import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setloading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {

    const getConversations = async () => {
      setloading(true);
      try {

        await fetch("https://chat-app-mern-d00k.onrender.com/api/users", {
          method: "GET"
        }).then(res => res.json()).then(data => {
          setConversations(data)
          if (data.error) {
            toast.error(data.error);
          }
        })

      } catch (error) {
        toast.error(error.message);
      } finally {
        setloading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
