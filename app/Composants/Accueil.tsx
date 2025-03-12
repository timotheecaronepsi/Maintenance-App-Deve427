import Navbar from './Navbar';
import react from 'react';

import '../app.css';

export function Accueil() {
    return (
        <>
            <div>
                <nav>
                    <h1>Accueil</h1>
                    <Navbar />
                </nav>
            </div>
            <div>
                <p>Bienvenue sur notre site</p>
            </div>
        </>
    );
}