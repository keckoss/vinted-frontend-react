import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/payment", {
      state: {
        title: offer.product_name,
        price: offer.product_price * 100,
        curency: "eur",
      },
    });
  };

  useEffect(() => {
    axios
      .get(`https://lereacteur-vinted-api.herokuapp.com/offer/${id}`)
      .then((response) => {
        const selectedOffer = response.data;
        setOffer(selectedOffer);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  }, [id]);

  if (!offer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="offergrey">
      <div className="container">
        <div className="offergenerale">
          <div className="offerleft">
            <img src={offer.product_image.url} alt={offer.product_name} />
          </div>
          <div className="offerright">
            <div className="offerrighthaut">
              <div className="offerprice">{offer.product_price} €</div>
              <div className="offerlist">
                <li>
                  <span>Marque</span>
                  <span>{offer.product_details[0].MARQUE}</span>
                </li>
                <li>
                  <span>Etat</span>
                  <span>{offer.product_details[1].ÉTAT}</span>
                </li>
                <li>
                  <span>Couleur</span>
                  <span>{offer.product_details[2].COULEUR}</span>
                </li>
                <li>
                  <span>Emplacement</span>
                  <span>{offer.product_details[3].EMPLACEMENT}</span>
                </li>
              </div>
            </div>
            <div className="divider"></div>
            <div className="offerrightbas">
              <div className="name">{offer.product_name}</div>
              {offer.product_description}
              <div className="avatarusername">
                <img
                  className="avatar"
                  src={
                    offer?.owner?.account?.avatar?.secure_url ||
                    "url_de_secours_si_secure_url_est_indefini"
                  }
                  alt="avatar"
                />

                {offer.owner.account.username}
              </div>
              <button onClick={handleSubmit}>Acheter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
