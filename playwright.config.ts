import { PlaywrightTestConfig } from '@playwright/test';


const config:PlaywrightTestConfig = {
 testDir:'./tests',


  use:{
    headless:true,
    screenshot:'on',
    video:"on-first-retry"
  },
  retries:0,
  reporter:[["dot"],["json",{
    outputFile: "jsonReports/jsonreport.json"
  }],["html",{
    open:"never"
  }]]


}

export default config;