import { Locator, Page } from "@playwright/test";

export class Menu{
    readonly page :Page;
    readonly masterdata:Locator;

    constructor(page:Page){
        this.page=page;
        this.masterdata=page.locator('li',{hasText:'Master Data'})
    }

    async clickMasterData(){
        await this.masterdata.click();
    }

}