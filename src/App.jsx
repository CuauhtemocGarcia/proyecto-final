// src/App.jsx

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import ResultList from './components/ResultList';
import DetailModal from './components/DetailModal';
import Swal from 'sweetalert2';
import { FaBeer } from 'react-icons/fa';
import { fetchResults, fetchDetail } from './api/api';
import PopularCharactersMenu from './components/PopularCharactersMenu';
import './App.css';

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedResults = localStorage.getItem('results');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  const handleFetchResults = async (query) => {
    try {
      const data = await fetchResults(query);
      setResults(data);
      localStorage.setItem('results', JSON.stringify(data));
    } catch (error) {
      Swal.fire('Error', 'No se pudieron obtener los resultados.', 'error');
    }
  };

  const handleFetchDetail = async (id) => {
    try {
      const data = await fetchDetail(id);
      setSelectedDetail(data);
      setShowModal(true);
    } catch (error) {
      Swal.fire('Error', 'No se pudo obtener la información.', 'error');
    }
  };

  const handlePopularSelect = async (id) => {
    try {
      const data = await fetchDetail(id);
      setSelectedDetail(data);
      setShowModal(true);
    } catch (error) {
      Swal.fire('Error', 'No se pudo obtener la información.', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        Personajes de Rick y Morty <FaBeer />
      </h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <SearchBar onSearch={handleFetchResults} />
        <PopularCharactersMenu onPopularSelect={handlePopularSelect} />
      </div>
      <ResultList results={results} onSelect={handleFetchDetail} />
      {selectedDetail && (
        <DetailModal
          show={showModal}
          onHide={() => setShowModal(false)}
          details={selectedDetail}
        />
      )}
    </div>
  );
};

export default App;
