import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MasterDataPage } from '../pages/MasterDataPage';
import {users} from '../test-data/users'
import { BasePage } from '../pages/BasePage';

type Role='admin'|'transporter'|'operation'|'finance'; 
  
type MyFixtures = {
    loginpage: LoginPage;
    masterpage: MasterDataPage;
    loginAs:(role:Role)=>Promise<void>;
};

export const test = base.extend<MyFixtures>({
    loginpage: async ({ page }, use) => {
        const loginpage = new LoginPage(page);
        await loginpage.navigate();
        await use(loginpage);
    },
    masterpage: async ({ page }, use) => {
        const masterpage = new MasterDataPage(page);
        await use(masterpage);
    },
    
    loginAs:async({page,loginpage},use)=>{
        await use(async(role:Role)=>{
            const basepage = new BasePage(page);
            const user=users[role];
            await loginpage.login(user.username,user.password)
            await basepage.clicktoastmsg();
        });
    },

});

export { expect } from '@playwright/test';
