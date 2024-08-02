import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
        // Validate input fields
        const isValid = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
        if (!isValid) return;

        // Debugging message
        console.log("hello front end");

        setLoading(true);

        try {
            // Send POST request to signup API endpoint
            const response = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
            });

            // Parse the response as JSON
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            // Check for errors in the response data
            if (data.error) {
                toast.error(data.error);
            } else {
                // Store user data in local storage and update auth user state
                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
            }
        } catch (error) {
            // Handle network or other unexpected errors
            console.error(error);
            toast.error(error.message);
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };
    z

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
