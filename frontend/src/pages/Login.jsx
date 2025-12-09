import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, userService, error, loading } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();

        userService(email, password, "login");

        if (error) {
            console.log("Erro ao fazer login: ", error);
        }

        if (user) {
            useNavigate("/");
            console.log("Login bem-sucedido! usuario: ", user.username);
        }
    }

    return (
        <section>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Entrar</button>

                {/* {error && <p>{error}</p>} */}
            </form>
            <div>
                <p>
                    Não possui uma conta?
                    <span>
                        <NavLink to="/register"> Cadastre-se aqui.</NavLink>
                    </span>
                </p>
            </div>
        </section>
    );
}

export default Login;
