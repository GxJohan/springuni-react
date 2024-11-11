// src/components/EstudianteForm.tsx
import React, { useState, useEffect } from 'react'; // Importa React y hooks necesarios
import { Estudiante } from '../Types'; // Importa la interfaz Estudiante

// Define las propiedades que recibirá el componente
interface EstudianteFormProps {
  onSubmit: (estudiante: Omit<Estudiante, 'id'>) => void; // Función que se ejecuta al enviar el formulario
  initialData?: Estudiante; // Datos iniciales para editar (opcional)
  onCancel?: () => void; // Función para cancelar la edición (opcional)
}

const EstudianteForm: React.FC<EstudianteFormProps> = ({ onSubmit, initialData, onCancel }) => {
  // Estados para los campos del formulario
  const [codigo, setCodigo] = useState(initialData?.codigo || ''); // Estado para 'codigo'
  const [nombre, setNombre] = useState(initialData?.nombre || ''); // Estado para 'nombre'
  const [apellido, setApellido] = useState(initialData?.apellido || ''); // Estado para 'apellido'
  const [email, setEmail] = useState(initialData?.email || ''); // Estado para 'email'

  // Hook que actualiza los campos del formulario cuando 'initialData' cambia
  useEffect(() => {
    if (initialData) {
      setCodigo(initialData.codigo);
      setNombre(initialData.nombre);
      setApellido(initialData.apellido);
      setEmail(initialData.email);
    } else {
      // Si no hay datos iniciales, limpia los campos
      setCodigo('');
      setNombre('');
      setApellido('');
      setEmail('');
    }
  }, [initialData]);

  // Función que maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    onSubmit({ codigo, nombre, apellido, email }); // Llama a la función pasada por props con los datos del formulario
    if (!initialData) {
      // Si no se está editando, limpia los campos después de enviar
      setCodigo('');
      setNombre('');
      setApellido('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      {/* Título del formulario que cambia según si se está editando o creando */}
      <h2>{initialData ? 'Editar Estudiante' : 'Crear Estudiante'}</h2>

      {/* Campo para 'Código' */}
      <input
        type="text"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)} // Actualiza el estado 'codigo' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/* Campo para 'Nombre' */}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)} // Actualiza el estado 'nombre' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/* Campo para 'Apellido' */}
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)} // Actualiza el estado 'apellido' al cambiar el valor
        required // Campo obligatorio
        style={{ marginRight: '10px' }}
      />

      {/* Campo para 'Email' */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado 'email' al cambiar el valor
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

export default EstudianteForm; // Exporta el componente para su uso en otros archivos
