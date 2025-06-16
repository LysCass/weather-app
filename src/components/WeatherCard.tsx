import type { WeatherData } from "../types/weather";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="bg-white bg-opacity-80 rounded-xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-blue-700">Clima Atual</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
        {weather.location.name}, {weather.location.region}
      </h2>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
        className="w-20 h-20 mb-4"
      />
      <div className="text-4xl font-bold text-blue-600 mb-2">
        {weather.current.temp_c}°C
      </div>
      <div className="text-lg text-gray-600 mb-2 text-center">
        {weather.current.condition.text}
      </div>
      <div className="text-md text-gray-500">{weather.location.country}</div>
    </div>
  );
}