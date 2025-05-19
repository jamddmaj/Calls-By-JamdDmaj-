const express = require('express');
const cors = require('cors');
const Binance = require('node-binance-api');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS para frontend
app.use(cors());

// Inicializar Binance API con tus claves
const binance = new Binance().options({
  APIKEY: 'TU_API_KEY',
  APISECRET: 'TU_SECRET_KEY',
  useServerTime: true,
  recvWindow: 60000,
});

// Función para obtener señales simples basado en precios actuales
async function getSignals() {
  try {
    // Obtener precios actuales BTCUSDT y ETHUSDT
    const prices = await binance.prices(['BTCUSDT', 'ETHUSDT']);
    const btcPrice = parseFloat(prices.BTCUSDT);
    const ethPrice = parseFloat(prices.ETHUSDT);

    // Ejemplo de lógica sencilla para señales
    const signals = [];

    if (btcPrice < 30000) {
      signals.push({
        token: 'BTC',
        type: 'Compra',
        target: '30000 USDT',
        price: btcPrice,
        date: new Date().toISOString(),
      });
    } else {
      signals.push({
        token: 'BTC',
        type: 'Venta',
        target: '30000 USDT',
        price: btcPrice,
        date: new Date().toISOString(),
      });
    }

    if (ethPrice < 2000) {
      signals.push({
        token: 'ETH',
        type: 'Compra',
        target: '2000 USDT',
        price: ethPrice,
        date: new Date().toISOString(),
      });
    } else {
      signals.push({
        token: 'ETH',
        type: 'Venta',
        target: '2000 USDT',
        price: ethPrice,
        date: new Date().toISOString(),
      });
    }

    return signals;
  } catch (error) {
    console.error('Error obteniendo precios Binance:', error);
    return [];
  }
}

// Endpoint para obtener señales reales
app.get('/api/signals', async (req, res) => {
  const signals = await getSignals();
  res.json(signals);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
