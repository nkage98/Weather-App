import { useState, useEffect } from "react";
import weatherService from "../services/weatherService";

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

                const data = await weatherService(city);

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
