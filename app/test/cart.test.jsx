import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../Composants/Cart.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';


// Mock de localStorage
// Object.defineProperty est utilisé pour remplacer localStorage global par un mock personnalisé.

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => store[key] = value.toString(),
    clear: () => store = {},
    removeItem: (key) => delete store[key],
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// Initialisation avant chaque test
// Avant chaque test, on initialise un panier mocké dans le localStorage avec deux articles.

beforeEach(() => {
  const mockCart = [
    { name: 'Article 1', property: [2, 15] }, // 2 quantités, prix 15€
    { name: 'Article 2', property: [1, 30] }, // 1 quantité, prix 30€
  ];
  global.localStorage.setItem('cart', JSON.stringify(mockCart));
});

// Nettoyage après chaque test
// Après chaque test, on efface le contenu du localStorage pour s'assurer qu'il n'y a pas de résidus d'un test à l'autre

afterEach(() => {
  global.localStorage.clear();
});

// Test 1 : Rendu de la page du panier avec les articles

test('renders cart page with items', () => {
  render(
    <Router>
      <CartPage />
    </Router>
  );

  // Vérification que les articles sont affichés
  expect(screen.getByText('Article 1')).toBeInTheDocument();
  expect(screen.getByText('Article 2')).toBeInTheDocument();

  // Utilisation de getAllByText pour gérer plusieurs occurrences de "Quantité:"
  const quantities = screen.getAllByText('Quantité:');
  expect(quantities.length).toBe(2); // Vérifie qu'il y a bien deux éléments "Quantité:"
  expect(quantities[0]).toBeInTheDocument(); // Vérifie que la première occurrence est présente
  expect(quantities[1]).toBeInTheDocument(); // Vérifie que la deuxième occurrence est présente
});

// Test 2 : Calcul du total du panier

test('calcul du total du panier', () => {
  render(
    <Router>
      <CartPage />
    </Router>
  );

  // Vérification que le total du panier est calculé correctement
  expect(screen.getByText('Total: 60€')).toBeInTheDocument();
});

// Test 3 : Mise à jour de la quantité d'un article

test('mettre à jour la quantité d\'un article', () => {
  render(
    <Router>
      <CartPage />
    </Router>
  );

  // Modifier la quantité de l'article 1
  const input = screen.getAllByDisplayValue('2')[0];
  fireEvent.change(input, { target: { value: '3' } });

  // Vérifier que la quantité a été modifiée et le total recalculé
  expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  expect(screen.getByText('Total: 75€')).toBeInTheDocument();
});

// Test 4 : Suppression d'un article du panier

test('supprimer un article du panier', () => {
  render(
    <Router>
      <CartPage />
    </Router>
  );

  // Cliquer sur le bouton de suppression de l'article 1
  const deleteButton = screen.getAllByText('Supprimer')[0];
  fireEvent.click(deleteButton);

  // Vérifier que l'article a été supprimé et que le panier affiche le total mis à jour
  expect(screen.queryByText('Article 1')).toBeNull();
  expect(screen.getByText('Total: 30€')).toBeInTheDocument();
});

// Test 5 : Panier vide

test('panier vide', () => {
  // Mock d'un panier vide
  global.localStorage.setItem('cart', JSON.stringify([]));

  render(
    <Router>
      <CartPage />
    </Router>
  );

  // Vérification que le message "Votre panier est vide" est affiché
  expect(screen.getByText('Votre panier est vide.')).toBeInTheDocument();
});
