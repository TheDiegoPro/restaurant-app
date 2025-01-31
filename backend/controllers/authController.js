const User = require('../models/userModel'); // Importa el modelo de usuario
const createError = require('../utils/appError'); // Importa la función para crear errores personalizados
const bcrypt = require('bcryptjs'); // Importa bcrypt para hashear contraseñas
const jwt = require('jsonwebtoken'); // Importa JWT para generar tokens de autenticación

/**
 * Registra un nuevo usuario.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
exports.signup = async (req, res, next) => {
  try {
    // Verifica si el usuario ya existe en la base de datos
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError('Usuario ya existe!', 400)); // Retorna un error si el usuario ya existe
    }

    // Hashea la contraseña proporcionada por el usuario
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Crea un nuevo usuario en la base de datos
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Genera un token JWT para el nuevo usuario
    const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
      expiresIn: '90d', // El token expira en 90 días
    });

    // Retorna una respuesta exitosa con el token y los datos del usuario
    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error); // Imprime el error en la consola del servidor
    next(error); // Pasa el error al siguiente middleware
  }
};

/**
 * Inicia sesión de un usuario.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body; // Extrae el correo y la contraseña del cuerpo de la solicitud

    // Busca al usuario en la base de datos por su correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return next(new createError('Usuario no encontrado', 400)); // Retorna un error si el usuario no existe
    }

    // Compara la contraseña proporcionada con la contraseña hasheada almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new createError('Correo o contraseña inválidos', 401)); // Retorna un error si la contraseña es incorrecta
    }

    // Genera un token JWT para el usuario autenticado
    const token = jwt.sign({ _id: user._id }, 'secretkey123', {
      expiresIn: '90d', // El token expira en 90 días
    });

    // Retorna una respuesta exitosa con el token y los datos del usuario
    res.status(200).json({
      status: 'success',
      token,
      message: 'Inicio de sesión exitoso',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware
  }
};