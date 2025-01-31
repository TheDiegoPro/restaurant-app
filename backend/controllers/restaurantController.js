
const Restaurant = require('../models/Restaurants'); // Importa el modelo de restaurantes

/**
 * Obtiene restaurantes filtrados por un término de búsqueda.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
const getRestaurants = async (req, res) => {
  try {
    // Extrae el término de búsqueda del query string (si no existe, usa una cadena vacía)
    const searchQuery = req.query.q || '';

    // Log para depuración: muestra el término de búsqueda
    console.log(' Buscando restaurantes con el término:', searchQuery);

    // Busca restaurantes que coincidan con el término de búsqueda
    const restaurants = await Restaurant.find({
      $or: [
        { nombre: { $regex: searchQuery, $options: 'i' } }, // Busca en el campo "nombre" (insensible a mayúsculas/minúsculas)
        { direccion: { $regex: searchQuery, $options: 'i' } }, // Busca en el campo "dirección"
        { tipo_comida: { $regex: searchQuery, $options: 'i' } }, // Busca en el campo "tipo_comida"
      ],
    });

    // Log para depuración: muestra la cantidad de restaurantes encontrados
    console.log(' Restaurantes encontrados:', restaurants.length);

    // Retorna los restaurantes encontrados en formato JSON
    res.json(restaurants);
  } catch (error) {
    // Log para depuración: muestra el error en la consola
    console.error(' Error al obtener restaurantes:', error);

    // Retorna un error 500 con un mensaje descriptivo
    res.status(500).json({ error: 'Error al obtener restaurantes' });
  }
};

// Exporta la función para ser utilizada en las rutas
module.exports = { getRestaurants };