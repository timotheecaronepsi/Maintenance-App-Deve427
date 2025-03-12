import react from "react";
import {Link} from 'react-router-dom'; // permet de naviguer entre les pages

export default function Cart() {
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
                <p>Cart</p>
            </div>
        </main>
    );
}