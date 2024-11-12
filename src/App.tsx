// src/App.tsx
import React, { useEffect, useState } from 'react'; // Importa React y hooks necesarios
import axios from 'axios'; // Importa Axios para manejar peticiones HTTP
import { Estudiante } from './types'; // Importa la interfaz Estudiante
import EstudianteForm from './components/EstudianteForm'; // Importa el componente de formulario
import EstudianteTable from './components//EstudianteTable'; // Importa el componente de tabla

const App: React.FC = () => {
  // Estado para almacenar la lista de estudiantes
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  
  // Estado para almacenar el estudiante que se está editando (si aplica)
  const [estudianteEdit, setEstudianteEdit] = useState<Estudiante | null>(null);

  // Hook que se ejecuta una vez al montar el componente para obtener la lista inicial de estudiantes
  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  // Función para obtener la lista de estudiantes desde el backend
  const obtenerEstudiantes = async () => {
    try {
      const respuesta = await axios.get('/api/estudiantes'); // Hace una solicitud GET a '/api/estudiantes'
      setEstudiantes(respuesta.data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error('Error al obtener estudiantes:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la creación de un nuevo estudiante
  const manejarCrear = async (estudiante: Omit<Estudiante, 'id'>) => {
    try {
      await axios.post('/api/estudiantes', estudiante); // Hace una solicitud POST para crear un nuevo estudiante
      obtenerEstudiantes(); // Actualiza la lista de estudiantes después de la creación
    } catch (error) {
      console.error('Error al crear estudiante:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la actualización de un estudiante existente
  const manejarActualizar = async (estudiante: Omit<Estudiante, 'id'>) => {
    if (!estudianteEdit) return; // Si no hay estudiante en edición, no hace nada
    try {
      await axios.put(`/api/estudiantes/${estudianteEdit.id}`, estudiante); // Hace una solicitud PUT para actualizar el estudiante
      obtenerEstudiantes(); // Actualiza la lista de estudiantes después de la actualización
      setEstudianteEdit(null); // Resetea el estado de edición
    } catch (error) {
      console.error('Error al actualizar estudiante:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para manejar la eliminación de un estudiante
  const manejarEliminar = async (id: number) => {
    try {
      await axios.delete(`/api/estudiantes/${id}`); // Hace una solicitud DELETE para eliminar el estudiante
      obtenerEstudiantes(); // Actualiza la lista de estudiantes después de la eliminación
    } catch (error) {
      console.error('Error al eliminar estudiante:', error); // Muestra un error en la consola si falla la solicitud
    }
  };

  // Función para iniciar la edición de un estudiante, pasando sus datos al formulario
  const iniciarEdicion = (estudiante: Estudiante) => {
    setEstudianteEdit(estudiante); // Establece el estudiante a editar
  };

  // Función para cancelar la edición, reseteando el estado de edición
  const cancelarEdicion = () => {
    setEstudianteEdit(null); // Resetea el estudiante en edición
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD de Estudiantes</h1>
      
      {/* Componente de Formulario para crear o editar estudiantes */}
      <EstudianteForm
        onSubmit={estudianteEdit ? manejarActualizar : manejarCrear} // Determina qué función ejecutar al enviar el formulario
        initialData={estudianteEdit || undefined} // Pasa los datos iniciales si se está editando
        onCancel={estudianteEdit ? cancelarEdicion : undefined} // Pasa la función para cancelar si se está editando
      />

      {/* Componente de Tabla para mostrar la lista de estudiantes */}
      <EstudianteTable
        estudiantes={estudiantes} // Pasa la lista de estudiantes al componente de tabla
        onEdit={iniciarEdicion} // Pasa la función para editar un estudiante
        onDelete={manejarEliminar} // Pasa la función para eliminar un estudiante
      />
    </div>
  );
};

export default App; // Exporta el componente para su uso en otros archivos
