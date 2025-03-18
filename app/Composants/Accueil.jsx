import { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import react from 'react';

import '../app.css';

export function Accueil() {

    useEffect(() => {
        document.title = "Accueil"; // Met à jour le titre de l'onglet
    }, []);

    return (
        <>
            <nav>
                <h1>Accueil</h1>
                <Navbar />
            </nav>
            <div className="div-accueil">
                <h3 className="h3-accueil">PROJET DEVE247</h3>
                <h2 className="h2-accueil">Bienvenue sur notre site</h2>
            </div>
        </>
    );
};