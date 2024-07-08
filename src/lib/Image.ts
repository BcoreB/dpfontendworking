// deleteImage.ts
 
async function deleteImage(fileName:string) {
  const response = await fetch('/api/deleteImage', {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ fileName }),
  });
 
  if (!response.ok) {
     throw new Error('Failed to delete image');
  }
 
  const data = await response.json();
  console.log(data);
 }



 export const getFileNames= async (fileName:string) =>{
   if (!fileName) {
      console.log('FileName is empty');
      return []; // Return an empty array or handle as needed
   }
   try{
      const response = await fetch(`/api/getFiles?fileName=${fileName}`);
      if (!response.ok) {
         throw new Error('Failed to fetch files');
      }
      const data = await response.json();
      return data.files;
 
   }catch{

   }
}
 
// export   const getImageName = (fileName: string): string => {
//   try {
//     // Construct the absolute path to the file with known extensions/types
//     const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']; // Add more if needed
//     const absolutePath = extensions.map(ext => path.join(process.cwd(), `${fileName}${ext}`)).find(fs.existsSync);

//     // Check if the file exists
//     if (absolutePath) {
//       // Delete the file
       
//       return absolutePath;
//     } else {
//       console.error(`File not found: ${fileName}`);
//       return '';
//     }
//   } catch (error) {
//     console.error(`Error getting file: ${error}`);
//     return '';
//   }
// };
 