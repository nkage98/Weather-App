import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { authCheckRequest } from "../services/authService";

function Header() {
    const { user } = useContext(AuthContext);

    return (
        <header className="header">
            <nav className="header_nav">
                <section>
                    <NavLink to="/">☀️ Simple Weather 🌧️</NavLink>
                </section>
                <ul className="header_ul">
                    <li>
                        <NavLink to="/">Início</NavLink>
                    </li>

                    <li>
                        <NavLink to="/Favorites">Favoritos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Register">Cadastrar-se</NavLink>
                    </li>

                    <p>olá {user ? user.nome : "sem usuário"}</p>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
