// Definición de una clase personalizada para manejar errores en la aplicación
class createError extends Error {
  constructor(message, statusCode) {
    super(message); // Llama al constructor de la clase Error con el mensaje proporcionado

    this.statusCode = statusCode; // Asigna el código de estado HTTP al error
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; 
    // Define el estado del error basado en el código HTTP (4xx es "fail", de lo contrario "error")

    Error.captureStackTrace(this, this.constructor); 
    // Captura la traza de la pila del error para facilitar la depuración
  }
}

module.exports = createError; // Exporta la clase para ser utilizada en otras partes de la aplicación
