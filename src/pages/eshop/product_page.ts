import { expect, type Locator, type Page } from "@playwright/test";

export class ProductPage {
    private readonly page: Page;
    readonly cart: Locator;
    readonly cartButton: Locator;
    readonly cartBasket: Locator;
    readonly cartDropDown: Locator;
    readonly cartEmptyText: Locator;
    readonly alertBox: Locator;
    readonly alertBoxSuccess: Locator;
    readonly wishListAddButton: Locator;
    readonly compareProductsButton: Locator;
    readonly productNameText: Locator;
    readonly productBrandRow: Locator;
    readonly productCodeRow: Locator;
    readonly productAvailabilityRow: Locator;
    readonly priceText: Locator;
    readonly exTaxRow: Locator;
    readonly qtyLabel: Locator;
    readonly qtyInput: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cart = page.locator("div#cart");
        this.cartButton = page.locator("div#cart > button");
        this.cartBasket = page.locator("div#cart .fa-shopping-cart");
        this.cartDropDown = page.locator("div#cart .dropdown-menu.pull-right");
        this.cartEmptyText = page.locator("div#cart p");
        this.alertBox = page.locator("#product-product .alert");
        this.alertBoxSuccess = page.locator("#product-product .alert-success");
        this.wishListAddButton = page.locator("//div[@id='content']//div[@class='col-sm-4']//i[contains(@class, 'fa-heart')]/parent::button");
        this.compareProductsButton = page.locator("//div[@id='content']//div[@class='col-sm-4']//i[contains(@class, 'fa-exchange')]/parent::button");
        this.productNameText = page.locator("#content .col-sm-4 h1");
        this.productBrandRow = page.locator("//div[@id='content']//div[@class='col-sm-4']//ul[1]//li[1]");
        this.productCodeRow = page.locator("//div[@id='content']//div[@class='col-sm-4']//ul[1]//li[2]");
        this.productAvailabilityRow = page.locator("//div[@id='content']//div[@class='col-sm-4']//ul[1]//li[3]");
        this.priceText = page.locator("//div[@id='content']//div[@class='col-sm-4']//ul[2]//li[1]");
        this.exTaxRow = page.locator("//div[@id='content']//div[@class='col-sm-4']//ul[2]//li[2]");
        this.qtyLabel = page.locator("//label[@for='input-quantity']");
        this.qtyInput = page.locator("#input-quantity");
        this.addToCartButton = page.locator("#button-cart");
    }

    async openProductIdPage(id: number): Promise<ProductPage> {
        await this.page.goto(`https://tredgate.com/eshop/index.php?route=product/product&product_id=${id}`);
        return this;
    }

    async addToWishList(): Promise<ProductPage> {
        await this.wishListAddButton.click();
        return this;
    }

    async addToCompare(): Promise<ProductPage> {
        await this.compareProductsButton.click();
        return this;
    }

    async setQuantity(quantity: number): Promise<ProductPage> {
        //await this.qtyInput.clear();
        await this.qtyInput.fill(String(quantity));
        return this;
    }

    async addToCart(): Promise<ProductPage> {
        await this.addToCartButton.click();
        return this;
    }

    async openCart(): Promise<ProductPage> {
        await this.cartButton.click();
        return this;
    }

    async isProductInCart(productName: string, quantity: number=1): Promise<ProductPage> {
        await this.openCart();
        await expect.soft(this.cartDropDown).toContainText(productName); // jen symbolický test
        await expect.soft(this.cartDropDown).toContainText(`x ${String(quantity)}`); // jen symbolický test
        return this;
    }

    async addToCartAndCheck(productName: string, quantity: number=1): Promise<ProductPage> {
        await this.setQuantity(quantity)
            .then((productPage) => productPage.addToCart())
            .then((productPage) => productPage.isProductInCart(productName, quantity));
        return this;
    }
}