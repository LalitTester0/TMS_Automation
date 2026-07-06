import  {test, expect } from "../fixtures/custom-fixtures";
import { customerdata, depotdata, plantData } from "../test-data/Data";

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
    await test.step('As an Admin user, I should be able to edit existing plant details.',async()=>{
        await masterpage.clickViewBtn(plantcode);
        await masterpage.clickEditBtn()
        await masterpage.clickupdateBtn();
        await masterpage.verifyToastMessage("Plants updated successfully")
    })
    await test.step('',async()=>{
        const row=await masterpage.getMasterTableRow(plantcode);
        await expect.soft(row).toBeVisible();
    })
    await test.step('As an Admin user, I should be able to update Plant Name successfully.',async()=>{
        let newplantname="Sankrail N";
        await masterpage.clickViewBtn(plantcode);
        await masterpage.updateFieldByName('plant_name',newplantname);
        await masterpage.verifyToastMessage("Plants updated successfully");
        let expectednewplantnames=await masterpage.getColumnCellData(plantcode,3)
        expect.soft(newplantname).toBe(expectednewplantnames);
    })
    await test.step('As an Admin user, I should be able to activate/deactivate plant status.',async()=>{
        await masterpage.clickViewBtn(plantcode);
        await masterpage.updatestatus();
        const status=await masterpage.getstatusvalue(plantcode,8);
        await masterpage.clicktoastmsg();
        expect.soft('Not Active').toBe(status);
    })
    await test.step('As an Admin user, I should not be able to update plant with blank mandatory fields.',async()=>{
        await masterpage.clickViewBtn(plantcode);
        await masterpage.updateFieldByName('plant_name','');
        await masterpage.verifyToastMessage("Missing: Plant Name.");
        await masterpage.clickCancelBtn()
    })
    await test.step('As an Admin user, system should validate invalid Pin Code during update.',async()=>{
        await masterpage.clickViewBtn(plantcode);
        await masterpage.updateFieldByName('pin_code','dfs');
        await masterpage.verifyToastMessage("Pin Code: Must be 6 digits, cannot start with 0");
        await masterpage.clickCancelBtn()
    })
    await test.step('As an Admin user, system should display confirmation popup before deletion.',async()=>{
        await masterpage.clickTableDeleteBtn(plantcode);
        const confirmationmsg=await masterpage.getConfirmationmsg();
        await expect.soft(confirmationmsg).toBeVisible();
        await test.step('As an Admin user, I should be able to delete plant record successfully.',async()=>{
            await masterpage.clickDeleteBtn();
            await masterpage.verifyToastMessage('Plants deleted successfully');
        })
    })
});

test('As an Admin user, I should not be able to create a plant with duplicate Plant Code.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await  masterpage.createPlant(plantData.validPlant2);
    await masterpage.verifyToastMessage("Plant code '1002' already exists.");
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
     const testdata={...plantData.validPlant1(),pinCode:'dgfgdf'};
    await  masterpage.createPlant(testdata);
    await masterpage.verifyToastMessage("Pin Code: Must be 6 digits, cannot start with 0");
});

test('As an Admin user, system should display validation message for mandatory fields.',async({loginAs,masterpage})=>{
    await loginAs("admin");
    const testdata={};
    await  masterpage.createPlant(testdata);
    await masterpage.verifyToastMessage("Missing: Company Code, Company Name, Plant Code, Plant Name, Address, City, State, Pin Code.");
});

test('As an Admin user, I should not be able to delete plant linked with active Shipment or Trip.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await masterpage.openMasterDataPage();
    const plantcode='1002';
    await masterpage.clickTableDeleteBtn(plantcode);
    await masterpage.clickDeleteBtn();
    await masterpage.verifyToastMessage('Cannot delete Plant: It is currently referenced as source or destination in Route SANKRAIL-AGARTALA.');
});

test('As an Admin user, I should be able to search plants using search box.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await masterpage.openMasterDataPage();
    const plantcode='1002'
    const row=await masterpage.getSearchResult(plantcode);
    await expect(row).toBeVisible();
});


test('Create a new depot with all mandatory fields', async ({ loginAs, masterpage }) => {
    await loginAs("admin");
    const testdata = { ...depotdata.validPlant1() };
    const depotcode = testdata.depotCode;
    let depot_Namea='Pune N'
    await test.step('As an Admin user, I should be able to save depot successfully after clicking Create Depots button.',async()=>{
        await masterpage.createDepot(testdata)
        await masterpage.verifyToastMessage('Depots added successfully');
    })
    await test.step('As an Admin user, newly created depot should display in Depot listing page.',async()=>{
        const depotRow = await masterpage.getMasterTableRow(depotcode);
        await expect.soft(depotRow).toBeVisible(); 
    })
    await test.step('As an Admin user, I should be able to edit existing depot details.',async()=>{
        await masterpage.clickViewBtn(depotcode);
        await masterpage.clickEditBtn()
        await masterpage.clickupdateBtn();
        await masterpage.verifyToastMessage("Depots updated successfully")
    })
    await test.step('As an Admin user, I should be able to update Depot Name successfully.',async()=>{
        let depot_Namea='Pune N'
        await masterpage.clickViewBtn(depotcode);
        await masterpage.updateFieldByName('depot_Name',depot_Namea);
        await masterpage.verifyToastMessage("Depots updated successfully")
    })
    await test.step('As an Admin user, I should be able to update Depot Name successfully.',async()=>{
        const depotRow = await masterpage.getMasterTableRow(depot_Namea);
        await expect.soft(depotRow).toBeVisible(); 
    })
    await test.step('As an Admin user, I should be able to activate/deactivate depot status.',async()=>{
        await masterpage.clickViewBtn(depotcode);
        await masterpage.updatestatus();
        const status=await masterpage.getstatusvalue(depotcode,8);
        await masterpage.clicktoastmsg();
        expect.soft('Not Active').toBe(status);
    })
    await test.step('As an Admin user, I should not be able to update depot with blank mandatory fields.',async()=>{
        await masterpage.clickViewBtn(depotcode);
        await masterpage.updateFieldByName('depot_Name','');
        await masterpage.verifyToastMessage("Missing: Depot Name.");
        await masterpage.clickCancelBtn()
    })
    await test.step('As an Admin user, I should not be able to update depot with invalid Email ID.',async()=>{
        await masterpage.clickViewBtn(depotcode);
        await masterpage.updateFieldByName('email_id','sff');
        await masterpage.verifyToastMessage("Email: Invalid email");
        await masterpage.clickCancelBtn()
    })
    await test.step('As an Admin user, I should not be able to update depot with invalid Phone Number.',async()=>{
        await masterpage.clickViewBtn(depotcode);
        await masterpage.updateFieldByName('phone_number','7474');
        await masterpage.verifyToastMessage("Phone: 10 digits");
        await masterpage.clickCancelBtn()
    })
    await test.step('As an Admin user, system should display confirmation popup before deletion.',async()=>{
        await masterpage.clickTableDeleteBtn(depotcode);
        const confirmationmsg=await masterpage.getConfirmationmsg();
        await expect.soft(confirmationmsg).toBeVisible();
        await test.step('As an Admin user, I should be able to delete depot record successfully.',async()=>{
            await masterpage.clickDeleteBtn();
            await masterpage.verifyToastMessage('Depots deleted successfully');
        })
    })
})

test('Check all Mandatory fields in Depot tab', async ({ loginAs, masterpage }) => {
    await loginAs("admin");
    const testdata = { ...depotdata.validPlant1() };
    const depotcode = testdata.depotCode;
    await test.step('As an Admin user, I should not be able to create depot without Depot Code.',async()=>{
    await masterpage.createDepot({...testdata,depotCode:''})
    await masterpage.verifyToastMessage('Missing: Depot Code.');
    })
    await test.step('As an Admin user, I should not be able to create depot without Depot Name.',async()=>{
        await masterpage.clickCancelBtn();
        await masterpage.clickAddNewBtn();
        await masterpage.fillDepotFields({...testdata,depotName:''});
        await masterpage.selectRegion();
        await masterpage.clickSaveBtn();
        await masterpage.verifyToastMessage('Missing: Depot Name.');
    })
    await test.step('As an Admin user, I should not be able to create depot without selecting Region.',async()=>{
        await masterpage.clickCancelBtn();
        await masterpage.clickAddNewBtn();
        await masterpage.fillDepotFields({...testdata});
        await masterpage.clickSaveBtn();
        await masterpage.verifyToastMessage('Missing: Region.');
    })
    await test.step('As an Admin user, I should not be able to create depot with invalid Pin Code.',async()=>{
        await masterpage.clickCancelBtn();
        await masterpage.clickAddNewBtn();
        await masterpage.fillDepotFields({...testdata,pinCode:'7878'});
        await masterpage.selectRegion();
        await masterpage.clickSaveBtn();
        await masterpage.verifyToastMessage('Pin Code: Must be 6 digits, cannot start with 0');
    })
    await test.step('As an Admin user, I should not be able to create depot with invalid Email ID.',async()=>{
        await masterpage.clickCancelBtn();
        await masterpage.clickAddNewBtn();
        await masterpage.fillDepotFields({...testdata,emailID:'7878'});
        await masterpage.selectRegion();
        await masterpage.clickSaveBtn();
        await masterpage.verifyToastMessage('Email: Invalid email');
    })
    await test.step('As an Admin user, I should not be able to create depot with invalid Phone Number.',async()=>{
        await masterpage.clickCancelBtn();
        await masterpage.clickAddNewBtn();
        await masterpage.fillDepotFields({...testdata,phoneNumber:'7878'});
        await masterpage.selectRegion();
        await masterpage.clickSaveBtn();
        await masterpage.verifyToastMessage('Phone: 10 digits');
    })
     await test.step('As an Admin user, system should display validation message for blank mandatory fields.',async()=>{
        await masterpage.clickCancelBtn();
        await masterpage.clickAddNewBtn();
        const data={}
        await masterpage.fillDepotFields(data);
        await masterpage.clickSaveBtn();
        await masterpage.verifyToastMessage('Missing: Depot Code, Depot Name, Region, Address, City, State, Pin Code, Contact, Phone, Email.');
    })
})

test('As an Admin user, I should not be able to delete depot linked with active Shipment or Trip.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await masterpage.selectDiffrentTab('depot_tab');
    const depotcode='1015';
    await masterpage.clickTableDeleteBtn(depotcode);
    await masterpage.clickDeleteBtn();
    await masterpage.verifyToastMessage('Cannot delete Depot: It is currently referenced as source or destination in Route SANKRAIL-AGARTALA.');
});

test('As an Admin user, I should be able to search depot using search box.',async({loginAs,masterpage})=>{
    await loginAs("admin")
    await masterpage.selectDiffrentTab('depot_tab');
    const depotcode='1015'
    const row=await masterpage.getSearchResult(depotcode);
    await expect(row).toBeVisible();
});

test('Create a new customer with all mandatory fields', async ({ loginAs, masterpage }) => {
    await loginAs("admin");
    const testdata = { ...customerdata.validData1() };
    const customer_code = testdata.customerCode;
    let newcustomer_name='Pune N'
    await test.step('As an Admin user, I should be able to create a new customer with all mandatory fields.',async()=>{
        await masterpage.createDepot(testdata)
    })
})


