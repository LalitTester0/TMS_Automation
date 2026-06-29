import { test, expect } from '../fixtures/custom-fixtures';


// test("login ", async ({ page }) => {
//     await page.goto("http://tms-flairminds.centralindia.cloudapp.azure.com/login");
//     await page.getByPlaceholder("admin@tms.com").fill("admin@tms.com");
//     await page.locator('input[type="password"]').fill('admin');
//     //await page.getByRole('textbox', { name: 'Password' }).fill('admin');
//     await page.getByRole('button', { name: 'Sign In' }).click();
//     const msg = await page.getByRole("heading", { name: /Welcome back/ });
//     console.log(await msg.textContent())
//     await expect.soft(msg).toContainText('Welcome');
//     // await page.getByRole("listitem",{name:"Master Data"}).click();
//     await page.locator('li', { hasText: 'Master Data' }).click();
//     //moving to another page
//     await page.getByRole("button", { name: "Add New" }).click();
//     const msg2 = await page.getByRole("heading", { name: /Add New Plants/ });
//     console.log(await msg2.textContent())
//     await expect(msg2).toContainText('Add New Plants');
// })

test("login2", async ({ page, loginpage, masterpage }) => {
    await loginpage.filldata("admin@tms.com", "admin");
    await loginpage.clickSignIn();
    const msg = await loginpage.getWelcomemsg();
    expect(msg).toContain('Welcome back, Admin');
    await masterpage.clickMasterData();
    await masterpage.clickaddNewbtn();
    const msg2 = await masterpage.getaddnewplantmsg();
    await expect(msg2).toContain('Add New Plants')

})