// src/api/api.js

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchResults = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/character/?name=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
};

export const fetchDetail = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/character/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Aquí se debería manejar la traducción de los datos si están disponibles
    const detail = {
      name: data.name,
      image: data.image,
      status: data.status,
      species: data.species,
      gender: data.gender,
      origin: data.origin.name,
      location: data.location.name
    };

    return detail;
  } catch (error) {
    console.error('Error fetching detail:', error);
    throw error;
  }
};
