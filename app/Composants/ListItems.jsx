import react from "react";
import {Link} from 'react-router-dom'; // permet de naviguer entre les pages

export default function ListItems() {
    let cart = [];
    const items = [{name: "item1", price: 10}, {name: "item2", price: 20}, {name: "item3", price: 30}];
    const addItem = (itemName, quantity) => {
        const cartItem = cart.find(i => i.name === itemName);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart = [...cart, {name: itemName, quantity}];
        }
        localStorage.clear()
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(localStorage.getItem("cart"));
    }


    return (
        <main>
            <header>
                <div>
                    <nav>
                        <h1>Accueil</h1>
                        <button><Link to="/">Accueil</Link></button>
                        <button><Link to="/ListItems">List des items</Link></button>
                        <button><Link to="/Cart">Panier</Link></button>
                    </nav>
                </div>
            </header>
            <div>
                <p>Liste des Items</p>
                <table>
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><input type="number" defaultValue={1} min="1" id={`item${index + 1}-quantity`}/></td>
                            <td>
                                <button
                                    onClick={() => addItem(item.name, parseInt((document.getElementById(`item${index + 1}-quantity`)).value))}>Add
                                    to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </main>
    );
}