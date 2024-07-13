import { getReportData } from "@/reports/ReportUtility"
import GlobalConifg from '../app.config'
export const prepareSQL=(sql:string,fieldDataArray:any)=>{
 
  let SqlPart=''
    if(fieldDataArray)
    {
    const arraySQL: string[] = sql.replace('<SQLScript><CustomStatement>','').replace('</CustomStatement></SQLScript>','').replace(',','').replace(/\s+/g, ' ').split('&lt;End&gt;')
    SqlPart=arraySQL[0]
    const SqlParam=arraySQL[1].split(',')
    let i=0

 
    SqlParam.map((item: string) => {

      const fieldObject = fieldDataArray.find((field:any) => field.name === item.toLowerCase() );
       const value= fieldObject ? fieldObject.value : undefined;

      // const value = formData.getValues(item.toLowerCase() as "compgrpid" | "compid" | "siteid" | "fromdate" | "todate");
   
      if(value)
            SqlPart=SqlPart.replace("'{"+i.toString()+"}'", "'"+value.toString()+"'")

   
      
  
      

      i++;
 
    });
  }
  else 
  {
    SqlPart=sql
  }
    let correctSQL=SqlPart.replace(/[\r\n]/g, '');  
    //  REPLACE GLOBAL VARIABLE
     correctSQL=correctSQL.replace('{lkey}',GlobalConifg.myLKey).replace('{LKey}',GlobalConifg.myLKey)
     correctSQL=correctSQL.replace('{compid}',GlobalConifg.myCompID).replace('{CompID}',GlobalConifg.myCompID)
     correctSQL=correctSQL.replace('{siteid}',GlobalConifg.mySiteID).replace('{SiteID}',GlobalConifg.mySiteID)
      
    
    return correctSQL
  }
//   export  const fetchDataFromDatabase = async (ReportSQL: string | null,fieldDataArray:any ) => {
//   try {
//     if (!ReportSQL) {
//       console.error('ReportSQL not available.');
//       return;
//     } 
//     const Sql=prepareSQL(ReportSQL,fieldDataArray)

//     const dataFromDatabase = await getReportData(prepareSQL(ReportSQL,fieldDataArray));
//     //setRptData(dataFromDatabase);
//     return dataFromDatabase
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };


export const getIP=()=>
{
  fetch('https://geolocation-db.com/json/')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    console.log(data.IPv4)
    console.log(data.country_name)
    console.log(data.latitude)
    console.log(data.longitude)
  })
  .catch(error => console.log(error))
}