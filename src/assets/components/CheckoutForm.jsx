import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  console.log("test", location);
  const [completed, setCompleted] = useState(false);

  // Définir des variables d'état pour stocker les données de location.state
  const [orderSummary, setOrderSummary] = useState({
    title: "",
    price: 0,
  });

  // Variables d'état pour les frais
  const [feesPercentage, setFeesPercentage] = useState(10); // 10% of the amount
  const [fixedFees, setFixedFees] = useState(80); // Fixed fees with the value 80

  // Fonction pour mettre à jour les données de location.state dans les variables d'état
  const updateOrderSummary = () => {
    const { title, price } = location.state;
    setOrderSummary({ title, price });
  };

  // Appeler la fonction pour mettre à jour les données lorsque le composant se monte
  useEffect(() => {
    updateOrderSummary();
  }, []);

  //  10% du prix
  const calculateTenPercentOfPrice = () => {
    return (orderSummary.price * 0.1).toFixed(2);
  };

  // (product price + fees)
  const calculateTotalPrice = () => {
    const tenPercentFees = calculateTenPercentOfPrice();
    return (
      orderSummary.price +
      parseFloat(tenPercentFees) +
      fixedFees
    ).toFixed(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: "Alexis achete des robes",
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;

    // Récupérez le titre et le prix à partir de location.state
    const { title, price } = location.state;
    const currency = "eur";

    // Utilisez le titre et le prix dans votre requête Axios
    const response = await axios.post(
      "https://site--vinted--54hcj7vln9rf.code.run/pay",
      {
        token: stripeToken,
        title, // Incluez le titre dans la requête
        amount: price + fixedFees + feesPercentage, // Incluez le prix dans la requête
      }
    );
    console.log(response.data);

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {!completed ? (
        <div className="paymentbg">
          <div className="paymentform">
            <div className="resume">
              <span>commande</span>
              <span>{orderSummary.price / 100} € </span>
            </div>
            <div className="resume">
              <span>Frais de protection acheteurs</span>
              <span>{calculateTenPercentOfPrice() / 100} €</span>
            </div>
            <div className="resume">
              <span>frais de ports</span>
              <span>{fixedFees / 100} €</span>
            </div>
            <div className="resume">
              <span>Total</span>
              <span>{calculateTotalPrice() / 100} €</span>
            </div>
            <div className="cartasse">
              <form>
                <CardElement className="stripeElement" />
              </form>
            </div>
            <button type="submit" onClick={handleSubmit} className="submitos">
              Valider
            </button>
          </div>
        </div>
      ) : (
        <div className="paiementok">
          <span>Paiement accepté ! Maintenant va acheter autre chose ! </span>
          <Link to="/">
            <button className="submitos">Retourner à l'accueil</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
