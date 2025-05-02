import { test } from '@playwright/test';
import { MainPage } from '../../src/pages/eshop/main_page';

test.describe('Test Eshop Home Page', () => {
    let mainPage: MainPage;
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.openEshop();
    });

    test('Logo (is visible)', async () => {
        await mainPage.logoIsVisible();
    });

    test('Cart Button (is visible)', async () => {
        await mainPage.cartButtonIsVisible();
    });

    test('Search Placeholder (has text)', async () => {
        await mainPage.searchInputHasPlaceholderText('Search');
    });

    test('Featured Title (has text)', async () => {
        await mainPage.featuredTitleHasText('Featured');
    });

    test('Footer Information Header (has text)', async () => {
        await mainPage.footerInformationHeaderHasText('Information');
    });
});