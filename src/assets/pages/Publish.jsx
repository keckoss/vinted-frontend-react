import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

function Publish() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPosted, setIsPosted] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handlePublish = async () => {
    const token = Cookies.get("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", selectedFile);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Offre publiée avec succès !");
        setIsPosted(true);
      } else {
        console.error("Échec de la publication de l'offre.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {!isPosted ? (
            <div className="publishmain">
              <div className="publish">
                <div>
                  <label htmlFor="title">Titre</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre"
                  />
                </div>
                <div>
                  {" "}
                  <label htmlFor="description">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div>
                  {" "}
                  <label htmlFor="price">Prix</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Prix"
                  />
                </div>
                <div>
                  <label htmlFor="condition">Etat</label>
                  <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    placeholder="Condition"
                  />
                </div>
                <div>
                  <label htmlFor="vity">Ville</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ville"
                  />
                </div>
                <div>
                  <label htmlFor="brand">Marque</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Marque"
                  />
                </div>
                <div>
                  <label htmlFor="size">Taille</label>
                  <input
                    type="number"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Taille"
                  />
                </div>
                <div>
                  <label htmlFor="color">Couleur</label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Couleur"
                  />
                </div>
                <div>
                  <label htmlFor="file">Photos</label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>
                <button className="publieroffre" onClick={handlePublish}>
                  Publier mon offre
                </button>
              </div>
            </div>
          ) : (
            <div className="paiementok">
              <p>Offre publiée avec succès !</p>
              <Link to="/">
                <button className="submitos">Retour à l'accueil</button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="paiementok">
          <p>Vous devez être connecté pour publier une offre.</p>
          <Link to="/login">
            <button className="submitos">Se connecter</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Publish;
