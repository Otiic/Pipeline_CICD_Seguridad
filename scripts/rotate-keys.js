#!/usr/bin/env node

require('dotenv').config();

/**
 * Script de Rotación Automática de Claves
 * 
 * En un entorno real, este script:
 * 1. Genera una nueva API key
 * 2. Actualiza los secrets en GitHub/Render
 * 3. Valida que los servicios funcionen con la nueva clave
 * 4. Revoca la clave antigua
 */

const axios = require('axios');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function rotateApiKey() {
  log('\n🔄 Iniciando Rotación de Claves API', 'blue');
  log('═══════════════════════════════════════\n', 'blue');

  // Paso 1: Verificar clave actual
  log('1️⃣  Verificando clave actual...', 'yellow');
  const currentKey = process.env.WEATHER_API_KEY;
  
  if (!currentKey) {
    log('   ❌ No hay clave configurada', 'red');
    process.exit(1);
  }
  
  const maskedKey = currentKey.substring(0, 4) + '***' + currentKey.substring(currentKey.length - 4);
  log(`   ✅ Clave actual: ${maskedKey}`, 'green');
  
  // Paso 2: Probar clave actual
  log('\n2️⃣  Probando clave actual...', 'yellow');
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: 'Madrid',
          appid: currentKey,
          units: 'metric'
        }
      }
    );
    log('   ✅ Clave actual funciona correctamente', 'green');
  } catch (error) {
    log('   ❌ Error con clave actual', 'red');
    log(`   Detalle: ${error.message}`, 'red');
    process.exit(1);
  }

  // Paso 3: Simular generación de nueva clave
  log('\n3️⃣  Generando nueva clave API...', 'yellow');
  log('   ⚠️  SIMULACIÓN - En producción:', 'yellow');
  log('   • Se llamaría a la API del proveedor', 'yellow');
  log('   • Se generaría una nueva clave', 'yellow');
  log('   • Se recibiría la nueva clave', 'yellow');
  
  // Simular nueva clave
  const newKey = 'new_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const maskedNewKey = newKey.substring(0, 4) + '***' + newKey.substring(newKey.length - 4);
  log(`   ✅ Nueva clave generada: ${maskedNewKey}`, 'green');

  // Paso 4: Actualizar secrets
  log('\n4️⃣  Actualizando secrets...', 'yellow');
  log('   📝 GitHub Secrets:', 'yellow');
  log('      SIMULACIÓN - En producción usaría GitHub API', 'yellow');
  log('   📝 Render Environment Variables:', 'yellow');
  log('      SIMULACIÓN - En producción usaría Render API', 'yellow');
  log('   ✅ Secrets actualizados (simulado)', 'green');

  // Paso 5: Verificar nueva clave
  log('\n5️⃣  Verificando nueva clave...', 'yellow');
  log('   ⚠️  SIMULACIÓN - Verificación omitida en modo demo', 'yellow');
  log('   ✅ Nueva clave verificada (simulado)', 'green');

  // Paso 6: Desplegar con nueva clave
  log('\n6️⃣  Desplegando servicios con nueva clave...', 'yellow');
  log('   🔄 Trigger redeploy en Render', 'yellow');
  log('   ⏳ Esperando despliegue...', 'yellow');
  log('   ✅ Servicios desplegados (simulado)', 'green');

  // Paso 7: Revocar clave antigua
  log('\n7️⃣  Revocando clave antigua...', 'yellow');
  log('   ⚠️  Esperando período de gracia (24h recomendado)', 'yellow');
  log('   📝 Clave antigua marcada para revocación', 'yellow');

  // Resumen
  log('\n═══════════════════════════════════════', 'blue');
  log('✅ Rotación de claves completada exitosamente', 'green');
  log('═══════════════════════════════════════\n', 'blue');
  
  log('📋 Resumen:', 'blue');
  log(`   • Clave antigua: ${maskedKey}`, 'yellow');
  log(`   • Clave nueva:   ${maskedNewKey}`, 'green');
  log(`   • Servicios actualizados: GitHub, Render`, 'green');
  log(`   • Estado: ✅ Operacional\n`, 'green');
  
  log('⚠️  Próximos pasos manuales:', 'yellow');
  log('   1. Verificar que la aplicación funciona correctamente', 'yellow');
  log('   2. Monitorear logs por 24-48 horas', 'yellow');
  log('   3. Revocar clave antigua después del período de gracia\n', 'yellow');
}

// Manejo de errores
process.on('unhandledRejection', (error) => {
  log('\n❌ Error no manejado:', 'red');
  log(error.message, 'red');
  process.exit(1);
});

// Ejecutar
rotateApiKey().catch((error) => {
  log('\n❌ Error en rotación:', 'red');
  log(error.message, 'red');
  process.exit(1);
});
