import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    //Locators
    readonly email: Locator;
    readonly password: Locator;
    readonly signInbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByPlaceholder("UserName")
        this.password = page.locator('input[type="password"]')
        this.signInbutton = page.getByRole("button", { name: "Sign in" })
    }
    async navigate() {
        await this.page.goto("http://tms-flairminds.centralindia.cloudapp.azure.com/login");
    }


    async filldata(username: string, password: string) {
        await this.email.fill(username);
        await this.password.fill(password);
    }
    async clickSignIn() {
        await this.signInbutton.click();
    }

    async login(username: string, password: string){
        await this.filldata(username,password);
        await this.clickSignIn();
    }


}


