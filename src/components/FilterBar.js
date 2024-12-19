import React, { useState } from 'react';
import './FilterBar.css';

const LANGUAGES = [
  { code: 'english', name: 'English' },
  { code: 'french', name: 'French' },
  { code: 'spanish', name: 'Spanish' },
  { code: 'german', name: 'German' },
  { code: 'italian', name: 'Italian' },
  { code: 'portuguese', name: 'Portuguese' },
  { code: 'dutch', name: 'Dutch' },
  { code: 'russian', name: 'Russian' },
  { code: 'chinese', name: 'Chinese' },
  { code: 'japanese', name: 'Japanese' }
];

const FilterBar = ({ selectedLanguage, onFilterSubmit }) => {
  const [tempLanguage, setTempLanguage] = useState(selectedLanguage);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit(tempLanguage);
  };

  return (
    <form className="filter-bar" onSubmit={handleSubmit}>
      <div className="filter-content">
        <div className="filter-group">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            value={tempLanguage}
            onChange={(e) => setTempLanguage(e.target.value)}
            className="language-select"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="filter-submit">
          Apply Filter
        </button>
      </div>
    </form>
  );
};

export default FilterBar;
