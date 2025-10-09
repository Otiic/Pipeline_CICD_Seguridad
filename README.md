# CI/CD Seguro - TP Seguridad Informática

![CI/CD Status](https://github.com/Otiic/Pipeline_CICD_Seguridad/workflows/CI%2FCD%20Pipeline/badge.svg)

[![codecov](https://codecov.io/gh/Otiic/Pipeline_CICD_Seguridad/branch/main/graph/badge.svg)](https://codecov.io/gh/Otiic/Pipeline_CICD_Seguridad)

## Descripción
Aplicación de ejemplo con pipeline CI/CD seguro usando GitHub Actions.

## 🔐 Gestión de Secrets

### Secrets Configurados

Este proyecto utiliza los siguientes secrets:

| Secret | Descripción | Dónde obtenerlo |
|--------|-------------|-----------------|
| `WEATHER_API_KEY` | API Key de OpenWeatherMap | https://openweathermap.org/api |

### Configuración Local

1. Copia el archivo de ejemplo:
    cp .env.example .env
2. Edita .env y agrega tus valores reales:
    WEATHER_API_KEY=tu_clave_aqui