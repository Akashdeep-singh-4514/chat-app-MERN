import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser } = useAuthContext();


  useEffect(() => {
    // console.log(authUser);

    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://chat-app-mern-d00k.onrender.com/api/users`, {
          // const response = await fetch(`http://localhost:5000/api/users`, {

          method: "GET",
          headers: { "jwt": authUser.token }

        });

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
