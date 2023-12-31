import React from "react";
import Canbod from "../../Assets/canbod.png";
import Monas from "../../Assets/monas.png";
import Museum from "../../Assets/museum.png";

const Work = () => {
  const workInfoData = [
    {
      image: Canbod,
      title: "Candi Borobudur",
    },
    {
      image: Monas,
      title: "Monumen Nasional",
    },
    {
      image: Museum,
      title: "Museum Song Terus",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Rekomendasi</p>
        <h1 className="primary-heading">3 Rekomendasi Cagar Budaya</h1>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
