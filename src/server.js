require('dotenv').config();
const express = require('express');
const WeatherService = require('./weatherService');

const app = express();
const PORT = process.env.PORT || 3000;
const weatherService = new WeatherService();

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: '🌤️ API del Clima - TP Seguridad Informática',
    endpoints: {
      current: '/weather/:city - Obtener clima actual',
      forecast: '/forecast/:city - Obtener pronóstico',
      health: '/health - Estado del servicio'
    },
    example: '/weather/Madrid'
  });
});

// Ruta para obtener clima actual
app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  
  if (!city) {
    return res.status(400).json({
      success: false,
      error: 'Debe proporcionar el nombre de una ciudad'
    });
  }

  const result = await weatherService.getCurrentWeather(city);
  
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

// Ruta para obtener pronóstico
app.get('/forecast/:city', async (req, res) => {
  const { city } = req.params;
  
  if (!city) {
    return res.status(400).json({
      success: false,
      error: 'Debe proporcionar el nombre de una ciudad'
    });
  }

  const result = await weatherService.getForecast(city);
  
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// Solo iniciar el servidor si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📍 Prueba: http://localhost:${PORT}/weather/Madrid`);
  });
}

module.exports = app;