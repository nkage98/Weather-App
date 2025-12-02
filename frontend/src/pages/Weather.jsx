import { useState } from "react";
import { useWeather } from "../hook/useWeather";
import { useParams } from "react-router-dom";

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
            <form>
                <input type="text" placeholder="Digite o nome da cidade" />
            </form>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </>
    );
}

export default Weather;
