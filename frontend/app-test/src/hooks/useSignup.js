import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx"
import { useState } from "react";

// Hook personalizado para manejar el proceso de registro de un nuevo usuario.
const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);  // Establece el estado para el error y el estado de carga (loading).
  const [loading, setLoading] = useState(null);

  // Función asincrónica para registrar al usuario.
  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {  // Verifica si las contraseñas coinciden. Si no, establece un error y termina la ejecución.
      return setError('Contraseñas no son iguales');
    }

    try {
      // Resetea el error y activa el estado de carga (loading).
      setError(null);
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),// Convierte los datos de registro en JSON para enviarlos al servidor.
      });

      const data = await res.json();


      if (res.status === 201) { // Si el registro es exitoso (código de estado 201), muestra un mensaje de éxito y realiza el login.
        message.success("Usuario Registrado !");
        login(data.token, data.user);
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        message.error('Registro Fallido');
      }

    } catch (error) {
      message.error(error);
      message.error('Registro Fallido')
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };  // Retorna el estado de carga, el error y la función para registrar al usuario.

}

export default useSignup