const express = require('express'); // Importa Express para manejar el servidor y las rutas
const mongoose = require('mongoose'); // Importa Mongoose para interactuar con MongoDB
const cors = require('cors'); // Importa CORS para permitir solicitudes desde diferentes orígenes
const authRouter = require('./routes/authRoutes'); // Importa las rutas de autenticación
const restaurantRoutes = require('./routes/restaurantRoutes'); // Importa las rutas de restaurantes
const SearchHistory = require('./models/searchHistory'); // Importa el modelo de historial de búsqueda

const app = express(); // Crea una instancia de Express

// Middleware
app.use(cors()); // Habilita CORS para permitir solicitudes de diferentes dominios
app.use(express.json()); // Habilita el análisis de JSON en las solicitudes

// Rutas
app.use('/api/auth', authRouter); // Rutas relacionadas con la autenticación
app.use('/api/', restaurantRoutes); // Rutas para gestionar restaurantes

// Endpoint para guardar búsquedas en el historial
app.post("/api/search-history", async (req, res) => {
  try {
    const { query, userId } = req.body; // Extrae query y userId del cuerpo de la solicitud
    if (!userId) { // Verifica que se haya proporcionado un userId
      return res.status(400).json({ message: "userId es requerido" });
    }
    const searchHistory = new SearchHistory({ query, userId }); // Crea un nuevo documento de historial de búsqueda
    await searchHistory.save(); // Guarda el historial en la base de datos
    res.status(201).json({ message: "Búsqueda guardada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar la búsqueda" }); // Manejo de errores
  }
});

// Endpoint para obtener el historial de búsquedas de un usuario
app.get("/api/search-history", async (req, res) => {
  try {
    const { userId } = req.query; // Obtiene el userId desde los parámetros de consulta
    const history = await SearchHistory.find({ userId }).sort({ timestamp: -1 }); // Busca el historial del usuario, ordenado por fecha descendente
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el historial" }); // Manejo de errores
  }
});

// Configuración de conexión a MongoDB
mongoose.set('strictQuery', false); // Deshabilita el modo estricto de consultas para compatibilidad futura

mongoose
  .connect('mongodb://127.0.0.1:27017/authentication') // Conexión a la base de datos local
  .then(() => console.log('Connected successfully to Mongo')) // Mensaje de éxito en la conexión
  .catch((error) => console.error('Failed to connect', error)); // Captura errores de conexión

// Middleware de manejo global de errores
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Define el código de estado por defecto como 500 (Error interno del servidor)
  err.status = err.status || 'error'; // Define el estado del error

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Configuración del servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`); // Inicia el servidor y muestra el mensaje en la consola
});
