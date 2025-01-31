const mongoose = require('mongoose'); // Importa la librería Mongoose para trabajar con MongoDB

// Define el esquema para la colección de restaurantes
const RestaurantSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Nombre del restaurante (obligatorio)
  direccion: { type: String, required: true }, // Dirección del restaurante (obligatorio)
  tipo_comida: { type: [String], required: true } // Lista de tipos de comida que ofrece (obligatorio)
});

// Exporta el modelo de restaurante basado en el esquema definido
module.exports = mongoose.model('Restaurant', RestaurantSchema);
