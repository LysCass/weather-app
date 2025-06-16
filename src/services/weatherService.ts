import type { WeatherData } from "../types/weather";

const apiKey = "7c096a8c502a4beaa40142057251606";

export async function fetchWeatherByGeolocation(): Promise<WeatherData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização não suportada pelo navegador."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&lang=pt`
          );
          if (!res.ok) throw new Error("Erro ao buscar dados do clima.");
          const data: WeatherData = await res.json();
          resolve(data);
        } catch (err: any) {
          reject(err);
        }
      },
      (geoError) => {
        // Mensagem detalhada para facilitar o diagnóstico
        let message = `Não foi possível obter sua localização. (código ${geoError.code}) - ${geoError.message}`;
        if (geoError.code === 1) {
          message = "Permissão de localização negada. Por favor, permita o acesso à localização.";
        } else if (geoError.code === 2) {
          message = `Localização indisponível. (código 2) - ${geoError.message}. Tente ativar o Wi-Fi, testar em outro navegador ou dispositivo.`;
        } else if (geoError.code === 3) {
          message = "Tempo para obter localização esgotado.";
        }
        reject(new Error(message));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // <--- Opções adicionadas
    );
  });
}