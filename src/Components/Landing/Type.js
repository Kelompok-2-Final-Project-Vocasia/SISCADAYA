import React from "react";
import Bangunan from "../../Assets/bangunan.png"
import Kawasan from "../../Assets/kawasan.png"
import Patung from "../../Assets/patung.png"
import Situs from "../../Assets/situs.png"
import Struktur from "../../Assets/struktur.png"

const Type = () => {
  const workInfoData = [
    {
      image: Patung,
      title: "Benda Cagar Budaya",
      text: "benda alami atau buatan manusia, baik bergerak atau tidak, baik bergeser atau tidak bergeser yang punya hubungan erat dengan kebudayaan dan sejarah perkembangan manusia.",
    },
    {
      image: Bangunan,
      title: "Bangunan Cagar Budaya",
      text: " susunan binaan yang terbuat dari benda alam atau benda buatan manusia untuk memenuhi kebutuhan ruang berdinding, tidak berdinding dan atau beratap",
    },
    {
      image: Struktur,
      title: "Struktur Cagar Budaya",
      text: "suatu susunan binaan yang terbuat dari benda alam dan atau benda buatan manusia untuk memenuhi kebutuhan ruang kegiatan yang menyatu dengan alam",
    },
    {
        image: Situs,
        title: "Situs Cagar Budaya",
        text: "lokasi yang berada di darat dan/atau di air yang mengandung Benda, Bangunan, dan atau Struktur sebagai hasil kegiatan manusia atau bukti kejadian pada masa lalu.",
      },
      {
        image: Kawasan,
        title: "Kawasan Cagar Budaya",
        text: "satuan ruang geografis yang memiliki dua Situs Cagar Budaya atau lebih yang letaknya berdekatan dan atau memperlihatkan ciri tata ruang yang khas",
      },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Jenis</p>
        <h1 className="primary-heading">5 Jenis Cagar Budaya</h1>
        {/* <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p> */}
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Type;
