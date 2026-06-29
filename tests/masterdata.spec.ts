import  {test, expect } from "../fixtures/custom-fixtures";
import { plantData } from "../test-data/Data";



test.only('As an Admin user, I should be able to create and verify a new plant', async ({ loginAs, masterpage }) => {
    await loginAs("admin");
    const testdata = { ...plantData.validPlant1() };
    const plantcode = testdata.plantCode;
    await test.step('Scenario : Create a new plant with all mandatory fields', async () => {
        await masterpage.createPlant(testdata);
        await masterpage.verifyToastMessage("Plants added successfully");
    });
    await test.step('Scenario : Verify the newly created plant is visible in the grid list', async () => {
        const plantRow = await masterpage.getMasterTableRow(plantcode);
        await expect.soft(plantRow).toBeVisible();
    });
    await test.step('view data',async({})=>{
        await masterpage.clickViewBtn(plantcode);


    })
});

test('As an Admin user, I should not be able to create a plant with duplicate Plant Code.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await  masterpage.createPlant(plantData.validPlant2);
    await masterpage.verifyToastMessage("Plant code 'PL001' already exists.");
});

test('As an Admin user, I should not be able to create a plant without entering Company Code.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    const testdata={...plantData.validPlant1(),companyCode:''};
    await  masterpage.createPlant(testdata);
    await masterpage.verifyToastMessage("Missing: Company Code.");
});

test('As an Admin user, I should not be able to create a plant without entering Plant Code.',async({loginAs,masterpage})=>{
    await loginAs("admin");
    const testdata={...plantData.validPlant1(),plantCode:''};
    await  masterpage.createPlant(testdata);
    await masterpage.verifyToastMessage("Missing: Plant Code.");
});


test('As an Admin user, I should not be able to create a plant with invalid Pin Code.',async({loginAs,masterpage})=>{
    await loginAs("admin");
    const testdata=plantData.validPlant2;
    await  masterpage.createPlant(testdata);
    await masterpage.verifyToastMessage("Pin Code: Must be 6 digits, cannot start with 0");
});

test('As an Admin user, system should display validation message for mandatory fields.',async({loginAs,masterpage})=>{
    await loginAs("admin");
    const testdata={};
    await  masterpage.createPlant(testdata);
    await masterpage.verifyToastMessage("Missing: Company Code, Company Name, Plant Code, Plant Name, Address, City, State, Pin Code.");
});


