import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export function Card(props) {
  return (
    <div className="container-card">
      <Link to={"recipe/" + props.id}>
      <img className="card-img" src={props.image} alt="picture of the finished recipe" />
      <p className="img-card-text">{props.text}</p>
      </Link>
    </div>
  );
}

export default Card;
