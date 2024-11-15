const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoute.js');
const adeudoRoutes = require('./routes/adeudoRoute.js');
const pagosRoutes = require('./routes/pagoRoute.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', usuarioRoutes);
app.use('/api', adeudoRoutes);
app.use('/api', pagosRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
