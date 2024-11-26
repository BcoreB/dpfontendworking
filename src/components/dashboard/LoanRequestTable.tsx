"use client"
// components/RequestTables.tsx
import React, { useState } from 'react';
import { DataGrid, Column, Paging, Scrolling } from 'devextreme-react/data-grid';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select } from '@mui/material';
import { getLanguageByEnglish } from '@/utils/languages';
import { useDirection } from '@/app/DirectionContext';
const LoanRequestTables = () => {
  // Column definitions for each table
  const loanColumns = [
    { name: 'type', title: 'Type' },
    { name: 'amount', title: 'Amount' },
    { name: 'guarantor', title: 'Guarantor' },
    { name: 'reason', title: 'Reason' },
    { name: 'status', title: 'Status' },
  ];

  const expenseColumns = [
    { name: 'type', title: 'Type' },
    { name: 'voucher', title: 'Voucher' },
    { name: 'amount', title: 'Amount' },
    { name: 'reason', title: 'Reason' },
    { name: 'status', title: 'Status' },
  ];

  // Initial rows data (you can populate this with real data)
  const [loanRows, setLoanRows] = useState([]);
  const [expenseRows, setExpenseRows] = useState([]);

  // State for Loan dialog
  const [openLoanDialog, setOpenLoanDialog] = useState(false);
  const [loanFormData, setLoanFormData] = useState({
    type: 'Personal Loan',
    amount: '',
    guarantor: '',
    reason: '',
    status: 'Pending',
  });

  // State for Expense dialog
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const [expenseFormData, setExpenseFormData] = useState({
    type: 'Travel',
    voucher: '',
    amount: '',
    reason: '',
    status: 'Pending',
  });

  const typeOptions = ['Personal Loan', 'Car Loan', 'Home Loan']; // Options for Loan Request
  const expenseTypeOptions = ['Travel', 'Office Supplies', 'Meals']; // Options for Expense Request

  // Function to open Loan dialog
  const handleOpenLoanDialog = () => {
    setOpenLoanDialog(true);
  };

  // Function to close Loan dialog
  const handleCloseLoanDialog = () => {
    setOpenLoanDialog(false);
    setLoanFormData({
      type: '',
      amount: '',
      guarantor: '',
      reason: '',
      status: 'Pending',
    });
  };

  // Function to open Expense dialog
  const handleOpenExpenseDialog = () => {
    setOpenExpenseDialog(true);
  };

  // Function to close Expense dialog
  const handleCloseExpenseDialog = () => {
    setOpenExpenseDialog(false);
    setExpenseFormData({
      type: '',
      voucher: '',
      amount: '',
      reason: '',
      status: 'Pending',
    });
  };

  // Function to handle Loan form submission
  const handleLoanFormSubmit = () => {
    setLoanRows([...loanRows, loanFormData]);
    handleCloseLoanDialog();
  };

  // Function to handle Expense form submission
  const handleExpenseFormSubmit = () => {
    setExpenseRows([...expenseRows, expenseFormData]);
    handleCloseExpenseDialog();
  };

  // Function to handle Loan form input change
  const handleLoanInputChange = (e: any) => {
    const { name, value } = e.target;
    setLoanFormData({
      ...loanFormData,
      [name]: value,
    });
  };

  // Function to handle Expense form input change
  const handleExpenseInputChange = (e: any) => {
    const { name, value } = e.target;
    setExpenseFormData({
      ...expenseFormData,
      [name]: value,
    });
  };
  const { isRtl } = useDirection();
  return (
    <div>
      {/* Loan Request Table */}
      <div className="bg-white shadow-md rounded-md mb-16 p-4 mt-20 md:mt-0">
        <h3 className="text-lg text-left font-semibold py-2 text-center">{ getLanguageByEnglish("Loan Request")}</h3>
        <Box
          sx={{
            height: 250,
            overflowY: 'auto',
            border: '1px solid #ddd',
          }}
        >
          <DataGrid
            dataSource={loanRows}
            showBorders={true}
            columnAutoWidth={true}
            height={200}
            rtlEnabled={isRtl} // Enable RTL layout for DataGrid
          >
            {loanColumns.map((col) => (
              <Column key={col.name} dataField={col.name} caption={ getLanguageByEnglish(col.title)} />
            ))}
            <Paging enabled={false} />
            <Scrolling mode="virtual" />
          </DataGrid>
        </Box>
        <Button
          variant="contained"
          color="warning"
          sx={{ mt: 2, float: 'right', mr: 1, color: 'black' }}
          onClick={handleOpenLoanDialog}
        >
          { getLanguageByEnglish('Request')}
        </Button>
      </div>

      {/* Expense Request Table */}
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="text-lg text-left font-semibold py-2 text-center">{ getLanguageByEnglish("Expense Request")}</h3>
        <Box
          sx={{
            height: 250,
            overflowY: 'auto',
            border: '1px solid #ddd',
          }}
        >
          <DataGrid
            dataSource={expenseRows}
            showBorders={true}
            columnAutoWidth={true}
            height={200}
            rtlEnabled={isRtl} // Enable RTL layout for DataGrid
          >
            {expenseColumns.map((col) => (
              <Column key={col.name} dataField={col.name} caption={ getLanguageByEnglish(col.title)} />
            ))}
            <Paging enabled={false} />
            <Scrolling mode="virtual" />
          </DataGrid>
        </Box>
        <Button
          variant="contained"
          color="warning"
          sx={{ mt: 2, float: 'right', mr: 1, color: 'black' }}
          onClick={handleOpenExpenseDialog}
        >
          { getLanguageByEnglish('Request')}
        </Button>
      </div>

      {/* Loan Request Dialog */}
      <Dialog open={openLoanDialog} onClose={handleCloseLoanDialog}>
        <DialogTitle>{ getLanguageByEnglish('New Loan Request')}</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            name="type"
            value={loanFormData.type}
            onChange={handleLoanInputChange}
            className="my-4"
          >
            {typeOptions.map((option) => (
              <MenuItem key={option} value={option}>{getLanguageByEnglish(option)}</MenuItem>
            ))}
          </Select>
          <TextField className="my-4" sx={{ marginBottom: 2 }} label={getLanguageByEnglish("Amount")} type='number' name="amount" fullWidth value={loanFormData.amount} onChange={handleLoanInputChange} />
          <TextField className="my-4" sx={{ marginBottom: 2 }} label={getLanguageByEnglish("Guarantor")} name="guarantor" fullWidth value={loanFormData.guarantor} onChange={handleLoanInputChange} />
          <TextField className="my-4" sx={{ marginBottom: 2 }} label={getLanguageByEnglish("Reason")} name="reason" fullWidth value={loanFormData.reason} onChange={handleLoanInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoanDialog} color="primary">{ getLanguageByEnglish('Cancel')}</Button>
          <Button onClick={handleLoanFormSubmit} color="primary">{ getLanguageByEnglish('Submit')}</Button>
        </DialogActions>
      </Dialog>

      {/* Expense Request Dialog */}
      <Dialog open={openExpenseDialog} onClose={handleCloseExpenseDialog}>
        <DialogTitle>{ getLanguageByEnglish('New Expense Request')}</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            name="type"
            value={expenseFormData.type}
            onChange={handleExpenseInputChange}
            className="my-4"
          >
            {expenseTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>{getLanguageByEnglish(option)}</MenuItem>
            ))}
          </Select>
          <TextField className="my-4" sx={{ marginBottom: 2 }} label={ getLanguageByEnglish("Voucher")} name="voucher" fullWidth value={expenseFormData.voucher} onChange={handleExpenseInputChange} />
          <TextField className="my-4" sx={{ marginBottom: 2 }} label={ getLanguageByEnglish("Amount")} type='number' name="amount" fullWidth value={expenseFormData.amount} onChange={handleExpenseInputChange} />
          <TextField className="my-4" sx={{ marginBottom: 2 }} label={ getLanguageByEnglish("Reason")} name="reason" fullWidth value={expenseFormData.reason} onChange={handleExpenseInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExpenseDialog} color="primary">{ getLanguageByEnglish("Cancel")}</Button>
          <Button onClick={handleExpenseFormSubmit} color="primary">{ getLanguageByEnglish("Submit")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoanRequestTables;
