import { createContext, useState, useEffect, use } from "react";
import { login, register, authCheck } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError(null);

        const getUser = async () => {
            try {
                const data = await authCheck();
                setUser(null);

                if (data.authenticated) setUser(data.userData);
                console.log("Authenticated user: ", data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    async function handleLogin(email, password) {
        const data = await login(email, password);

        if (data.success) {
            console.log("Login successfull ");

            const response = await authCheck();
            console.log("Authenticated user: ", response);
            if (response.authenticated) {
                setUser(response.userData.name);
            }
        } else {
            console.log("Login failed: ", data.message);
            setUser(null);
            setError(data.message);
        }
    }

    async function handleRegister(name, email, password) {
        const data = await authService.register(name, email, password);

        if (data.success) {
            console.log("Registration successfull ");
        } else {
            setUser(null);
            setError(data.message);
        }
    }

    function handleLogout() {
        // todo: implementar logout
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                handleLogin,
                handleRegister,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
