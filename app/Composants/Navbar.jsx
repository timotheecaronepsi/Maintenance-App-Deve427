import '../app.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <button className="navbar-button"><Link to="/">Accueil</Link></button>
            <button className="navbar-button"><Link to="/ListItems">List des items</Link></button>
            <button className="navbar-button"><Link to="/Cart">Panier</Link></button>
        </>
    );
};
