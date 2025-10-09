const WeatherService = require('../src/weatherService');
const axios = require('axios');

// Mock de axios
jest.mock('axios');

describe('WeatherService', () => {
  let weatherService;

  beforeEach(() => {
    // Configurar variable de entorno para tests
    process.env.WEATHER_API_KEY = 'test_api_key_12345';
    weatherService = new WeatherService();
    jest.clearAllMocks();
  });

  describe('getCurrentWeather', () => {
    test('debe devolver información del clima exitosamente', async () => {
      const mockResponse = {
        data: {
          name: 'Madrid',
          sys: { country: 'ES' },
          main: {
            temp: 20,
            feels_like: 19,
            humidity: 60
          },
          weather: [{
            description: 'cielo claro',
            icon: '01d'
          }],
          wind: { speed: 3.5 }
        }
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await weatherService.getCurrentWeather('Madrid');

      expect(result.success).toBe(true);
      expect(result.data.city).toBe('Madrid');
      expect(result.data.temperature).toBe(20);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test('debe manejar errores de la API', async () => {
      axios.get.mockRejectedValue({
        response: {
          status: 404,
          data: { message: 'city not found' }
        }
      });

      const result = await weatherService.getCurrentWeather('CiudadInexistente');

      expect(result.success).toBe(false);
      expect(result.error).toContain('404');
    });

    test('debe manejar errores de conexión', async () => {
      axios.get.mockRejectedValue({
        request: {}
      });

      const result = await weatherService.getCurrentWeather('Madrid');

      expect(result.success).toBe(false);
      expect(result.error).toContain('conectar');
    });
  });

  test('debe lanzar error si no hay API key configurada', () => {
    delete process.env.WEATHER_API_KEY;
    
    expect(() => {
      new WeatherService();
    }).toThrow('WEATHER_API_KEY no está configurada');
  });
});