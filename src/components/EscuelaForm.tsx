// src/components/EstudianteForm.tsx
import React, { useState, useEffect } from 'react'; // Importa React y hooks necesarios
import { Escuela } from '../escuela'; // Importa la interfaz Estudiante

// Define las propiedades que recibirá el componente
interface EscuelaFormProps {
  onSubmit: (escuela: Omit<Escuela, 'id'>) => void; // Función que se ejecuta al enviar el formulario
  initialData?: Escuela; // Datos iniciales para editar (opcional)
  onCancel?: () => void; // Función para cancelar la edición (opcional)
}

const EscuelaForm: React.FC<EscuelaFormProps> = ({ onSubmit, initialData, onCancel }) => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(initialData?.nombre || ''); // Estado para 'nombre'
  const [creditos, setCreditos] = useState(initialData?.creditos || ''); // Estado para 'creditos'
  const [numEstudiantes, setnumEstudiantes] = useState(initialData?.numEstudiantes || ''); // Estado para 'numEstudiantes'
  

  // Hook que actualiza los campos del formulario cuando 'initialData' cambia
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setCreditos(initialData.creditos);
      setnumEstudiantes(initialData.numEstudiantes);
    } else {
      // Si no hay datos iniciales, limpia los campos
      setNombre('');
      setCreditos('');
      setnumEstudiantes('');
    }
  }, [initialData]);

  // Función que maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    onSubmit({nombre, creditos: Number(creditos), numEstudiantes: Number(numEstudiantes)
    }); // Llama a la función pasada por props con los datos del formulario
    if (!initialData) {
      // Si no se está editando, limpia los campos después de enviar
      setNombre('');
      setCreditos('');
      setnumEstudiantes('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      {/* Título del formulario que cambia según si se está editando o creando */}
      <h2>{initialData ? 'Editar Escuela' : 'Crear Escuela'}</h2>

      {/* Campo para 'Nombre' */}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)} // Actualiza el estado 'codigo' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/* Campo para 'Creditos' */}
      <input
        type="number"
        placeholder="Créditos"
        value={creditos}
        onChange={(e) => setCreditos(e.target.value)} // Actualiza el estado 'nombre' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/* Campo para 'Numero de Estudiantes' */}
      <input
        type="number"
        placeholder="Numero de Estudiantes"
        value={numEstudiantes}
        onChange={(e) => setnumEstudiantes(e.target.value)} // Actualiza el estado 'apellido' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />
      
      {/* Botón para enviar el formulario, cambia el texto según si se está editando o creando */}
      <button type="submit">{initialData ? 'Actualizar' : 'Crear'}</button>

      {/* Botón para cancelar la edición, solo se muestra si se está editando */}
      {initialData && onCancel && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default EscuelaForm; // Exporta el componente para su uso en otros archivos
