import { createContext, useState, useEffect } from "react";
import { userRequest } from "../services/authService";
import { authCheckRequest } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError(null);
        try {
            const data = authCheckRequest();

            setUser(null);

            if (data.authenticated) setUser(data.user);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    function userService(name, email, password, requestType) {
        setLoading(true);
        setError(null);

        try {
            const data = userRequest(name, email, password, requestType);
            console.log("RequestType: ", requestType);
            console.log("Dados do usuário: ", data);
            setUser(data.user);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        // todo: implementar logout
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, error, userService, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
