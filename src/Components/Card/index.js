import React from 'react';
import "./card.css";

//template card sebagai tempat fetch data dari be
const Card = (props) => {
const { id, nama, alamat, kabupaten, kategoris } = props;
  return (
    <a className="card-anchor text-decoration-none" href={`/cagar-budaya/${id}`}>
    <section className="card shadow h-100">
      <img src={`https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg`} className="photo w-100" alt={nama} />
      <span className="card-category position-absolute rounded fw-bold">{kategoris.nama}</span>
      <section className="card-body d-flex flex-column">
        <p className="card-cagar-title text-uppercase fs-5 fw-bold">{nama}</p>
          <section className="city-container d-flex flex-row w-100 mt-auto">          
            <p className="card-city text-capitalize ml-1 mb-0">{kabupaten}</p>
          </section>
      </section>
    </section>
    </a>
  )
}

export default Card
