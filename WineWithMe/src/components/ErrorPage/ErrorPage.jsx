import React from "react";
import "./ErrorPage.css";
import { useRouteError, Link } from "react-router-dom";
import logga from "../../assets/Bilder/WW_logo.png";
import error_stain from '../../images/error_stain.png';

//om det blir fel vid laddning öppnas denna Error-sidan

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
    <div className="error-container">
      <img src={logga} alt="en bild på loggan" className="logga" />
        <img className="error_img" src={error_stain}></img>
            <p className="error-message">Something went wrong.</p>
            <p>Message: {error.statusText} </p>
            <p className="error-message">{error.message } </p>
            <button className="homepage-btn">
            <Link to="/" className="error-link">Back to Homepage</Link>
            </button>
    </div>
    </>
  )
}

export default ErrorPage;
