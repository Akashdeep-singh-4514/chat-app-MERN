import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    // const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
    //     // Validate input fields
    //     const isValid = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
    //     if (!isValid) return;

    //     // Debugging message
    //     console.log("hello front end");

    //     setLoading(true);

    //     try {
    //         await fetch(`/api/auth/signup`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
    //         }).then(res => res.json()).then(data => {
    //             console.log(data);
    //             if (data.error) {
    //                 toast.error(data.error);
    //             } else {
    //                 localStorage.setItem("chat-user", JSON.stringify(data));
    //                 setAuthUser(data);
    //             }
    //         })


    //     } catch (error) {
    //         console.error(error);
    //         toast.error(error.message);
    //     } finally {

    //         setLoading(false);
    //     }
    // };


    const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
        // Validate input fields
        const isValid = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
        if (!isValid) return;

        // Debugging message
        console.log("hello front end");

        setLoading(true);

        try {
            const response = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
            });
            console.log(response);

            // Check if the response is OK (status in the range 200-299)
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error:", errorText);
                toast.error("Server error: " + errorText);
                return;
            }

            // Try parsing the JSON response
            const data = await response.json();
            console.log(data);

            if (data.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
            }

        } catch (error) {
            console.error("Network error:", error);
            toast.error("Network error: " + error.message);
        } finally {
            setLoading(false);
        }
    };



    return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
