import { useWeather } from "../hook/useWeather";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function Weather() {
    const { city } = useParams();
    const { weatherData, loading, error } = useWeather(city);

    if (loading) return <p>Carregando...</p>;
    if (error) {
        console.error("Erro ao buscar dados:", error);
        return (
            <p style={{ color: "red" }}>
                Erro ao buscar dados, tente novamente mais tarde.
            </p>
        );
    }

    return (
        <>
            <div>
                <SearchBar />
            </div>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </>
    );
}

export default Weather;
