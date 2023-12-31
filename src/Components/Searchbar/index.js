import {Component} from 'react'
import {v4} from 'uuid'
import React, { useState } from 'react'; 

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      onSearch(e.target.value);
    };
  
    return (
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Cari Cagar Budaya..." 
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    );
  };
  export default SearchBar;