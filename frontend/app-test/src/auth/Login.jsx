import React from 'react';
import { Card, Flex, Typography, Form, Input, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router'; // Importa Link para la navegación
import loginImage from '../assets/login.jpg'; // Imagen para la pantalla de inicio de sesión
import useLogin from '../hooks/useLogin'; // Hook personalizado para manejar el inicio de sesión

const Login = () => {
  // Extrae las variables necesarias del hook personalizado de autenticación
  const { error, loading, loginUser } = useLogin();

  // Maneja el envío del formulario de inicio de sesión
  const handleLogin = async (values) => {
    await loginUser(values); // Llama a la función de inicio de sesión con los valores del formulario
  };

  return (
    <Card className='form-container'>
      <Flex gap="large" align='center'>

        {/* Sección de la imagen de login */}
        <Flex flex={1}>
          <img src={loginImage} className='auth-image' alt="Login" />
        </Flex>

        {/* Sección del formulario de login */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className='title'>
            Ingresar
          </Typography.Title>
          <Typography.Text type='secondary' strong className="slogan">
            Entra y descubre nuestros servicios.
          </Typography.Text>

          {/* Formulario de inicio de sesión */}
          <Form
            layout='vertical'
            onFinish={handleLogin} // Se ejecuta al enviar el formulario
            autoComplete='off'
          >
            {/* Campo para el email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Por favor, ingresa tu email' },
                { type: 'email', message: 'Email no válido' },
              ]}
            >
              <Input size='large' placeholder="Ingresa Email" />
            </Form.Item>

            {/* Campo para la contraseña */}
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
            >
              <Input.Password size='large' placeholder="Ingresar Contraseña" />
            </Form.Item>

            {/* Muestra un mensaje de error si ocurre un problema en el login */}
            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              />
            )}

            {/* Botón para iniciar sesión */}
            <Form.Item>
              <Button
                type={loading ? '' : 'primary'}
                htmlType='submit'
                size='large'
                className='btn'
              >
                {loading ? <Spin /> : 'Ingresar'}
              </Button>
            </Form.Item>

            {/* Botón para registrarse (redirige a la página principal por ahora) */}
            <Form.Item>
              <Link to="/">
                <Button size='large' className='btn'>Crear Cuenta</Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Login;
