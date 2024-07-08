 
import { fetchData, fetchEmployeeData, saveEmployeeData  } from './api';

  export const getEmployeeCompany =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData('SysCompanyMast');
  
    // Filter the data if needed
 
    const formattedData  = rawData.map((item: any) => ({
      value: String(item.compId),
      label: item.companyName,
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee data:', error);
    return [];
  }
  };

 


  export const getEmployeeReligion =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`ReligionMaster/All`);
  
    // Filter the data if needed
    const formattedData  = rawData.map((item: any) => ({
      value: item.religionCode,
      label: item.religionName,
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee religion data:', error);
    return [];
  }
  };


  export const getEmployeeStatus =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`SysConsType/TypeGroup?typegroup=empstatus`);
  
    // Filter the data if needed
    const formattedData  = rawData.map((item: any) => ({
      value: item.typeCode,
      label: item.typeName,
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };

    export const getEmployeeList =async ():Promise<{}[]>   => {
    try {
    const rawData = await fetchEmployeeData(`EmployeeMaster`);

 
    return rawData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };

  export const getEmployeeDepartments =async ():Promise<{ value: string; label: string,compid:string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`DepartmentMaster`);
 
    // Filter the data if needed
    const formattedData  = rawData.map((item: any) => ({
      value: item.deptCode,
      label: item.deptName,
      compid:item.deptCompID
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };

  export const getEmployeeDesignations =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`DesignationMaster`);
 
    // Filter the data if needed
    const formattedData  = rawData.map((item: any) => ({
      value: item.desgCode,
      label: item.desgName,
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };
  

  export const getEmployeeworklocations =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`EmpWorkLocationMaster`);
 
    // Filter the data if needed
    const formattedData  = rawData.map((item: any) => ({
      value: item.wLocCode,
      label: item.wLocName,
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };
  export const getEmployeeworksections =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`EmpSectionMaster`);
 
    // Filter the data if needed
    const formattedData  = rawData.map((item: any) => ({
      value: item.secCode,
      label: item.secName,
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };


  export const getNationalities =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`NationalityMaster/All`);
      console.log('getNationalities',rawData)
    // Filter the data if needed
    const formattedData  = rawData.map((item: any) => ({
      value: item.nationalityCode,
      label: item.nationalityName,
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };

  
  export const getEmployeeReportingTo =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`EmployeeMaster/ReportingTo`);
 
    // Filter the data if needed
    const formattedData  = rawData.map((item: any) => ({
      value: item.empCode,
      label: item.empName,
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };
  
  export const saveEmployeeMaster = async(value:FormData)=>{
    try {
   
      const rawData = await saveEmployeeData("EmployeeMaster",value);
   
      // Filter the data if needed
      
      return rawData 
  } catch (error) {
      console.error('Error updating employee master data:', error);
      return [];
    }
  }

  interface updateEmployeeMasterProps {
    value:FormData
    code: string | { code: string };
  }
  export const updateEmployeeMaster = async(value:FormData,code:string | { code: string })=>{
    try {
    
      //const rawData = await updateEmployeeData(`EmployeeMaster?code=${code}`,value);
   
      // Filter the data if needed
 
    
      //return rawData 
  } catch (error) {
      console.error('Error updating employee master data:', error);
      return [];
    }
  }

  

  export const  getEmployeeMasterData=async (code : string)=>{
    try{
        const response=  fetchEmployeeData(`EmployeeMaster/code?code=${code}`);
        // console.log('response',response)
 
        return response
  
      } catch (error) {
        console.error('Error updating employee master data:', error);
        return [];
      }
  }

  export const getSysDocs =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`sysDocs/All`);
 
    // Filter the data if needed
    const formattedData  = rawData.map((item: any) => ({
      value: item.code,
      label: item.name,
    }));
  
    return formattedData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };