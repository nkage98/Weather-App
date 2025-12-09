export async function userRequest(email, password, requestType) {
    const response = await fetch(`http://localhost:3000/api/${requestType}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Credenciais inválidas");

    return response.json();
}

export async function authCheckRequest() {
    const response = await fetch("http://localhost:3000/api/authcheck", {
        method: "GET",
        credentials: "include",
    });

    return response.json();
}
