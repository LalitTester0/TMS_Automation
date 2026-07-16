import { CustomerFormData, DepotFormData, PlantFormData, SKUFormData } from './DataStructure';

export const plantData = {
  validPlant1: (): PlantFormData => {
    const uniqueId = Math.floor(1000 + Math.random() * 9000);
    return {
      companyCode: `CMP${uniqueId}`,
      companyName: `Flairminds Pvt Ltd ${uniqueId}`,
      plantCode: `PL${uniqueId}`,
      plantName: `Sankrail Plant ${uniqueId}`,
      address: 'ABC Road',
      city: 'Howrah',
      state: 'West Bengal',
      pinCode: '711302'
    };
  },
  validPlant2: {
    companyCode: 'CMP002',
    companyName: 'TMS Pvt Ltd',
    plantCode: '1002',
    plantName: 'Nagpur Plant',
    address: 'XYZ Road',
    city: 'Nagpur',
    state: 'Maharashtra',
    pinCode: '412352'
  }
};

export const depotdata = {
  validPlant1: ():DepotFormData=>{
    const uniqueId=Math.floor(1000+Math.random()*9000);
    return {
    depotCode: `DEP${uniqueId}`,
    depotName: `Pune Plant ${uniqueId}`,
    address: 'ABC Road',
    city: 'Howrah',
    state: 'West Bengal',
    pinCode: '711302',
    contactPerson: "Rahul Sharma",
    phoneNumber: "9876543210",
    emailID: "rahul.sharma@example.com"
  }
},
  validPlant2: {
    depotCode: "DEP001",
    depotName: "Pune Depot",
    address: "MIDC, Chakan",
    city: "Pune",
    state: "Maharashtra",
    pinCode: "411001",
    contactPerson: "Rahul Sharma",
    phoneNumber: "9876543210",
    emailID: "rahul.sharma@example.com"
  }
};


export const customerdata = {
  validData1: ():CustomerFormData=>{
    const uniqueId=Math.floor(1000+Math.random()*9000);
    return {
    customerCode: `CUST${uniqueId}`,
    customerName: `ABC Distributors ${uniqueId}`,
	  salesArea: "West",
    address: 'ABC Road',
    city: "Pune",
    state: 'West Bengal',
    pinCode: '711302',
    contactPerson: "Rahul Sharma",
    phoneNumber: "9876543210",
    emailID: "rahul.sharma@example.com"
  }
}
};

export const skudata = {
  validData1: (): SKUFormData => {
    const uniqueId = Math.floor(1000 + Math.random() * 9000);
    return {
      sku_Code: `SKU-${uniqueId}`,
      sku_Name: `Premium Product v${uniqueId}`,
      brand: "BrandX",
      category:"General",
      description: `High-quality automated test item instance ${uniqueId}`,
      price: "499.99",
      case_pack: "12",
      weight: "1.5",
      volume: "0.05",
      shelf_Life: "365",
      length: "30",
      width: "20",
      height: "15"
    };
  }
};
