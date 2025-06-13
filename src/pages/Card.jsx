import React from "react";
import '../styles/Lostitems.css';

const Card = ({ id, date, title, image_url, description }) => {
  // Bordure verte si pair, rouge si impair
  const borderColor = id % 2 === 0 ? 'var(--can-green)' : 'var(--can-red)';
  return (
    <div
      className="card-can"
      style={{
        borderLeft: `3px solid ${borderColor}`, // <-- Mets 3px au lieu de 6px
        // le reste du style est géré par le CSS
      }}
    >
      {/* Header id + date */}
      <div className="card-can-header">
        <span className="card-can-id">{`#${id}`}</span>
        {date && (
          <span className="card-can-date">{date}</span>
        )}
      </div>
      {/* Image agrandie */}
      <div className="card-can-imgbox">
        <img
          src={image_url}
          alt={title}
          className="card-can-img"
        />
      </div>
      {/* Titre et description */}
      <div className="card-can-body">
        <h3 className="card-can-title">{title}</h3>
        <p className="card-can-desc">{description}</p>
      </div>
    </div>
  );
};

export default Card;