import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MasterDataPage } from '../pages/MasterDataPage';
import {users} from '../test-data/users'

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
    loginAs:async({loginpage},use)=>{
        await use(async(role:Role)=>{
            const user=users[role];
            await loginpage.login(user.username,user.password)
        });
    },

});

export { expect } from '@playwright/test';
