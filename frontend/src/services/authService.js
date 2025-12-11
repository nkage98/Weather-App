export async function login(email, password) {
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.status !== 200) {
            return { success: false, message: data.message };
        }
        return { success: true, data };
    } catch (error) {
        console.error("Error during request:", error);
        return { success: false, message: error.message };
    }
}

export async function register(name, email, password) {
    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error during request:", error);
        return { success: false, message: error.message };
    }
}

export async function authCheck() {
    try {
        const response = await fetch("http://localhost:3000/api/auth-check", {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (response.status !== 200) {
            console.log("Auth check failed: ", data.message);
            return data.message;
        }

        return data;
    } catch (error) {
        console.error("Error during auth check request:", error);
        return { message: error };
    }
}
