const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Permitir peticiones desde cualquier origen (para desarrollo)
app.use(cors());

// Señales dummy para ejemplo
let signals = [
  {
    token: 'BTC',
    type: 'Compra',
    target: '30000 USDT',
    date: new Date().toISOString(),
  },
  {
    token: 'ETH',
    type: 'Venta',
    target: '2000 USDT',
    date: new Date().toISOString(),
  },
];

// Endpoint para obtener señales
app.get('/api/signals', (req, res) => {
  res.json(signals);
});

// Simular actualización de señales cada minuto (opcional)
setInterval(() => {
  // Ejemplo: cambia la fecha para simular señales nuevas
  signals = signals.map(signal => ({
    ...signal,
    date: new Date().toISOString(),
  }));
}, 60000);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
