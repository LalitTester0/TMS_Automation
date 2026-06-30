import  {test, expect } from "../fixtures/custom-fixtures";
import { plantData } from "../test-data/Data";



test('As an Admin user, I should be able to create and verify a new plant', async ({ loginAs, masterpage }) => {
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
    await test.step('Edit data',async({})=>{   
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

test('As an Admin user, I should be able to edit existing plant details.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await masterpage.openMasterDataPage();
    const plantcode='PL4882'
    await masterpage.clickViewBtn(plantcode);
    await masterpage.clickEditBtn()
    await masterpage.clickupdateBtn();
    await masterpage.verifyToastMessage("Plants updated successfully");
});


test('As an Admin user, I should be able to update Plant Name successfully.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await masterpage.openMasterDataPage();
    const plantcode='PL4882'
    await masterpage.clickViewBtn(plantcode);
    await masterpage.updateFieldByName('plant_name','dddgg');
    await masterpage.verifyToastMessage("Plants updated successfully");
    let newplantname=await masterpage.getColumnCellData(plantcode,3)
    expect('dddgg').toBe(newplantname);
});

test('As an Admin user, I should be able to activate/deactivate plant status.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await masterpage.openMasterDataPage();
    const plantcode='PL4882'
    await masterpage.clickViewBtn(plantcode);
    await masterpage.updatestatus();
    const status=await masterpage.getstatusvalue(plantcode,8);
    expect('Verified Active').toBe(status);
});

test('As an Admin user, I should not be able to update plant with blank mandatory fields.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await masterpage.openMasterDataPage();
    const plantcode='PL4882'
    await masterpage.clickViewBtn(plantcode);
    await masterpage.updateFieldByName('plant_name','');
    await masterpage.verifyToastMessage("Missing: Plant Name.");
});

test.only('As an Admin user, system should validate invalid Pin Code during update.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await masterpage.openMasterDataPage();
    const plantcode='PL4882'
    await masterpage.clickViewBtn(plantcode);
    await masterpage.updateFieldByName('pin_code','dfs');
    await masterpage.verifyToastMessage("Pin Code: Must be 6 digits, cannot start with 0");
});