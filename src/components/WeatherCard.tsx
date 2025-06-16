import type { WeatherData } from "../types/weather";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="bg-black bg-opacity-80 rounded-xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">Clima Atual</h1>
      <h2 className="text-xl font-semibold mb-4 text-white text-center drop-shadow-lg">
        {weather.location.name}, {weather.location.region}
      </h2>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
        className="w-20 h-20 mb-4"
      />
      <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
        {weather.current.temp_c}°C
      </div>
      <div className="text-2xl text-white mb-2 text-center drop-shadow-lg">
        {weather.current.condition.text}
      </div>
      <div className="text-lg text-gray-200">{weather.location.country}</div>
    </div>
  );
}