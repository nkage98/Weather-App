import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        handleLogout();
        navigate("/");
    }

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

                    {!user && (
                        <>
                            <li>
                                <NavLink to="/Login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Register">Cadastrar-se</NavLink>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <p>Olá, {user.name}</p>
                            <li>
                                <NavLink onClick={handleSubmit}>Logout</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
