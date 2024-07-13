// utils/api.ts

import axios from 'axios';
import GlobalConfig  from '../app.config'
import { SysLog, SysLogDetails } from '@/utils/syslog';
import { DocStaus } from '@/dptype';

 


export async function fetchData(param:string) {
  const headers = {
    'LKey':  GlobalConfig.myLKey,
    'compid': GlobalConfig.myCompID
  };
const response = await axios.get(`https://localhost:7120/api/${param}`,{headers});
return response.data;
}


export async function fetchRptData(param:string,sql: string) {
 
  const headers = {
    'LKey': '1',
    'compid': '82D04AC9-412C-446E-8437-70376830A913',
    'sqlqry': sql,
  };
const response = await axios.get(`https://localhost:7120/api/${param}`,{headers});
return response.data;
}




export async function fetchEmployeeData(param:string) {
    const headers = {
      'LKey':  GlobalConfig.myLKey,
      'compid': GlobalConfig.myCompID
    };
  const response = await axios.get(`https://localhost:7120/api/${param}`,{headers});
  return response.data;
}

export async function saveEmployeeData(param:string,data:FormData) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    
    'compid': GlobalConfig.myCompID
     
    // Add more headers if needed
  };
  console.log('saveEmployeeData1',data);
  const response = await axios.post(`https://localhost:7120/api/${param}`,data,{headers});
  return response.data;
}

export async function saveMasterData(param: string, data: any) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'lkey': GlobalConfig.myLKey,
    'compid': GlobalConfig.myCompID,
    'siteid': GlobalConfig.mySiteID,
  };

  try {
    const response = await axios.post(`https://localhost:7120/api/${param}`, data, { headers });

    if (response.status === 200) {
      const sysLogDetails = [
        new SysLogDetails(0, 0, 'Field1', 'OldValue1', 'NewValue1', 'Description1'),
        new SysLogDetails(0, 0, 'Field2', 'OldValue2', 'NewValue2', 'Description2'),
        // Add more SysLogDetails objects as needed
      ];

      const sysLog = new SysLog(
        0,
        GlobalConfig.myCompID,
        GlobalConfig.mySiteID,
        GlobalConfig.myUserID,
        DocStaus.NEW,
        10014,
        sysLogDetails,
        GlobalConfig.myTerminalID,
        '1111',
        'Log entry for successful data save',
        new Date()
      );

    

      const headers = {
        'Content-Type': 'application/json',
        'lkey': GlobalConfig.myLKey,
        'compid': GlobalConfig.myCompID,
        'siteid': GlobalConfig.mySiteID,
      };
      const json = JSON.stringify(sysLog);
      console.log('json', json);
      const sysLogResponse = await axios.post(`https://localhost:7120/api/SysLog`, json, { headers });

      if (sysLogResponse.status === 201) {
        console.log('SysLog saved successfully');
      } else {
        console.log('Failed to save SysLog. Status code:', sysLogResponse.status);
      }
    } else {
      console.log('Failed to save data. Status code:', response.status);
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

export async function updateMasterData(param:string,data:FormData) {
  const headers = {
    
    'lkey': GlobalConfig.myLKey,
    'compid': GlobalConfig.myCompID,
    'siteid': GlobalConfig.mySiteID,
    'Content-Type': 'application/json'
     
    // Add more headers if needed
  };7
  console.log('updateMasterData',data);
  try{
    const response = await axios.put(`https://localhost:7120/api/${param}`,data,{headers});
    console.log('Response:', response.data);
    return response.data;
    
  }catch (error) {
    console.error('Error:', error);
    console.log('Error:data', data);
    throw error;
  }
  
}

 



export async function fetchDataFromSQL(param:string,sql: string) {
 
  const headers = {
    'LKey': '1',
    'compid': '82D04AC9-412C-446E-8437-70376830A913',
    'sqlqry': sql,
  };
 
const response = await axios.get(`https://localhost:7120/api/${param}`,{headers});
return response.data;
}


export async function fetchDataFromSQL2(param: string, sql: string) {
  const headers = {
    'LKey': '1',
    'compid': '82D04AC9-412C-446E-8437-70376830A913',
    'Content-Type': 'application/json',
  };

  const data = {
    sqlqry: sql,
  };

  try {
    const response = await axios.post(`https://localhost:7120/api/${param}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error appropriately
    throw error;
  }
}