import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est déjà connecté en vérifiant la présence du token dans les cookies
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      // Sauvegarde du token dans les cookies
      Cookies.set("token", token, { expires: 7 }); // Le token expire dans 7 jours

      // Réinitialisation des champs du formulaire
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setIsLoggedIn(true);

      // Redirige l'utilisateur vers la page d'accueil après 5 secondes
      setTimeout(() => {
        window.location.href = "/"; // Effectue la redirection
      }, 5000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Email ou mot de passe incorrect.");
      } else {
        setErrorMessage("Une erreur est survenue lors de la connexion.");
      }
    }
  };

  if (isLoggedIn) {
    return (
      <div className="paiementok">
        <h1>Connexion réussie</h1>
        <p>Vous êtes maintenant connecté.</p>
        <p>
          Vous serez redirigé vers la page d'accueil dans quelques instants.
        </p>
      </div>
    );
  }

  return (
    <div className="loginform">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Vous n'avez pas de compte ? <Link to="/signup">Créer un compte</Link>
      </p>
    </div>
  );
};

export default Login;
