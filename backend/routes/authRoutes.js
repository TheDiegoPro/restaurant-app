const express = require('express'); // Importa Express para manejar rutas
const authController = require('../controllers/authController'); // Importa el controlador de autenticación

const router = express.Router(); // Crea un enrutador de Express

// Ruta para el registro de usuarios (signup)
router.post('/signup', authController.signup);

// Ruta para el inicio de sesión de usuarios (login)
router.post('/login', authController.login);

module.exports = router; // Exporta el enrutador para ser utilizado en la aplicación
