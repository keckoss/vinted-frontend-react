import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Offres() {
  const [offres, setOffres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://lereacteur-vinted-api.herokuapp.com/offers")
      .then((response) => {
        setOffres(response.data.offers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div className="toutproduit">
          {offres.map((offre) => (
            <Link
              to={`/offer/${offre._id}`}
              className="link produits"
              key={offre._id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h3 className="titreproduit">{offre.owner.account.username}</h3>
              <div className="subproduct">
                <div className="offimg">
                  <img src={offre.product_image.url} alt={offre.product_name} />
                </div>
                <div className="productbas">
                  <p>{offre.product_price}</p>
                  <p>{offre.product_details[0].MARQUE}</p>
                  <p>{offre.product_details[1].TAILLE}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Offres;
