# 🔐 Pipeline CI/CD Seguro - Weather API

![CI/CD Status](https://github.com/TU-USUARIO/TU-REPO/workflows/CI%2FCD%20Pipeline/badge.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> Trabajo Práctico de Seguridad Informática - Implementación de Pipeline CI/CD con Gestión Segura de Secretos

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Gestión de Secrets](#-gestión-de-secrets)
- [Despliegue](#-despliegue)
- [Testing](#-testing)
- [Rotación de Claves](#-rotación-de-claves)
- [Mejores Prácticas](#-mejores-prácticas-de-seguridad)
- [API Endpoints](#-api-endpoints)

---

## 📖 Descripción

Aplicación Node.js que consulta información meteorológica en tiempo real utilizando la API de OpenWeatherMap. El proyecto implementa un pipeline completo de CI/CD con GitHub Actions, enfocándose en las mejores prácticas de seguridad para la gestión de secretos y credenciales.

### Objetivos del Proyecto

- ✅ Implementar integración continua (CI) con testing automatizado
- ✅ Configurar despliegue continuo (CD) seguro
- ✅ Gestionar secretos de forma segura (GitHub Secrets)
- ✅ Demostrar prácticas de rotación de claves
- ✅ Documentar procesos de seguridad

---

## ✨ Características

- 🌤️ **Consulta de clima en tiempo real** para cualquier ciudad del mundo
- 📊 **Pronóstico extendido** de 5 días
- 🔐 **Gestión segura de API Keys** (nunca expuestas en el código)
- 🤖 **CI/CD automatizado** con GitHub Actions
- 🧪 **Tests unitarios y de integración** con Jest
- 🚀 **Despliegue automático** en Render
- 🔄 **Script de rotación de claves** automatizado
- 📝 **Documentación completa** de procesos de seguridad

---

## 🛠️ Tecnologías

### Backend
- **Node.js** (v18.x) - Runtime de JavaScript
- **Express** - Framework web minimalista
- **Axios** - Cliente HTTP para API calls

### Testing
- **Jest** - Framework de testing
- **Coverage Reports** - Reportes de cobertura de código

### CI/CD & DevOps
- **GitHub Actions** - Automatización de workflows
- **Render** - Plataforma de despliegue
- **GitHub Secrets** - Gestión de credenciales

### APIs Externas
- **OpenWeatherMap API** - Datos meteorológicos

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 ([Descargar](https://nodejs.org/))
- **npm** >= 9.0.0 (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- **Cuenta en GitHub** ([Registrarse](https://github.com/))
- **API Key de OpenWeatherMap** ([Obtener gratis](https://openweathermap.org/api))

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
cd TU-REPO
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus valores reales
nano .env
```

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# API Keys
WEATHER_API_KEY=tu_clave_de_openweathermap_aqui

# Configuración
NODE_ENV=development
PORT=3000
```

**⚠️ IMPORTANTE:** El archivo `.env` está en `.gitignore` y NUNCA debe ser commiteado.

### Obtener API Key de OpenWeatherMap

1. Registrarse en [OpenWeatherMap](https://openweathermap.org/api)
2. Ir a **API Keys** en tu perfil
3. Copiar tu API key (formato: 32 caracteres alfanuméricos)
4. Pegar en el archivo `.env`
5. **Esperar 10-30 minutos** para que se active (claves nuevas)

---

## 💻 Uso

### Modo Desarrollo

```bash
# Iniciar servidor con hot-reload
npm run dev

# El servidor estará disponible en http://localhost:3000
```

### Modo Producción

```bash
# Iniciar servidor
npm start
```

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Tests con watch mode
npm run test:watch

# Ver cobertura
npm test -- --coverage
```

### Verificar Configuración

```bash
# Verificar que los secrets estén configurados
npm run check-secrets
```

### Simular Rotación de Claves

```bash
# Ejecutar script de rotación (simulado)
npm run rotate-keys
```

---

## 📁 Estructura del Proyecto

```
ci-cd-seguro-tp/
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # Pipeline de CI/CD
├── src/
│   ├── server.js               # Servidor Express principal
│   └── weatherService.js       # Servicio de API del clima
├── tests/
│   ├── weatherService.test.js  # Tests unitarios (mocks)
│   └── weatherService.integration.test.js  # Tests de integración
├── scripts/
│   ├── check-secrets.js        # Verificador de secrets
│   └── rotate-keys.js          # Script de rotación de claves
├── .env                        # Variables de entorno (NO commitear)
├── .env.example                # Plantilla de variables
├── .gitignore                  # Archivos ignorados por Git
├── package.json                # Dependencias y scripts
├── package-lock.json           # Lockfile de dependencias
├── Procfile                    # Configuración para Render
├── render.yaml                 # Infraestructura como código
└── README.md                   # Este archivo
```

---

## 🔄 Pipeline CI/CD

### Flujo del Pipeline

```
Developer Push → GitHub → GitHub Actions → Tests → Deploy → Render
```

### Jobs del Workflow

#### 1. Build & Test
- ✅ Checkout del código
- ✅ Setup de Node.js (v18)
- ✅ Instalación de dependencias (`npm ci`)
- ✅ Verificación de secrets
- ✅ Ejecución de tests unitarios
- ✅ Generación de reportes de cobertura

#### 2. Lint
- ✅ Verificación de calidad de código
- ✅ Validación de formato

#### 3. Deploy
- ✅ Solo se ejecuta si los tests pasan
- ✅ Solo en push a rama `master`
- ✅ Render despliega automáticamente

### Triggers

El pipeline se ejecuta automáticamente en:
- ✅ Push a la rama `master`
- ✅ Pull Requests hacia `master`

### Archivo de Configuración

Ver [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) para detalles completos.

---

## 🔐 Gestión de Secrets

### Principios de Seguridad Implementados

1. **Separación de Secretos del Código**
   - Uso de variables de entorno
   - Archivo `.env` en `.gitignore`
   - GitHub Secrets para CI/CD

2. **Encriptación en Reposo**
   - GitHub encripta todos los secrets
   - Solo se desencriptan durante ejecución

3. **Principio de Mínimo Privilegio**
   - Cada secret se expone solo donde se necesita
   - Scope limitado por job/step

4. **Enmascaramiento Automático**
   - GitHub oculta valores en logs
   - Imposible exponer secrets accidentalmente

5. **Auditoría**
   - Logs de cuándo se usan los secrets
   - Verificación automática de configuración

### Secrets Configurados

| Secret | Descripción | Dónde |
|--------|-------------|-------|
| `WEATHER_API_KEY` | API Key de OpenWeatherMap | GitHub + Render |
| `NODE_ENV` | Entorno de ejecución | Render |
| `PORT` | Puerto del servidor | Render (auto) |

### Configuración Local

```bash
# 1. Copiar plantilla
cp .env.example .env

# 2. Editar con valores reales
nano .env

# 3. NUNCA commitear este archivo
# (ya está en .gitignore)
```

### Configuración en GitHub Actions

1. Ve a: **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Agregar:
   - Name: `WEATHER_API_KEY`
   - Secret: Tu API key de OpenWeatherMap
4. Click en **Add secret**

### Configuración en Render

1. Dashboard → Tu servicio → **Environment**
2. Click en **Add Environment Variable**
3. Agregar:
   - Key: `WEATHER_API_KEY`
   - Value: Tu API key
4. **Save Changes** (dispara redeploy automático)

### Verificar Configuración

```bash
# Localmente
npm run check-secrets

# En CI/CD (automático)
# Ver logs en GitHub Actions
```

### Herramientas de Gestión de Secrets

Para proyectos enterprise, considera:

- **HashiCorp Vault** - Gestión centralizada de secretos
- **AWS Secrets Manager** - Integración con AWS
- **Azure Key Vault** - Integración con Azure
- **Doppler** - Plataforma moderna de secrets
- **GitGuardian** - Escaneo de secretos en código

---

## 🚀 Despliegue

### Plataforma de Hosting

**Render**: https://TU-APP.onrender.com

### Despliegue Automático

El despliegue es completamente automático:

1. Haces push a la rama `master`
2. GitHub Actions ejecuta los tests
3. Si los tests pasan ✅, Render despliega automáticamente
4. Nueva versión disponible en ~2-3 minutos

### Configuración Manual en Render

Si necesitas configurar desde cero:

#### 1. Crear Cuenta
- Registrarse en [render.com](https://render.com)
- Sign Up con GitHub

#### 2. Nuevo Web Service
- Dashboard → **New +** → **Web Service**
- Conectar repositorio de GitHub
- Autorizar acceso a Render

#### 3. Configuración
```
Name:           cicd-seguro-tp
Region:         Closest to you
Branch:         master
Root Directory: (leave empty)
Environment:    Node
Build Command:  npm install
Start Command:  node src/server.js
Plan:           Free
```

#### 4. Variables de Entorno
```
WEATHER_API_KEY=tu_clave_aqui
NODE_ENV=production
```

#### 5. Deploy
- Click en **Create Web Service**
- Esperar ~3-5 minutos

### Auto-Deploy

Por defecto, Render despliega automáticamente en cada push a `master`.

Para verificar:
- Render Dashboard → Tu servicio → **Settings**
- **Build & Deploy** → Auto-Deploy: `Yes`

### Monitoreo

```bash
# Ver logs en tiempo real
# Render Dashboard → Tu servicio → Logs

# Health check
curl https://tu-app.onrender.com/health
```

---

## 🧪 Testing

### Estrategia de Testing

#### Tests Unitarios (Unit Tests)
- **Qué testean:** Lógica de negocio aislada
- **Usan:** Mocks de APIs externas
- **Velocidad:** Muy rápidos (< 1 segundo)
- **Archivo:** `tests/weatherService.test.js`

#### Tests de Integración
- **Qué testean:** Integración con APIs reales
- **Usan:** API real de OpenWeatherMap
- **Velocidad:** Más lentos (2-5 segundos)
- **Archivo:** `tests/weatherService.integration.test.js`

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Solo unitarios (rápido)
npm test -- weatherService.test.js

# Solo integración (requiere API key)
npm test -- weatherService.integration.test.js

# Watch mode (desarrollo)
npm run test:watch

# Con cobertura detallada
npm test -- --coverage --verbose
```

### Cobertura de Código

El proyecto mantiene:
- ✅ **> 80%** cobertura de statements
- ✅ **> 75%** cobertura de branches
- ✅ **> 80%** cobertura de funciones

Ver reporte completo: `coverage/lcov-report/index.html`

### Mocking

Usamos Jest para mockear axios:

```javascript
// Mock de axios
jest.mock('axios');

// Programar respuesta mock
axios.get.mockResolvedValue(mockData);

// Verificar que se llamó
expect(axios.get).toHaveBeenCalledTimes(1);
```

**Ventajas:**
- ⚡ Tests instantáneos
- 🔒 No requiere API key
- 🎯 Resultados predecibles
- 💰 No consume cuota de API

---

## 🔄 Rotación de Claves

### ¿Por Qué Rotar Claves?

La rotación periódica de claves es una **práctica crítica de seguridad**:

- 🔐 Limita el impacto de claves comprometidas
- ⏰ Reduce ventana de exposición
- 📋 Cumple con normativas de seguridad
- 🛡️ Minimiza riesgo de uso no autorizado

### Frecuencia Recomendada

| Entorno | Frecuencia |
|---------|-----------|
| **Desarrollo** | Cada 90 días |
| **Staging** | Cada 60 días |
| **Producción** | Cada 30-45 días |
| **Post-incidente** | Inmediatamente |

### Ejecutar Rotación

```bash
# Script de rotación simulada
npm run rotate-keys
```

### Proceso Manual (Producción Real)

#### 1. Generar Nueva Clave
- OpenWeatherMap → API Keys → Generate Key
- Copiar nueva clave

#### 2. Actualizar en Render
- Dashboard → Tu servicio → **Environment**
- Editar `WEATHER_API_KEY`
- Pegar nueva clave
- **Save** (dispara redeploy automático)

#### 3. Actualizar en GitHub
- Settings → **Secrets and variables** → **Actions**
- Editar `WEATHER_API_KEY`
- Pegar nueva clave
- **Update secret**

#### 4. Verificar
```bash
# Esperar ~2 minutos al redeploy
curl https://tu-app.onrender.com/weather/Madrid
```

#### 5. Revocar Clave Antigua
- Esperar 24-48 horas (período de gracia)
- OpenWeatherMap → Delete old key

### Automatización Avanzada

Para automatización completa, el script podría:
- Llamar a OpenWeatherMap API para generar key
- Usar GitHub API para actualizar secrets
- Usar Render API para actualizar env vars
- Validar funcionamiento
- Revocar clave antigua automáticamente

---

## 🛡️ Mejores Prácticas de Seguridad

### ✅ DO (Hacer)

- ✅ **Usar variables de entorno** para todos los secrets
- ✅ **Rotar claves periódicamente** (30-90 días)
- ✅ **Diferentes claves por entorno** (dev/staging/prod)
- ✅ **Documentar qué secrets se necesitan**
- ✅ **Usar GitHub Secret Scanning** (detecta leaks)
- ✅ **Implementar principio de mínimo privilegio**
- ✅ **Auditar acceso a secrets** regularmente
- ✅ **Usar HTTPS** para todas las comunicaciones
- ✅ **Validar datos de entrada** (sanitización)
- ✅ **Mantener dependencias actualizadas**

### ❌ DON'T (No Hacer)

- ❌ **Hardcodear secrets en el código**
- ❌ **Commitear archivos `.env`**
- ❌ **Compartir secrets por email/chat**
- ❌ **Reutilizar claves entre proyectos**
- ❌ **Loguear valores de secrets**
- ❌ **Usar secrets en URLs (query strings)**
- ❌ **Exponer secrets en mensajes de error**
- ❌ **Almacenar secrets en wikis/documentos**
- ❌ **Usar credenciales por defecto**
- ❌ **Ignorar alertas de seguridad**

### Herramientas de Seguridad

- **GitHub Secret Scanning** - Detecta secrets commiteados
- **Dependabot** - Actualiza dependencias vulnerables
- **npm audit** - Escanea vulnerabilidades en paquetes
- **Snyk** - Análisis de seguridad continuo
- **GitGuardian** - Monitoreo de secrets en repos

---

## 🌐 API Endpoints

### Base URL

- **Local:** `http://localhost:3000`
- **Producción:** `https://tu-app.onrender.com`

### Endpoints Disponibles

#### GET `/`
Información general de la API

**Response:**
```json
{
  "message": "🌤️ API del Clima - TP Seguridad Informática",
  "endpoints": {
    "current": "/weather/:city - Obtener clima actual",
    "forecast": "/forecast/:city - Obtener pronóstico",
    "health": "/health - Estado del servicio"
  },
  "example": "/weather/Madrid"
}
```

#### GET `/weather/:city`
Obtener clima actual de una ciudad

**Parameters:**
- `city` (string) - Nombre de la ciudad

**Example:**
```bash
curl https://tu-app.onrender.com/weather/Madrid
```

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "Madrid",
    "country": "ES",
    "temperature": 18.5,
    "feels_like": 17.8,
    "humidity": 65,
    "description": "nubes dispersas",
    "icon": "02d",
    "wind_speed": 3.5
  }
}
```

#### GET `/forecast/:city`
Obtener pronóstico de 5 días

**Parameters:**
- `city` (string) - Nombre de la ciudad

**Example:**
```bash
curl https://tu-app.onrender.com/forecast/London
```

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "London",
    "country": "GB",
    "forecast": [
      {
        "datetime": "2025-10-09 12:00:00",
        "temperature": 15.2,
        "description": "cielo claro"
      },
      ...
    ]
  }
}
```

#### GET `/health`
Health check del servicio

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-09T15:30:00.000Z",
  "uptime": 12345.67
}
```

### Códigos de Estado

| Código | Significado |
|--------|-------------|
| `200` | Éxito |
| `400` | Error en la solicitud (ciudad inválida, etc.) |
| `404` | Ruta no encontrada |
| `500` | Error interno del servidor |

---

<div align="center">

</div>