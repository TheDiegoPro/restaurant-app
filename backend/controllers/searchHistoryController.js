const SearchHistory = require('../models/searchHistory');

exports.saveSearchHistory = async (req, res) => {
  try {
    const { query, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'userId es requerido',
      });
    }

    // Crea un nuevo registro de búsqueda
    const searchHistory = new SearchHistory({ query, userId });
    await searchHistory.save();

    // Respuesta exitosa
    res.status(201).json({
      status: 'success',
      message: 'Búsqueda guardada correctamente',
    });
  } catch (error) {
    console.error('Error al guardar búsqueda:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al guardar la búsqueda',
    });
  }
};

/**
 * Obtiene el historial de búsquedas de un usuario.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.getSearchHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'userId es requerido',
      });
    }

    // Busca el historial de búsquedas del usuario
    const history = await SearchHistory.find({ userId }).sort({ timestamp: -1 });

    // Respuesta exitosa
    res.status(200).json({
      status: 'success',
      data: history,
    });
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener el historial',
    });
  }
};