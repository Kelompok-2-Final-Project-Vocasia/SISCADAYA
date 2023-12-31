import React, { useState, useEffect } from 'react';
import "./cagarBudaya.css";
import { getAllCagarBudaya } from '../../utils/cagarBudaya';
import Card from '../../Components/Card';
import Navbar from '../../Components/Landing/Navbar';
import SearchBar from '../../Components/Searchbar'; // Asumsikan Anda menyimpannya di sini

const CagarBudaya = (props) => {
  const [dataCagar, setDataCagar] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCagarBudaya()
      .then(res => {
        setDataCagar(res.data);
        setFilteredData(res.data); // Atur data awal untuk ditampilkan
        setLoading(false);
      });
  }, []);

  const handleSearch = (term) => {
    const filtered = dataCagar.filter(data => 
      data.nama.toLowerCase().includes(term.toLowerCase()) 
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <Navbar />
      <article className="container mt-5">
        <p className="primary-subheading">Daftar</p>
        <article className="primary-heading">
          <h1>Daftar Cagar Budaya</h1>
        </article>

        <SearchBar onSearch={handleSearch} />

        <article className="cagar-content" id="content">
          <article className="cards d-grid px-3">
            {
              filteredData?.map((data) => Card(data))
            }
          </article>
        </article>

        {/* ... other components */}
      </article>
    </div>
  );
};

export default CagarBudaya;
