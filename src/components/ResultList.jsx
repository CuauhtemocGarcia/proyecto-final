// src/components/ResultList.jsx
import React from 'react';

const ResultList = ({ results, onSelect }) => {
  return (
    <div className="list-group">
      {results.map((result) => (
        <button
          key={result.id}
          className="list-group-item list-group-item-action"
          onClick={() => onSelect(result.id)}
        >
          {result.name}
        </button>
      ))}
    </div>
  );
};

export default ResultList;
