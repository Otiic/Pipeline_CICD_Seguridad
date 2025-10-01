const axios = require('axios');

/**
 * Servicio para obtener información del clima
 */
class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    
    if (!this.apiKey) {
      throw new Error('WEATHER_API_KEY no está configurada en las variables de entorno');
    }
  }

  /**
   * Obtiene el clima actual de una ciudad
   * @param {string} city - Nombre de la ciudad
   * @returns {Promise<Object>} Datos del clima
   */
  async getCurrentWeather(city) {
    try {
      const url = `${this.baseUrl}/weather`;
      const response = await axios.get(url, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric', // Celsius
          lang: 'es'
        }
      });

      return {
        success: true,
        data: {
          city: response.data.name,
          country: response.data.sys.country,
          temperature: response.data.main.temp,
          feels_like: response.data.main.feels_like,
          humidity: response.data.main.humidity,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          wind_speed: response.data.wind.speed
        }
      };
    } catch (error) {
      if (error.response) {
        // La API respondió con un error
        return {
          success: false,
          error: `Error ${error.response.status}: ${error.response.data.message}`
        };
      } else if (error.request) {
        // No hubo respuesta
        return {
          success: false,
          error: 'No se pudo conectar con la API del clima'
        };
      } else {
        // Error en la configuración
        return {
          success: false,
          error: error.message
        };
      }
    }
  }

  /**
   * Obtiene el pronóstico de 5 días
   * @param {string} city - Nombre de la ciudad
   * @returns {Promise<Object>} Pronóstico
   */
  async getForecast(city) {
    try {
      const url = `${this.baseUrl}/forecast`;
      const response = await axios.get(url, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
          lang: 'es'
        }
      });

      const forecast = response.data.list.slice(0, 8).map(item => ({
        datetime: item.dt_txt,
        temperature: item.main.temp,
        description: item.weather[0].description
      }));

      return {
        success: true,
        data: {
          city: response.data.city.name,
          country: response.data.city.country,
          forecast: forecast
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error obteniendo el pronóstico'
      };
    }
  }
}

module.exports = WeatherService;