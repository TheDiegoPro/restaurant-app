import React, { createContext, useContext, useEffect, useState } from 'react'

// Crear un contexto de autenticación para compartir el estado de autenticación en toda la aplicación.

const AuthContext = createContext();

// Proveedor del contexto de autenticación, que envuelve los componentes hijos y les da acceso al estado de autenticación.
export const AuthProvider = ({ children }) => {

  // Estados locales para el token, los datos del usuario y si el usuario está autenticado.
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Recupera los datos almacenados localmente (si existen) para mantener al usuario autenticado después de recargar la página.
  const storedData = JSON.parse(localStorage.getItem('user_data'));

  // Efecto que se ejecuta al montar el componente. Si hay datos almacenados, establece el estado con esos valores.
  useEffect(() => {
    if (storedData) {
      const { userToken, user } = storedData;
      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  // Función de inicio de sesión, que guarda el token y los datos del usuario en localStorage y actualiza el estado.
  const login = (newToken, newData) => {
    localStorage.setItem(
      "user_data",
      JSON.stringify({ userToken: newToken, user: newData }), // Guarda los datos del usuario en el almacenamiento local.
    );
    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true); // Marca al usuario como autenticado.
  };

  // Función de cierre de sesión, que limpia los datos de localStorage y restablece el estado.
  const logout = () => {
    localStorage.removeItem('user_data'); // Elimina los datos almacenados del usuario.
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false); // Marca al usuario como no autenticado.
  }

  // Proporciona el contexto con el estado y las funciones de autenticación a los componentes hijos.
  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  )
};

// Un hook personalizado para acceder al contexto de autenticación en cualquier componente.

export const useAuth = () => useContext(AuthContext);