import test from "@playwright/test";

test("admin Login", async ({ page }) => {

    await page.goto("http://tms-flairminds.centralindia.cloudapp.azure.com/login");
    await page.getByPlaceholder("Username").fill("admin@tms.com");
    await page.getByPlaceholder("••••••••").fill("admin");
    await page.getByRole("button",{name:'Sign In'}).click();
    await page.locator("(//span[contains(text(),'Indents')])[1]").click();
    await page.getByRole("button",{name:'Create Indent'}).click();

    await page.getByRole("combobox",{name:'Source'}).click();
    const responsePromise= page.waitForResponse(
        response =>
            response.url().includes("/api/lanes/routes/destinations") &&
        response.status()=== 200
    );
    let sankrai= page.locator(':text-is("Sankrail")');
    await sankrai.click();
    const response = await responsePromise;
    const data = await response.json();
    console.log(data);
    await page.waitForTimeout(5000);
    
    

})