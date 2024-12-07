// src/App.tsx
import React, { useEffect, useState } from 'react'; // Importa React y hooks necesarios
import axios from 'axios'; // Importa Axios para manejar peticiones HTTP
import { Escuela } from './escuela'; // Importa la interfaz Estudiante
import EscuelaForm from './components/EscuelaForm'; // Importa el componente de formulario
import EscuelaTable from './components/EscuelaTable'; // Importa el componente de tabla

const App: React.FC = () => {
  // Estado para almacenar la lista de estudiantes
  const [escuelas, setEscuelas] = useState<Escuela[]>([]);
  
  // Estado para almacenar el estudiante que se está editando (si aplica)
  const [EscuelaEdit, setEscuelaEdit] = useState<Escuela | null>(null);

  // Hook que se ejecuta una vez al montar el componente para obtener la lista inicial de estudiantes
  useEffect(() => {
    obtenerEscuelas();
  }, []);

  // Función para obtener la lista de estudiantes desde el backend
  const obtenerEscuelas = async () => {
    try {
      const respuesta = await axios.get('/api/escuelas'); // Hace una solicitud GET a '/api/estudiantes'
      setEscuelas(respuesta.data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error('Error al obtener escuelas:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la creación de un nuevo estudiante
  const manejarCrear = async (escuela: Omit<Escuela, 'id'>) => {
    try {
      await axios.post('/api/escuelas', escuelas); // Hace una solicitud POST para crear un nuevo estudiante
      obtenerEscuelas(); // Actualiza la lista de estudiantes después de la creación
    } catch (error) {
      console.error('Error al crear escuela:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la actualización de un estudiante existente
  const manejarActualizar = async (escuela: Omit<Escuela, 'id'>) => {
    if (!EscuelaEdit) return; // Si no hay estudiante en edición, no hace nada
    try {
      await axios.put(`/api/escuelas/${EscuelaEdit.id}`, escuela); // Hace una solicitud PUT para actualizar el estudiante
      obtenerEscuelas(); // Actualiza la lista de estudiantes después de la actualización
      setEscuelaEdit(null); // Resetea el estado de edición
    } catch (error) {
      console.error('Error al actualizar estudiante:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la eliminación de un estudiante
  const manejarEliminar = async (id: number) => {
    try {
      await axios.delete(`/api/escuelas/${id}`); // Hace una solicitud DELETE para eliminar el estudiante
      obtenerEscuelas(); // Actualiza la lista de estudiantes después de la eliminación
    } catch (error) {
      console.error('Error al eliminar escuelas:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para iniciar la edición de un estudiante, pasando sus datos al formulario
  const iniciarEdicion = (escuela: Escuela) => {
    setEscuelaEdit(escuela); // Establece el estudiante a editar
  };

  // Función para cancelar la edición, reseteando el estado de edición
  const cancelarEdicion = () => {
    setEscuelaEdit(null); // Resetea el estudiante en edición
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD de Escuelas</h1>
      
      {/* Componente de Formulario para crear o editar estudiantes */}
      <EscuelaForm
        onSubmit={EscuelaEdit ? manejarActualizar : manejarCrear} // Determina qué función ejecutar al enviar el formulario
        initialData={EscuelaEdit || undefined} // Pasa los datos iniciales si se está editando
        onCancel={EscuelaEdit ? cancelarEdicion : undefined} // Pasa la función para cancelar si se está editando
      />

      {/* Componente de Tabla para mostrar la lista de estudiantes */}
      <EscuelaTable
        escuelas={escuelas} // Pasa la lista de estudiantes al componente de tabla
        onEdit={iniciarEdicion} // Pasa la función para editar un estudiante
        onDelete={manejarEliminar} // Pasa la función para eliminar un estudiante
      />
    </div>
  );
};

export default App; // Exporta el componente para su uso en otros archivos
