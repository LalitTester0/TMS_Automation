import {Page,Locator, expect} from '@playwright/test';
import { Menu } from '../components/menu';
import { BasePage } from './BasePage';


export class MasterDataPage extends BasePage{
readonly page: Page;
readonly menu:Menu

//locators
readonly addnewBtn:Locator;
readonly company_code:Locator;
readonly company_name:Locator;
readonly plant_code:Locator;
readonly plant_name:Locator;
readonly address:Locator;
readonly city:Locator;
readonly state:Locator;
readonly pin_code:Locator;
readonly saveBtn:Locator
readonly export_excel:Locator;
readonly bulk_upload:Locator;
readonly cancelBtn:Locator;
readonly depot_tab:Locator;
readonly depot_code:Locator;
readonly depot_Name:Locator;
readonly region:Locator
readonly contact_person:Locator;
readonly phone_number:Locator;
readonly email_id:Locator;
readonly customers_tab:Locator;
readonly customer_code:Locator;
readonly customer_name:Locator;
readonly customer_type:Locator;
readonly channel:Locator;
readonly sales_zone:Locator;
readonly logistics_region:Locator;
readonly sales_area:Locator;
readonly dist_contact_name:Locator;
readonly dist_contact_phone:Locator;
readonly editBtn:Locator;
readonly updateBtn:Locator;
readonly status:Locator;
readonly searchBox:Locator;
readonly deleteBtn:Locator;
readonly confirmationMsg:Locator;
readonly regionValue:Locator;
readonly dist_contact_email:Locator;
readonly sku_Code: Locator;
readonly sku_Name: Locator;
readonly brand: Locator;
readonly description: Locator;
readonly category:Locator;
readonly price: Locator;
readonly case_pack: Locator;
readonly weight: Locator;
readonly volume: Locator;
readonly shelf_Life: Locator;
readonly length: Locator;
readonly width: Locator;
readonly height: Locator;
readonly sku_tab:Locator



constructor(page:Page){
super(page);
this.page=page;
this.menu=new Menu(page);
this.addnewBtn=page.getByRole('button',{name:"Add New"});
this.company_code=page.getByRole('textbox', { name: 'Company Code'});
this.company_name=page.getByRole('textbox', { name: 'Company Name'});
this.plant_code=page.getByRole('textbox', { name: 'Plant Code'});
this.plant_name=page.getByRole('textbox', { name: 'Plant Name'});
this.address=page.getByRole('textbox', { name: 'Address'});
this.city=page.getByRole('textbox', { name: 'City'});
this.state=page.getByRole('textbox', { name: 'State'});
this.pin_code=page.getByRole('textbox', { name: 'Pin Code'});
this.saveBtn=page.locator('button:has-text("Save")');
this.export_excel= page.getByRole('button', { name: 'Export Excel' });
this.bulk_upload= page.getByRole('button', { name: 'Bulk Upload' });
this.cancelBtn= page.getByRole('button', { name: 'Cancel' });
this.depot_tab= page.getByText('Depots');
this.depot_code= page.getByRole('textbox', { name: 'Depot Code' });
this.depot_Name= page.getByRole('textbox', { name: 'Depot Name' });
this.region= page.getByRole('combobox', { name: 'Region' });
this.contact_person= page.getByRole('textbox', { name: 'Contact Person' });
this.phone_number= page.getByRole('textbox', { name: 'Phone Number' });
this.email_id= page.getByRole('textbox', { name: 'Email ID' });
this.customers_tab=  page.getByText('Customers');
this.customer_code=  page.getByRole('textbox', { name: 'Customer Code' });
this.customer_name=  page.getByRole('textbox', { name: 'Customer Name' });
this.customer_type=  page.getByRole('combobox', { name: 'Customer Type' });
this.channel=  page.getByRole('combobox', { name: 'Channel' });
this.sales_zone=  page.getByRole('combobox', { name: 'Sales Zone' });
this.logistics_region=  page.getByRole('combobox', { name: 'Logistics Region' });
this.sales_area=  page.getByRole('textbox', { name: 'Sales Area' });
this.dist_contact_name=  page.locator('#contact');
this.dist_contact_phone=  page.locator('#phone');
this.dist_contact_email= page.locator('#email');
this.editBtn= page.getByRole('button', { name: 'Edit' });
this.updateBtn= page.getByRole('button').filter({hasText:"Update"});
this.status= page.locator('.ant-switch-inner' );
this.searchBox= page.locator('.ant-input')
this.deleteBtn=page.locator('.ant-modal-content').getByRole('button', { name: 'Delete' })
this.confirmationMsg= page.getByRole('heading', { name: 'Confirm Deletion' });
this.regionValue=page.locator('.ant-select-item-option-content').filter({hasText:"North"})
this.sku_tab=  page.getByText('SKUs');
 this.sku_Code = page.getByRole('textbox', { name: 'SKU Code' });
this.sku_Name = page.getByRole('textbox', { name: 'SKU Name' });
this.brand =page.getByRole('textbox', { name: 'Brand' });
this.description = page.getByRole('textbox', { name: 'Description' });
this.price = page.getByPlaceholder('Price');
this.case_pack = page.getByPlaceholder('Case Pack');
this.weight = page.getByPlaceholder('kg');
this.shelf_Life = page.getByPlaceholder('Days');
this.length = page.locator('#length_cm');
this.width = page.locator('#width_cm');
this.height = page.locator('#height_cm');
this.category=page.getByRole('textbox', { name: 'General Category' });
this.volume= page.locator('#case_volume_cft');
}

async getSearchResult(plantcode=''){
  await this.searchBox.fill('plantcode');
  return this.getMasterTableRow(plantcode);

}

async openMasterDataPage(){
    await this.menu.clickMasterData();
}
async selectDiffrentTab(locatorName: string){
  await this.openMasterDataPage();
  const targetLocator = (this as any)[locatorName];
  await targetLocator.click();
}
async updatestatus(){
    await this.clickEditBtn()
    await this.status.click();
    await this.clickupdateBtn();
}

async clickAddNewBtn(){
    await this.addnewBtn.click();
}
async clickEditBtn(){
    await this.editBtn.click();
}
async clickupdateBtn(){
    await this.updateBtn.click();
}
async clickCancelBtn(){
    await this.cancelBtn.click();
}
async clickDeleteBtn(){
    await this.deleteBtn.click();
}
async getConfirmationmsg(){
    return this.confirmationMsg
}
async clickSaveBtn(){
    await this.saveBtn.click();
}
async clickViewBtn(plantcode=''){
  const row=await this.getMasterTableRow(plantcode);
  row.getByRole('button').first().click();
}
async clickTableDeleteBtn(plantcode=''){
  const row=await this.getMasterTableRow(plantcode);
  row.getByRole('button').last().click();
}

async updateFieldByName(locatorName: string, dataToInput: string) {
  await this.clickEditBtn();
  const targetLocator = (this as any)[locatorName];
  await targetLocator.fill(dataToInput);
  await this.clickupdateBtn();
}

async getMasterTableRow(mastercode=''){
  await this.page.waitForLoadState('networkidle')
  return this.page.locator('tr').filter({hasText:mastercode});
}

async getColumnCellData(mastercode='',index=0){
    const row=await this.getMasterTableRow(mastercode);
    return await row.locator('td').nth(index).innerText();
}

async getstatusvalue(mastercode='',index=0){
    const row=await this.getMasterTableRow(mastercode);
    const status= row.locator('td').nth(index).locator('div');
    await this.page.waitForTimeout(1000)
    return await status.getAttribute('title');
}


get plantFieldMap(): { [key: string]: Locator } {
    return {
      companyCode: this.company_code,
      companyName: this.company_name,
      plantCode: this.plant_code,
      plantName: this.plant_name,
      address: this.address,
      city: this.city,
      state: this.state,
      pinCode: this.pin_code
    };
  }

async fillPlantFields(data: { [key: string]: string }) {
    const fieldMap = this.plantFieldMap;

    for (const key in data) {
      if (fieldMap[key]) {
        await fieldMap[key].fill(data[key]);
      }
    }
}

async createPlant(data: { [key: string]: string }){
    await this.waitfornetworkstable();
    await this.openMasterDataPage();
    await this.clickAddNewBtn();
    await this.fillPlantFields(data);
    await this.clickSaveBtn();
}

get depotFieldMap(): { [key: string]: Locator } {
    return {
      depotCode: this.depot_code,
      depotName: this.depot_Name,
      address: this.address,
      city: this.city,
      state: this.state,
      pinCode: this.pin_code,
      contactPerson:this.contact_person,
      phoneNumber:this.phone_number,
      emailID:this.email_id
    };
  }

async fillDepotFields(data: { [key: string]: string }) {
    const fieldMap = this.depotFieldMap;
    for (const key in data) {
      if (fieldMap[key]) {
        await fieldMap[key].fill(data[key]);
      }
    }
}

async selectRegion(){
  await this.region.click();
  await this.regionValue.click();
}

async createDepot(data: { [key: string]: string }){
    await this.waitfornetworkstable();
    await this.selectDiffrentTab('depot_tab');
    await this.clickAddNewBtn();
    await this.fillDepotFields(data);
    await this.selectRegion();
    await this.clickSaveBtn();
}

get customerFieldMap(): { [key: string]: Locator } {
    return {
      customerCode: this.customer_code,
      customerName: this.customer_name,
      salesArea: this.sales_area,
      address:this.address,
      city:this.city,
      state: this.state,
      pinCode: this.pin_code,
      contactPerson:this.dist_contact_name,
      phoneNumber:this.dist_contact_phone,
      emailID:this.dist_contact_email     
    };
  }

async fillCustomerFields(data: { [key: string]: string }) {
    const fieldMap = this.customerFieldMap;
    for (const key in data) {
      if (fieldMap[key]) {
        await fieldMap[key].fill(data[key]);
      }
    }
}

async selectlogisticsRegion(){
  await this.region.click();
  await this.regionValue.click();
}

async selectDiffrentdropdown(locatorName: string,value:string){
  const targetLocator = (this as any)[locatorName];
  await targetLocator.click();
  await this.page.locator(`div [title="${value}"]`).click();
}

async createCustomer(data: { [key: string]: string }){
    await this.waitfornetworkstable();
    await this.selectDiffrentTab('customers_tab');
    await this.clickAddNewBtn();
    await this.fillCustomerFields(data);
}


  get skuFieldMap(): { [key: string]: Locator } {
    return {
      sku_Code: this.sku_Code,
      sku_Name: this.sku_Name,
      brand: this.brand,
      category:this.category,
      description: this.description,
      price: this.price,
      case_pack: this.case_pack,
      weight: this.weight,
      shelf_Life: this.shelf_Life,
      length: this.length,
      width: this.width,
      height: this.height
    };
  }

  async fillskuFields(data: { [key: string]: string }) {
    const fieldMap = this.skuFieldMap;
    for (const key in data) {
      if (fieldMap[key]) {
        await fieldMap[key].fill(data[key]);
      }
    }
  }

  async createSKU(data: { [key: string]: string }) {
    await this.waitfornetworkstable();
    await this.selectDiffrentTab('sku_tab');
    await this.clickAddNewBtn();
    await this.fillskuFields(data);
  }








}








