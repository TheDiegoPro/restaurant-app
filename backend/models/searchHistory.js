const mongoose = require("mongoose"); // Importa la librería Mongoose para trabajar con MongoDB

// Define el esquema para almacenar el historial de búsqueda de los usuarios
const searchHistorySchema = new mongoose.Schema({
  query: { type: String, required: true }, // Texto de búsqueda ingresado por el usuario
  timestamp: { type: Date, default: Date.now }, // Fecha y hora en que se realizó la búsqueda (por defecto, la fecha actual)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Referencia al usuario que realizó la búsqueda
});

// Exporta el modelo basado en el esquema definido
module.exports = mongoose.model("SearchHistory", searchHistorySchema);
