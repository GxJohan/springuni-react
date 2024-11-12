// src/components/EstudianteTable.tsx
import React from 'react'; // Importa React
import { Estudiante } from '../types'; // Importa la interfaz Estudiante

// Define las propiedades que recibirá el componente
interface EstudianteTableProps {
  estudiantes: Estudiante[]; // Lista de estudiantes a mostrar
  onEdit: (estudiante: Estudiante) => void; // Función para editar un estudiante
  onDelete: (id: number) => void; // Función para eliminar un estudiante
}

const EstudianteTable: React.FC<EstudianteTableProps> = ({ estudiantes, onEdit, onDelete }) => {
  return (
    <table border={1} cellPadding={10} cellSpacing={0} style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((estudiante) => (
          <tr key={estudiante.id}>
            {/* Muestra cada campo del estudiante en una celda de la tabla */}
            <td>{estudiante.id}</td>
            <td>{estudiante.codigo}</td>
            <td>{estudiante.nombre}</td>
            <td>{estudiante.apellido}</td>
            <td>{estudiante.email}</td>
            <td>
              {/* Botón para editar el estudiante, llama a la función 'onEdit' con los datos del estudiante */}
              <button onClick={() => onEdit(estudiante)}>Editar</button>

              {/* Botón para eliminar el estudiante, llama a la función 'onDelete' con el 'id' del estudiante */}
              <button onClick={() => onDelete(estudiante.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EstudianteTable; // Exporta el componente para su uso en otros archivos
