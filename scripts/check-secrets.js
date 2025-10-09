#!/usr/bin/env node

/**
 * Script para verificar que los secrets/variables de entorno
 * están configurados correctamente
 */

const chalk = require('chalk') || { green: (s) => s, red: (s) => s, yellow: (s) => s };

console.log('\nVerificando configuración de secrets...\n');

const requiredSecrets = [
  {
    name: 'WEATHER_API_KEY',
    description: 'API Key de OpenWeatherMap',
    minLength: 32
  }
];

let allConfigured = true;

requiredSecrets.forEach(secret => {
  const value = process.env[secret.name];
  
  if (!value) {
    console.log(`❌ ${secret.name}: NO configurado`);
    console.log(`   → ${secret.description}`);
    allConfigured = false;
  } else if (value.length < secret.minLength) {
    console.log(`⚠️  ${secret.name}: Configurado pero parece inválido`);
    console.log(`   → Longitud: ${value.length} caracteres (esperado: >=${secret.minLength})`);
    allConfigured = false;
  } else {
    // Mostrar solo primeros y últimos caracteres
    const masked = value.substring(0, 4) + '***' + value.substring(value.length - 4);
    console.log(`✅ ${secret.name}: Configurado correctamente`);
    console.log(`   → Valor: ${masked}`);
  }
  console.log('');
});

if (allConfigured) {
  console.log('✅ Todos los secrets están configurados correctamente\n');
  process.exit(0);
} else {
  console.log('❌ Algunos secrets faltan o están mal configurados\n');
  console.log('Para configurar en local: crear archivo .env');
  console.log('Para configurar en GitHub: Settings → Secrets → Actions\n');
  process.exit(1);
}
