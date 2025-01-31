const express = require('express'); // Importa Express para manejar rutas
const router = express.Router(); // Crea un enrutador de Express
const { getRestaurants } = require('../controllers/restaurantController'); // Importa el controlador de restaurantes

// Ruta para obtener la lista de restaurantes con filtrado (si aplica)
router.get('/restaurants', getRestaurants);

module.exports = router; // Exporta el enrutador para ser utilizado en la aplicación
