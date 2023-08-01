import React, { useState, useEffect } from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté en vérifiant la présence du token dans les cookies
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Déconnexion en supprimant le token des cookies
    Cookies.remove("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="head">
          <div className="divlogo">
            <Link to="/">
              <img className="logoimg" src={Logo} alt="logo vinted" />
            </Link>
          </div>

          <div>
            <form action="/search" method="get" className="searchform">
              <input
                type="text"
                name="search"
                placeholder="Rechercher..."
                className="search"
              />
              <button type="submit">Rechercher</button>
            </form>
          </div>
          <div className="bouttonshead">
            {isLoggedIn ? (
              <button className="disconnect" onClick={handleLogout}>
                Se déconnecter
              </button>
            ) : (
              <>
                <Link to="/signup">
                  <button className="buttonheadwhite"> S'inscrire</button>
                </Link>
                <Link to="/login">
                  <button className="buttonheadwhite">Se connecter</button>
                </Link>
              </>
            )}
            <Link to="/publish">
              <button className="buttonheadblue">vends tes articles</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
