import React from 'react';
import { Card, Flex, Typography, Form, Input, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router'; // Importa Link para la navegación
import registerImage from '../assets/register.svg'; // Imagen para la pantalla de registro
import useSignup from '../hooks/useSignup'; // Hook personalizado para manejar el registro de usuarios

export const Register = () => {
  // Extrae las variables necesarias del hook personalizado de autenticación
  const { loading, error, registerUser } = useSignup();

  // Maneja el envío del formulario de registro
  const handleRegister = (values) => {
    registerUser(values); // Llama a la función de registro con los valores del formulario
  };

  return (
    <Card className='form-container'>
      <Flex gap="large" align='center'>

        {/* Sección del formulario de registro */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className='title'>
            Crear una Cuenta
          </Typography.Title>
          <Typography.Text type='secondary' strong className="slogan">
            Únete para contenido exclusivo
          </Typography.Text>

          {/* Formulario de registro */}
          <Form
            layout='vertical'
            onFinish={handleRegister} // Se ejecuta al enviar el formulario
            autoComplete='off'
          >
            {/* Campo para el nombre */}
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: 'Por favor, ingresa tu nombre' }]}
            >
              <Input size='large' placeholder="Ingresa Nombre" />
            </Form.Item>

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

            {/* Campo para confirmar la contraseña */}
            <Form.Item
              label="Confirmar Contraseña"
              name="passwordConfirm"
              dependencies={['password']} // Asegura que depende del campo "password"
              rules={[
                { required: true, message: 'Por favor, confirma tu contraseña' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                  },
                }),
              ]}
            >
              <Input.Password size='large' placeholder="Ingresar nuevamente Contraseña" />
            </Form.Item>

            {/* Muestra un mensaje de error si ocurre un problema en el registro */}
            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              />
            )}

            {/* Botón para registrarse */}
            <Form.Item>
              <Button
                type={loading ? '' : 'primary'}
                htmlType='submit'
                size='large'
                className='btn'
              >
                {loading ? <Spin /> : 'Crear Cuenta'}
              </Button>
            </Form.Item>

            {/* Botón para redirigir a la página de login */}
            <Form.Item>
              <Link to="/login">
                <Button size='large' className='btn'>Acceder</Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>

        {/* Sección de la imagen de registro */}
        <Flex flex={1}>
          <img src={registerImage} className='auth-image' alt="Registro" />
        </Flex>

      </Flex>
    </Card>
  );
};

export default Register;
