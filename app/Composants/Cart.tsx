import React, { useState } from "react";
import { Link } from "react-router-dom"; // permet de naviguer entre les pages
import Navbar from "./Navbar";

// Définition d'un type pour un article du panier
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Page Panier
const CartPage: React.FC = () => {
  // Liste d'articles dans le panier
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Produit 1", price: 25, quantity: 1 },
    { id: 2, name: "Produit 2", price: 15, quantity: 2 },
  ]);

  // Calcul du total du panier
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Supprimer un article du panier
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Mettre à jour la quantité d'un article
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <>
          <nav>
            <h1>Panier</h1>
            <Navbar />
          </nav>

      <div>
        <h2>Votre Panier</h2>
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span> - <span>{item.price}€</span> -{" "}
                  <span>Quantité: </span>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                  <button onClick={() => removeItem(item.id)}>Supprimer</button>
                </li>
              ))}
            </ul>
            <p>Total: {getTotalPrice()}€</p>
            <button>Passer à la caisse</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
