import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"; // permet de naviguer entre les pages
import Navbar from "./Navbar.jsx";

// Page Panier
const CartPage = () => {
    // Récupère le panier depuis le localStorage, s'il existe
    const cartFromStorage = localStorage.getItem("cart");
    const cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];

    var x = 1;

    // Liste d'articles dans le panier
    const [cartItems, setCartItems] = useState(
        cart.map((element) => {
            return {id: x++, name: element.name, price: element.property[1], quantity: element.property[0]};
        })
    );

    // Calcul du total du panier
    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    // Supprimer un article du panier
    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Mettre à jour la quantité d'un article
    const updateQuantity = (id, quantity) => {
        setCartItems(
            cartItems.map((item) => (item.id === id ? {...item, quantity} : item))
        );
    };

    return (
        <>
            <nav>
                <h1>Panier</h1>
                <Navbar/>
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