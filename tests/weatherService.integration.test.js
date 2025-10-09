const WeatherService = require('../src/weatherService');

// ⚠️ Este test hace llamadas REALES a la API
// Solo se ejecuta si hay API key configurada
describe('WeatherService - Integration Tests', () => {
  let weatherService;
  const hasValidApiKey = process.env.WEATHER_API_KEY && 
                         process.env.WEATHER_API_KEY !== 'test_key_for_ci';

  beforeAll(() => {
    if (!hasValidApiKey) {
      console.log('⚠️ Skipping integration tests - No valid API key');
    }
  });

  beforeEach(() => {
    if (hasValidApiKey) {
      weatherService = new WeatherService();
    }
  });

  // Usar test.skip si no hay API key válida
  const conditionalTest = hasValidApiKey ? test : test.skip;

  conditionalTest(
    'debe obtener clima real de Madrid',
    async () => {
      const result = await weatherService.getCurrentWeather('Madrid');

      expect(result.success).toBe(true);
      expect(result.data.city).toBe('Madrid');
      expect(result.data.country).toBe('ES');
      expect(typeof result.data.temperature).toBe('number');
      expect(result.data.description).toBeTruthy();
    },
    10000 // timeout de 10 segundos
  );

  conditionalTest(
    'debe manejar ciudad inexistente correctamente',
    async () => {
      const result = await weatherService.getCurrentWeather('CiudadQueNoExiste12345');

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    },
    10000
  );
});