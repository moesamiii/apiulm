import React from "react";
import { useNavigate } from "react-router-dom";
import "./StickyButton.css";

const StickyButton = ({ label, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/figmaButton"); // navigate to the empty page
  };

  return (
    <button className="sticky-button" onClick={handleClick}>
      {icon && <span className="sticky-icon">{icon}</span>}
      {label}
    </button>
  );
};

export default StickyButton;
