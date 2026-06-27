const app = require('./app');
const sequelize = require('./config/database');
require('./models');

const PORT = process.env.PORT || 3001;

async function conectar(intentos = 10, espera = 5000) {
  for (let i = 1; i <= intentos; i++) {
    try {
      await sequelize.authenticate();
      console.log(`Conexión a MySQL exitosa (intento ${i})`);
      await sequelize.sync({ alter: true });
      console.log('Base de datos sincronizada');
      return true;
    } catch (err) {
      console.error(`Intento ${i}/${intentos} fallido: ${err.message}`);
      if (i < intentos) await new Promise(r => setTimeout(r, espera));
    }
  }
  return false;
}

conectar().then((ok) => {
  if (!ok) {
    console.error('No se pudo conectar a la base de datos. Saliendo.');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
