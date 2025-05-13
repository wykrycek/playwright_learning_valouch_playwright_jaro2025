import { expect, test } from '@playwright/test';
import { ProductPage } from './../../src/pages/eshop/product_page.ts';

test.describe('Product Marketing Info', () => {
    const productData = {
        name: 'iPhone',
        brand: 'Apple',
        code: 'product 11',
        availability: 'In Stock',
        price: '101.00',
        tax: '101.00',
        price_currency: '$'
    }
    let productPage: ProductPage;
    test.beforeEach(async ({ page }) => {
        productPage = await new ProductPage(page).openProductIdPage(40);
    });

    test('Product marketing info - visibility test', async () => {
        await expect.soft(productPage.wishListAddButton).toBeVisible();
        await expect.soft(productPage.compareProductsButton).toBeVisible();
        await expect.soft(productPage.productNameText).toBeVisible();
        await expect.soft(productPage.productBrandRow).toBeVisible();
        await expect.soft(productPage.productCodeRow).toBeVisible();
        await expect.soft(productPage.productAvailabilityRow).toBeVisible();
        await expect.soft(productPage.priceText).toBeVisible();
        await expect.soft(productPage.exTaxRow).toBeVisible();
        await expect.soft(productPage.qtyLabel).toBeVisible();
        await expect.soft(productPage.qtyInput).toBeVisible();
        await expect.soft(productPage.addToCartButton).toBeVisible();
    });

    test('Product marketing info - text test', async () => {
        expect.soft(await (productPage.wishListAddButton).getAttribute('data-original-title')).toContain('Add to Wish List');
        expect.soft(await (productPage.compareProductsButton).getAttribute('data-original-title')).toContain('Compare this Product');
        await expect.soft(productPage.productNameText).toContainText(productData.name);
        await expect.soft(productPage.productBrandRow).toContainText(productData.brand);
        await expect.soft(productPage.productCodeRow).toContainText(productData.code);
        await expect.soft(productPage.productAvailabilityRow).toContainText(productData.availability);
        await expect.soft(productPage.priceText).toContainText(`${productData.price_currency}${productData.price}`);
        await expect.soft(productPage.exTaxRow).toContainText(`${productData.price_currency}${productData.tax}`);
        await expect.soft(productPage.qtyLabel).toContainText('Qty');
        await expect.soft(productPage.qtyInput).toHaveValue('1');
        await expect.soft(productPage.addToCartButton).toContainText('Add to Cart');
    });

    // functionality test
    test('Product marketing info - functionality test', async () => {
        // card is empty
       await test.step('Cart is empty', async () => {
            await productPage.openCart();
            await productPage.cartEmptyText.waitFor();
            await expect.soft(productPage.cartDropDown).toBeVisible();
            await expect.soft(productPage.cartEmptyText).toBeVisible();
            await expect.soft(productPage.cartEmptyText).toContainText('Your shopping cart is empty!');
        });

        // add to wish list
        await test.step('Add to wish list', async () => {
            await productPage.addToWishList();
            await productPage.alertBoxSuccess.waitFor();
            await expect.soft(productPage.alertBoxSuccess).toContainText('You must login');
        });

        // add to compare list
        await test.step('Add to compare list', async () => {
            await productPage.addToCompare();
            await productPage.alertBoxSuccess.waitFor();
            await expect.soft(productPage.alertBoxSuccess).toContainText('to your product comparison');
        });

        // add to cart
        await test.step('Add to cart', async () => {
            await productPage.addToCart();
            await productPage.alertBoxSuccess.waitFor();
            await expect.soft(productPage.alertBoxSuccess).toContainText('to your shopping cart');
        });

        // cart has product
        await test.step('Cart has product', async () => {
            await productPage.openCart();
            await expect.soft(productPage.cartDropDown).toContainText(productData.name);
        });

        // set quantity
        await test.step('Set quantity', async () => {
            await productPage.setQuantity(2);
            await expect.soft(productPage.qtyInput).toHaveValue('2');
        });
    });

    test('Product marketing info - functionality test, advanced', async () => {
        // add to cart with quantity and check
        await test.step('Add to cart with quantity', async () => {
            await productPage.productNameText.waitFor();
            await productPage.addToCartAndCheck(productData.name, 2);
        });
    });

    test('Product marketing info - functionality test, cart opened', async () => {
        // open cart
        await test.step('Open cart', async () => {
            await productPage.openCart();
            await expect.soft(productPage.cartDropDown).toBeVisible();
        });
    });
});