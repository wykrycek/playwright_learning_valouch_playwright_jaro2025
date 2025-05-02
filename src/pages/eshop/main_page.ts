import { Locator, Page, expect } from "@playwright/test";

export class MainPage {
    page: Page;
    logoImage: Locator;
    cartButton: Locator;
    searchInput: Locator;
    featuredTitle: Locator;
    footerInformationHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoImage = page.locator("img[alt='Tredgate Obchod']");
        this.cartButton = page.locator("#cart span#cart-total");
        this.searchInput = page.locator("#search input");
        this.featuredTitle = page.locator("div[id='content'] h3");
        this.footerInformationHeader = page.locator("footer div.row div.col-sm-3:first-child h5");
    }

    async openEshop(): Promise<MainPage> {
        await this.page.goto("https://www.tredgate.com/eshop/");
        return this;
    }

    async logoIsVisible(): Promise<MainPage> {
        await expect(this.logoImage).toBeVisible();
        return this;
    }

    async cartButtonIsVisible(): Promise<MainPage> {
        await expect(this.cartButton).toBeVisible();
        return this;
    }

    async searchInputHasPlaceholderText(searchText: string): Promise<MainPage> {
        await expect(this.searchInput).toHaveAttribute('placeholder', searchText);
        return this;
    }

    async featuredTitleHasText(featuredText: string): Promise<MainPage> {
        await expect(this.featuredTitle).toHaveText(featuredText);
        return this;
    }

    async footerInformationHeaderHasText(informationText: string): Promise<MainPage> {
        await expect(this.footerInformationHeader).toHaveText(informationText);
        return this;
    }
}