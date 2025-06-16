import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import { fetchWeatherByGeolocation } from "./services/weatherService";
import "./styles.css";
import type { WeatherData } from "./types/weather";

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  

  const handleGetWeather = () => {
    setLoading(true);
    setError("");
    fetchWeatherByGeolocation()
      .then(setWeather)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100">
      <div className="w-full max-w-md">
        {loading && (
          <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <p className="text-center text-lg text-blue-700">Carregando clima...</p>
          </div>
        )}
        {error && (
          <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-red-500 text-lg mb-2">{error}</span>
            <span className="text-gray-700 text-sm mb-4">
              Verifique se você permitiu o acesso à localização no navegador e se está usando HTTPS ou localhost.
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
              onClick={handleGetWeather}
            >
              Tentar novamente
            </button>
          </div>
        )}
        {!weather && !loading && !error && (
          <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition text-lg"
              onClick={handleGetWeather}
            >
              Obter clima pela minha localização
            </button>
          </div>
        )}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}