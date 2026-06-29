import { DepotFormData, PlantFormData } from './DataStructure';

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
    plantCode: '5020',
    plantName: 'Nagpur Plant',
    address: 'XYZ Road',
    city: 'Nagpur',
    state: 'Maharashtra',
    pinCode: 'nkjnkj'
  }
};

export const depotdata = {
  validPlant1: {
    companyCode: 'CMP001',
    companyName: 'Flairminds Pvt Ltd',
    plantCode: 'PL001',
    plantName: 'Sankrail Plant',
    address: 'ABC Road',
    city: 'Howrah',
    state: 'West Bengal',
    pinCode: '711302'
  },

  validPlant2: {
    companyCode: 'CMP002',
    companyName: 'TMS Pvt Ltd',
    plantCode: 'PL002',
    plantName: 'Nagpur Plant',
    address: 'XYZ Road',
    city: 'Nagpur',
    state: 'Maharashtra',
    pinCode: '440001'
  }
};
