import React, { useState, useEffect } from "react";
import { Table, Input, Typography, Spin, Alert, Button, Modal } from "antd"; // Importa Button y Modal
import { useAuth } from "../contexts/AuthContext"; // Importa el contexto de autenticación

const { Title } = Typography;
const { Search } = Input;

const RestaurantTable = () => {
  const { userData } = useAuth(); // Obtén el userData del contexto
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    fetchRestaurants();
    fetchSearchHistory();
  }, []);

  const fetchRestaurants = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/restaurants?q=${query}`);
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      setError("Error al obtener restaurantes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveSearchHistory = async (query) => {
    try {
      if (!userData) {
        throw new Error("Usuario no autenticado");
      }

      const userId = userData._id; // Obtén el userId desde userData

      const response = await fetch("http://localhost:3000/api/search-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, userId }), // Envía el userId junto con la búsqueda
      });

      if (!response.ok) {
        throw new Error("Error al guardar la búsqueda");
      }

      fetchSearchHistory(); // Actualizar el historial después de guardar la búsqueda
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearchHistory = async () => {
    try {
      if (!userData) {
        throw new Error("Usuario no autenticado");
      }

      const userId = userData._id; // Obtén el userId desde userData

      const response = await fetch(`http://localhost:3000/api/search-history?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Error al obtener el historial");
      }

      const data = await response.json();
      setSearchHistory(data); // Actualizar el estado del historial
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (value) => {
    if (!value.trim()) {
      // Si la barra de búsqueda está vacía, no hacer nada
      return;
    }

    setSearchText(value);
    fetchRestaurants(value);
    saveSearchHistory(value); // Guardar la búsqueda
  };

  // Funciones para manejar el modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Dirección", dataIndex: "direccion", key: "direccion" },
    {
      title: "Tipo de Comida",
      dataIndex: "tipo_comida",
      key: "tipo_comida",
      render: (text) => (Array.isArray(text) ? text.join(", ") : text),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Restaurantes
      </Title>

      {/* Barra de búsqueda */}
      <Search
        placeholder="Buscar por nombre, dirección o tipo de comida"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={handleSearch}
        enterButton
        allowClear
        style={{ marginBottom: "24px" }}
      />

      {/* Botón para mostrar el historial en un modal */}
      <Button type="primary" onClick={showModal} style={{ marginBottom: "24px" }}>
        Ver Historial de Búsquedas
      </Button>

      {loading && <Spin tip="Cargando restaurantes..." style={{ display: "block", textAlign: "center" }} />}

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "24px" }} />}

      {/* Modal para mostrar el historial de búsquedas */}
      <Modal
        title="Historial de Búsquedas"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Sin botones en el footer
      >
        <ul>
          {searchHistory.map((search, index) => (
            <li key={index}>
              {search.query} - {new Date(search.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </Modal>

      {/* Tabla de restaurantes */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={restaurants.map((r, index) => ({ key: index, ...r }))}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: restaurants.length,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
        }}
      />
    </div>
  );
};

export default RestaurantTable;


// /* API VERSION */

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//  import { Card, Spin, Alert, Input, Pagination, Row, Col, Typography } from 'antd';

//  const { Title, Text } = Typography;
//  const { Search } = Input;

// const Restaurantsearch = () => {
//   const [restaurants, setRestaurants] = useState([]); // Todos los restaurantes
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]); // Restaurantes filtrados
//   const [loading, setLoading] = useState(false); // Estado de carga
//   const [error, setError] = useState(null); // Manejo de errores
//   const [searchText, setSearchText] = useState(''); // Texto de búsqueda
//   const [currentPage, setCurrentPage] = useState(1); // Página actual
//   const [pageSize, setPageSize] = useState(6); // Cantidad de restaurantes por página

//   // Función para buscar restaurantes
//   const fetchRestaurants = async () => {
//     setLoading(true);
//     setError(null);

//     const options = {
//       method: 'GET',
//       url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
//       params: {
//         locationId: '304554', // ID de la ubicación (puedes cambiarlo según necesites)
//       },
//       headers: {
//         'x-rapidapi-key': 'd9901b8770mshce57a8f5644473fp1b7d15jsnd7a5fa70139f', // Tu clave de RapidAPI
//         'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       if (response.data.data && response.data.data.data) {
//         setRestaurants(response.data.data.data); // Guarda todos los restaurantes
//         setFilteredRestaurants(response.data.data.data); // Inicialmente, muestra todos los restaurantes
//       } else {
//         setError('No se encontraron restaurantes en la respuesta.');
//       }
//     } catch (error) {
//       setError('Error al cargar los restaurantes');
//       console.error(error);
//     } finally {
//       setLoading(false); // Finaliza el estado de carga
//     }
//   };

//   // Función para filtrar restaurantes
//   const filterRestaurants = (text) => {
//     const filtered = restaurants.filter((restaurant) => {
//       const nameMatch = restaurant.name.toLowerCase().includes(text.toLowerCase());
//       const addressMatch = restaurant.address?.toLowerCase().includes(text.toLowerCase());
//       const cuisineMatch = restaurant.establishmentTypeAndCuisineTags?.some((tag) =>
//         tag.toLowerCase().includes(text.toLowerCase())
//       );
//       return nameMatch || addressMatch || cuisineMatch;
//     });
//     setFilteredRestaurants(filtered); // Actualiza la lista filtrada
//     setCurrentPage(1); // Reinicia la paginación a la primera página
//   };

//   // Maneja el cambio en la barra de búsqueda
//   const handleSearch = (e) => {
//     const text = e.target.value;
//     setSearchText(text);
//     filterRestaurants(text);
//   };

//   // Maneja el cambio de página
//   const handlePageChange = (page, pageSize) => {
//     setCurrentPage(page);
//     setPageSize(pageSize);
//   };

//   // Calcula los restaurantes que se mostrarán en la página actual
//   const paginatedRestaurants = filteredRestaurants.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Ejecuta la función al montar el componente
//   useEffect(() => {
//     fetchRestaurants();
//   }, []);

//   return (
//     <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
//       {/* Título */}
//       <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
//         Restaurantes
//       </Title>

//       {/* Barra de búsqueda */}
//       <div style={{ textAlign: 'center', marginBottom: '24px' }}>
//         <Input
//           placeholder="Buscar por nombre, dirección o tipo de comida"
//           value={searchText}
//           onChange={handleSearch}
//           style={{ maxWidth: '600px', width: '100%' }}
//         />
//       </div>

//       {loading && <Spin tip="Cargando restaurantes..." style={{ display: 'block', margin: '0 auto' }} />}

//       {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '24px' }} />}

//       {filteredRestaurants.length > 0 ? (
//         <>
//           {/* Lista de restaurantes en un grid responsivo */}
//           <Row gutter={[16, 16]}>
//             {paginatedRestaurants.map((restaurant) => (
//               <Col key={restaurant.locationId} xs={24} sm={12} md={8} lg={6}>
//                 <Card
//                   title={restaurant.name}
//                   extra={<Text type="secondary">{restaurant.averageRating} ⭐</Text>}
//                   style={{ height: '100%' }}
//                 >
//                   <Text strong>Dirección:</Text> {restaurant.address || 'No disponible'}
//                   <br />
//                   <Text strong>Tipo de cocina:</Text>{' '}
//                   {restaurant.establishmentTypeAndCuisineTags?.join(', ') || 'No disponible'}
//                   <br />
//                   <Text strong>Estado:</Text> {restaurant.currentOpenStatusText || 'No disponible'}
//                   <br />
//                   <Text strong>Precio:</Text> {restaurant.priceTag || 'No disponible'}
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* Paginación */}
//           <div style={{ textAlign: 'center', marginTop: '24px' }}>
//             <Pagination
//               current={currentPage}
//               pageSize={pageSize}
//               total={filteredRestaurants.length}
//               onChange={handlePageChange}
//               showSizeChanger
//               onShowSizeChange={(current, size) => setPageSize(size)}
//             />
//           </div>
//         </>
//       ) : (
//         !loading && <Text style={{ textAlign: 'center', display: 'block' }}>No se encontraron restaurantes.</Text>
//       )}
//     </div>
//   );
// };

// export default Restaurantsearch;