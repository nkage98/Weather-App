function Home() {
    const city = "Curitiba";
    return (
        <div>
            <h1>Welcome to the Weather App</h1>
            <input type="text" value={city} placeholder="Enter city name" />
        </div>
    );
}
export default Home;
