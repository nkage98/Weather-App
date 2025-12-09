async function weatherService(city) {
    const response = await fetch(
        `http://localhost:3000/api/weather/city/${city}`
    );

    if (!response) {
        throw new Error("Erro ao buscar dados");
    }

    const data = await response.json();

    return data;
}

export default weatherService;
