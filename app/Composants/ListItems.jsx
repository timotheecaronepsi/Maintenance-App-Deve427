import react from "react";
import Navbar from './Navbar.jsx';

let cart = [];

export function addItem(itemName, quantity, price) {
    const cartItem = cart.find(i => i.name === itemName);
    if (cartItem) {
        cartItem.property[0] += quantity;
    } else {
        cart = [...cart, {name: itemName, property: [quantity, price]}];
    }
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.clear();
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(localStorage.getItem("cart"));
    }
    return cart;
}

export default function ListItems() {

    const items = [{name: "item1", price: 10}, {name: "item2", price: 20}, {name: "item3", price: 30}];

    return (
        <>
            <nav>
                <h1>Liste des Items</h1>
                <Navbar/>
            </nav>
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
                                    onClick={() => addItem(item.name, parseInt((document.getElementById(`item${index + 1}-quantity`)).value), item.price)}>Add
                                    to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </>
    );
}