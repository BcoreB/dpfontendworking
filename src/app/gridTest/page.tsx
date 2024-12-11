// "use client"
// import React, { useState } from "react";
// import {
//   DataGrid,
//   Column,
//   Editing,
// } from "devextreme-react/data-grid";
// import "devextreme/dist/css/dx.light.css";

// const EmployeeGrid = () => {
//   const [data, setData] = useState([]);

//   return (
//     <div style={{ padding: "20px 120px " }}>
//       <h2>Employee Grid</h2>
//       <DataGrid
//         dataSource={data}
//         keyExpr="Empcode"
//         showBorders={true}
//         onRowInserted={(e) => setData([...data, e.data])}
//         onRowUpdated={(e) => {
//           const updatedData = data.map((item) =>
//             item.Empcode === e.data.Empcode ? e.data : item
//           );
//           setData(updatedData);
//         }}
//         onRowRemoved={(e) => {
//           const filteredData = data.filter(
//             (item) => item.Empcode !== e.data.Empcode
//           );
//           setData(filteredData);
//         }}
//       >
//         <Editing
//           mode="row"
//           allowUpdating={true}
//           allowAdding={true}
//           allowDeleting={true}
//         />

//         <Column dataField="Empcode" caption="Empcode" />
//         <Column dataField="Empname" caption="Empname" />
//         <Column
//           dataField="fromdate"
//           caption="From Date"
//           dataType="date"
//           editorOptions={{
//             openOnFieldClick: true, // Opens calendar picker on field click
//             showDropDownButton: true, // Shows dropdown button for the date picker
//             onKeyDown: (e) => {
//               if (e.event.key === "ArrowDown") {
//                 e.component.open(); // Opens the date picker on DownArrow key press
//               }
//             },
//           }}
//         />
//         <Column
//           dataField="todate"
//           caption="To Date"
//           dataType="date"
//           editorOptions={{
//             openOnFieldClick: true,
//             showDropDownButton: true,
//             onKeyDown: (e) => {
//               if (e.event.key === "ArrowDown") {
//                 e.component.open();
//               }
//             },
//           }}
//         />
//         <Column dataField="remarks" caption="Remarks" />
//       </DataGrid>
//     </div>
//   );
// };

// export default EmployeeGrid;
