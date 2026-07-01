import { Page, Locator, expect } from "@playwright/test";

export class BasePage {

    readonly page: Page;
    readonly toastMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toastMessage = page.locator(".Toastify__toast--close-on-click");
    }

   
    async waitfornetworkstable(){
        await this.page.waitForLoadState('networkidle');
    }
    async clicktoastmsg(){
        await this.toastMessage.click();
    }

    async verifyToastMessage(expectedMessage: string) {
        const toastmsg=await this.toastMessage.textContent();
        expect.soft(toastmsg).toEqual(expectedMessage);
        await this.clicktoastmsg();

    }
}