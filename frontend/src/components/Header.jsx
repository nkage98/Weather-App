import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>
            <nav>
                <section>
                    <NavLink  to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
                            ☀️ Weather App 🌧️
                        </NavLink>
                </section>
                <ul>
                    <NavLink  to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
                            Início
                    </NavLink>
                    <li>
                        <NavLink  to="/Favorites" className={({ isActive }) => (isActive ? "active" : undefined)}>
                            Favoritos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink  to="/Login" className={({ isActive }) => (isActive ? "active" : undefined)}>
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink  to="/Register" className={({ isActive }) => (isActive ? "active" : undefined)}>
                            Cadastrar-se
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
