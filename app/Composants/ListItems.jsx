import react from "react";

    let cart = [];
        const cartItem = cart.find(i => i.name === itemName);
        if (cartItem) {
        } else {
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(localStorage.getItem("cart"));
    }


    return (
                    <nav>
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
                                    to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
    );
}