import React from "react";
import HeroBanner from "../images/hero.jpg";

function Hero() {
  return (
    <div className="heroclass">
      <img src={HeroBanner} alt="hero-banner" />
      <div className="container">
        <div className="herobox">
          <p>Pret à faire du tri dans vos placards ?</p>
          <button>Commencer</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
