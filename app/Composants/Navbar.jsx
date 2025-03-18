import "../app.css";
import { Link } from "react-router-dom";

const NavButton = ({ children }) => (
  <button className="navbar-button">{children}</button>
);

export default function Navbar() {
  return (
    <>
      <NavButton>
        <Link to="/">Accueil</Link>
      </NavButton>
      <NavButton>
        <Link to="/ListItems">List des items</Link>
      </NavButton>
      <NavButton>
        <Link to="/Cart">Panier</Link>
      </NavButton>
    </>
  );
}
