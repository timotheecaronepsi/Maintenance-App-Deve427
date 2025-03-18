import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/'); // Utilise baseURL défini dans `playwright.config.js`
});


test('onglet title accueil', async ({ page }) => {
    await expect(page).toHaveTitle(/Accueil/);
});

test('h3 accueil title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Accueil' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'PROJET DEVE247' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bienvenue sur notre site' })).toBeVisible();
});



