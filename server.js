const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/signals', (req, res) => {
  const signals = [
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
  res.json(signals);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
