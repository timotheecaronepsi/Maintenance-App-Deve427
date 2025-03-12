import React, {useState} from 'react';
import '../app.css';

interface CartItem {
    name: string;
    quantity: number;
}

export function Acceuil() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [showItems, setShowItems] = useState(false);

    const addToCart = (item: string, quantity: number) => {
        const existingItem = cart.find(cartItem => cartItem.name === item);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.name === item ? {...cartItem, quantity: cartItem.quantity + quantity} : cartItem
            ));
        } else {
            setCart([...cart, {name: item, quantity}]);
        }
        setShowCart(true);
    };

    const removeFromCart = (item: string) => {
        setCart(cart.filter(cartItem => cartItem.name !== item));
    };

    const updateQuantity = (item: string, quantity: number) => {
        setCart(cart.map(cartItem =>
            cartItem.name === item ? {...cartItem, quantity} : cartItem
        ));
    };

    return (
        <main>
            <header>
                <div>
                    <nav>
                        <ul>
                            <li><a href="#menu" onClick={() => {
                                setShowCart(false);
                                setShowItems(false);
                            }}>Menu</a></li>
                            <li><a href="#items" onClick={() => {
                                setShowCart(false);
                                setShowItems(true);
                            }}>List des items</a></li>
                            <li><a href="#cart" onClick={() => {
                                setShowCart(true);
                                setShowItems(false);
                            }}>Pannier</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            {showCart ? (
                <div>
                    <h2>Cart</h2>
                    <ul>
                        {cart.map((cartItem, index) => (
                            <li key={index}>
                                {cartItem.name} - Quantity:
                                <input
                                    type="number"
                                    value={cartItem.quantity}
                                    onChange={(e) => updateQuantity(cartItem.name, parseInt(e.target.value))}
                                    min="1"
                                />
                                <button onClick={() => removeFromCart(cartItem.name)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : showItems ? (
                <div>
                    <h2>Items</h2>
                    <ul>
                        <li>
                            Item 1
                            <input type="number" defaultValue={1} min="1" id="item1-quantity"/>
                            <button
                                onClick={() => addToCart('Item 1', parseInt((document.getElementById('item1-quantity') as HTMLInputElement).value))}>Add
                                to Cart
                            </button>
                        </li>
                        <li>
                            Item 2
                            <input type="number" defaultValue={1} min="1" id="item2-quantity"/>
                            <button
                                onClick={() => addToCart('Item 2', parseInt((document.getElementById('item2-quantity') as HTMLInputElement).value))}>Add
                                to Cart
                            </button>
                        </li>
                        <li>
                            Item 3
                            <input type="number" defaultValue={1} min="1" id="item3-quantity"/>
                            <button
                                onClick={() => addToCart('Item 3', parseInt((document.getElementById('item3-quantity') as HTMLInputElement).value))}>Add
                                to Cart
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>Welcome to our site!</h2>
                </div>
            )}
        </main>
    );
}