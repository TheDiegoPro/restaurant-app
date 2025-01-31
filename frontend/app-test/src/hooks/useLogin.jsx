import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

// Hook personalizado para manejar el proceso de inicio de sesión de un usuario.
const useLogin = () => {
  // Extrae la función 'login' del contexto de autenticación.
  const { login } = useAuth();
  // Establece el estado para el error y el estado de carga (loading).
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  // Usa el hook 'useNavigate' para redirigir a otra página después del login.
  const navigate = useNavigate();

  // Función asincrónica para iniciar sesión con los valores proporcionados.
  const loginUser = async (values) => {
    try {
      // Resetea el error y activa el estado de carga (loading).
      setError(null);
      setLoading(true);

      // Realiza una solicitud HTTP POST al servidor para autenticar al usuario.
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Especifica que el cuerpo de la solicitud es JSON.
        },
        body: JSON.stringify(values), // Convierte los datos de login en JSON para enviarlos al servidor.
      });

      // Convierte la respuesta del servidor en un objeto JSON.
      const data = await res.json();

      // Si el login es exitoso (código de estado 200), muestra un mensaje de éxito y actualiza el estado de autenticación.
      if (res.status === 200) {
        message.success(data.message);
        login(data.token, data.user); // Llama a la función de login para actualizar el estado.

        // Redirige al usuario a la página del dashboard después de un login exitoso.
        navigate('/dashboard');
      } else if (res.status === 404) {
        // Si el servidor no encuentra al usuario (código de estado 404), muestra el mensaje de error.
        setError(data.message);
      } else {
        // Si ocurre un error en el login, muestra un mensaje genérico de error.
        message.error('Ingreso Fallido');
      }
    } catch (error) {
      // Si ocurre un error durante la solicitud, muestra el mensaje de error.
      message.error(error);
      message.error('Ingreso Fallido');
    } finally {
      // Desactiva el estado de carga al finalizar el proceso, ya sea exitoso o fallido.
      setLoading(false);
    }
  };

  // Retorna el estado de carga, el error y la función para iniciar sesión.
  return { loading, error, loginUser };
};

// Exporta el hook para usarlo en otros componentes.
export default useLogin;
