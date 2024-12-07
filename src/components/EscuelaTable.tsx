// src/components/EstudianteTable.tsx
import React from 'react'; // Importa React
import { Escuela } from '../escuela'; // Importa la interfaz Estudiante

// Define las propiedades que recibirá el componente
interface EscuelaTableProps {
  escuelas: Escuela[]; // Lista de estudiantes a mostrar
  onEdit: (escuela: Escuela) => void; // Función para editar un estudiante
  onDelete: (id: number) => void; // Función para eliminar un estudiante
}

const EscuelaTable: React.FC<EscuelaTableProps> = ({ escuelas, onEdit, onDelete }) => {
  return (
    <table border={1} cellPadding={10} cellSpacing={0} style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>ID</th>          
          <th>Nombre</th>
          <th>Creditos</th>
          <th>Numero de Estudiantes</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {escuelas.map((escuela) => (
          <tr key={escuela.id}>
            {/* Muestra cada campo del estudiante en una celda de la tabla */}
            <td>{escuela.id}</td>            
            <td>{escuela.nombre}</td>
            <td>{escuela.creditos}</td>
            <td>{escuela.numEstudiantes}</td>
            <td>
              {/* Botón para editar el estudiante, llama a la función 'onEdit' con los datos del estudiante */}
              <button onClick={() => onEdit(escuela)}>Editar</button>

              {/* Botón para eliminar el estudiante, llama a la función 'onDelete' con el 'id' del estudiante */}
              <button onClick={() => onDelete(escuela.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EscuelaTable; // Exporta el componente para su uso en otros archivos
