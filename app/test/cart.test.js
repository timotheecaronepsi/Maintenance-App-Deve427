import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../Composants/Cart.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock de localStorage
beforeEach(() => {
  const mockCart = [
    { name: 'Article 1', property: [2, 15] }, // 2 quantités, prix 15€
    { name: 'Article 2', property: [1, 30] }, // 1 quantité, prix 30€
  ];
  global.localStorage.setItem('cart', JSON.stringify(mockCart));
});

afterEach(() => {
  global.localStorage.clear();
});

test('renders cart page with items', () => {
  render(
    React.createElement(Router, null, React.createElement(CartPage))
  );

  // Vérification que les articles sont affichés
  expect(screen.getByText('Article 1')).toBeInTheDocument();
  expect(screen.getByText('Article 2')).toBeInTheDocument();
  expect(screen.getByText('Quantité:')).toBeInTheDocument();
});

test('calcul du total du panier', () => {
  render(
    React.createElement(Router, null, React.createElement(CartPage))
  );

  // Vérification que le total du panier est calculé correctement
  expect(screen.getByText('Total: 60€')).toBeInTheDocument();
});

test('mettre à jour la quantité d\'un article', () => {
  render(
    React.createElement(Router, null, React.createElement(CartPage))
  );

  // Modifier la quantité de l'article 1
  const input = screen.getAllByDisplayValue('2')[0];
  fireEvent.change(input, { target: { value: '3' } });

  // Vérifier que la quantité a été modifiée et le total recalculé
  expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  expect(screen.getByText('Total: 75€')).toBeInTheDocument();
});

test('supprimer un article du panier', () => {
  render(
    React.createElement(Router, null, React.createElement(CartPage))
  );

  // Cliquer sur le bouton de suppression de l'article 1
  const deleteButton = screen.getAllByText('Supprimer')[0];
  fireEvent.click(deleteButton);

  // Vérifier que l'article a été supprimé et que le panier affiche le total mis à jour
  expect(screen.queryByText('Article 1')).toBeNull();
  expect(screen.getByText('Total: 30€')).toBeInTheDocument();
});

test('panier vide', () => {
  // Mock d'un panier vide
  global.localStorage.setItem('cart', JSON.stringify([]));

  render(
    React.createElement(Router, null, React.createElement(CartPage))
  );

  // Vérification que le message "Votre panier est vide" est affiché
  expect(screen.getByText('Votre panier est vide.')).toBeInTheDocument();
});
