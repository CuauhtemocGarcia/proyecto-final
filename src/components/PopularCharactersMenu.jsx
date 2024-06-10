// src/components/PopularCharactersMenu.jsx

import React, { useState, useRef, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi'; // Icono de menú
import { fetchResults } from '../api/api'; // Función para obtener resultados
import Swal from 'sweetalert2'; // SweetAlert para mostrar mensajes de error

const PopularCharactersMenu = ({ onPopularSelect }) => {
  const [popularCharacters, setPopularCharacters] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // Agregar event listener para cerrar el menú al hacer clic fuera de él
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const handleShowPopular = async () => {
    try {
      const data = await fetchResults('rick');
      setPopularCharacters(data);
      setShowMenu(true); // Mostrar el menú al obtener los datos
    } catch (error) {
      Swal.fire('Error', 'No se pudieron obtener los personajes populares.', 'error');
    }
  };

  return (
    <div className="d-flex align-items-center position-relative">
      <FiMenu className="menu-icon" onClick={handleShowPopular} />
      {showMenu && popularCharacters.length > 0 && (
        <div ref={menuRef} className="dropdown-menu">
          <ul className="list-group">
            {popularCharacters.map((character) => (
              <li
                key={character.id}
                className="list-group-item"
                onClick={() => {
                  onPopularSelect(character.id);
                  setShowMenu(false); // Ocultar el menú al seleccionar un personaje
                }}
              >
                {character.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopularCharactersMenu;
