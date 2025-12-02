import { useState, useEffect } from "react";

export function useWeather(city) {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `http://localhost:3000/api/weather/city/${city}`
                );

                if (!response.ok) {
                    throw new Error("Erro ao buscar dados: ", response.status);
                }

                const data = await response.json();

                if (!isCancelled) {
                    setWeatherData(data);
                    setLoading(false);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err.message);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isCancelled = true;
        };
    }, [city]);

    return { weatherData, loading, error };
}
