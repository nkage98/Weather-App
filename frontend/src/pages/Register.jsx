import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { user, userService, error, loading } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();

        userService(name, email, password, "register");

        if (error) {
            console.log("Erro ao registrar: ", error);
        }

        if (user) {
            useNavigate("/login");
            console.log("Usuário Registrado com sucesso!");
        }
    }

    return (
        <section>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                    Já possui uma conta?
                    <span>
                        <NavLink to="/login"> Faça o login aqui!</NavLink>
                    </span>
                </p>
            </div>
        </section>
    );
}

export default Register;
