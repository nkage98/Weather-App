import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!city.trim()) return;

        navigate(`/weather/${city}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button type="submit">Pesquisar</button>
        </form>
    );
}

export default SearchBar;
