const mongoose = require('mongoose'); // Importa la librería Mongoose para manejar la base de datos MongoDB

// Define el esquema para la colección de usuarios
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // El nombre del usuario es obligatorio
  },
  email: {
    type: String,
    unique: true, // El correo debe ser único en la base de datos
    required: true, // El correo es obligatorio
  },
  role: {
    type: String,
    default: 'user', // Rol del usuario, por defecto es "user"
  },
  password: {
    type: String,
    required: true, // La contraseña es obligatoria
  }
});

// Crea el modelo de usuario basado en el esquema definido
const User = mongoose.model('User', userSchema);

module.exports = User; // Exporta el modelo para ser utilizado en otras partes del código
