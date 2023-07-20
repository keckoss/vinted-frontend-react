import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email,
          username,
          password,
          newsletter,
        }
      );

      const { account, token } = response.data;

      setErrorMessage(""); // Réinitialise le message d'erreur
      setSuccessMessage(`Merci pour votre inscription, ${account.username}!`);
      setSubmitted(true);

      // Sauvegarde du token dans les cookies
      Cookies.set("token", token, { expires: 7 }); // Le token expire dans 7 jours

      // Vous pouvez effectuer d'autres traitements avec les données de la réponse ici
    } catch (error) {
      setSuccessMessage(""); // Réinitialise le message de succès
      setSubmitted(true);

      if (error.response) {
        // Erreur renvoyée par l'API
        if (error.response.status === 409) {
          setErrorMessage("Un utilisateur avec ces informations existe déjà.");
        } else {
          setErrorMessage("Une erreur est survenue lors de l'inscription.");
        }
      } else {
        // Erreur de requête ou autre erreur
        setErrorMessage("Une erreur est survenue lors de l'inscription.");
      }
    }
  };

  const handleRetry = () => {
    setErrorMessage("");
    setSubmitted(false);
  };

  if (submitted) {
    if (successMessage) {
      setTimeout(() => {
        window.location.href = "/"; // Effectue la redirection
      }, 5000);

      return <div>{successMessage}</div>;
    } else if (errorMessage) {
      return (
        <div>
          {errorMessage}
          <br />
          <button onClick={handleRetry}>Réessayer</button>
        </div>
      );
    }
  }

  return (
    <form className="signupform" onSubmit={handleSubmit}>
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
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Newsletter:
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
      </label>
      <br />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Signup;
