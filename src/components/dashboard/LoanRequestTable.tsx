// components/RequestTables.tsx
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const LoanRequestTables = () => {
  const minRows = 8; // Minimum number of rows to fill table

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
    type: '',
    amount: '',
    guarantor: '',
    reason: '',
    status: 'Pending',
  });

  // State for Expense dialog
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const [expenseFormData, setExpenseFormData] = useState({
    type: '',
    voucher: '',
    amount: '',
    reason: '',
    status: 'Pending',
  });

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
    // Add the form data to loanRows
    setLoanRows([...loanRows, loanFormData]);
    handleCloseLoanDialog();
  };

  // Function to handle Expense form submission
  const handleExpenseFormSubmit = () => {
    // Add the form data to expenseRows
    setExpenseRows([...expenseRows, expenseFormData]);
    handleCloseExpenseDialog();
  };

  // Function to handle Loan form input change
  const handleLoanInputChange = (e) => {
    const { name, value } = e.target;
    setLoanFormData({
      ...loanFormData,
      [name]: value,
    });
  };

  // Function to handle Expense form input change
  const handleExpenseInputChange = (e:any) => {
    const { name, value } = e.target;
    setExpenseFormData({
      ...expenseFormData,
      [name]: value,
    });
  };

  // Function to add empty rows if not enough data is present
  const fillEmptyRows = (rows, columns) => {
    const emptyRow = columns.reduce((acc, column) => {
      acc[column.name] = '';
      return acc;
    }, {});

    const filledRows = [...rows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  const displayedLoanRows = fillEmptyRows(loanRows, loanColumns);
  const displayedExpenseRows = fillEmptyRows(expenseRows, expenseColumns);

  // Custom Table Header Cell component to set background color
  const CustomTableHeaderCell = (props:any) => (
    <TableHeaderRow.Cell
      {...props}
      style={{
        ...props.style,
        backgroundColor: '#f3e8ff',
        color: '#000',
        fontWeight: 'medium',
        borderRight: '1px solid #ccc',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
    />
  );

  // Custom Table Cell component to add vertical lines between cells
  const CustomTableCell = (props:any) => (
    <Table.Cell
      {...props}
      style={{
        ...props.style,
        borderRight: '1px solid #ccc',
        textAlign: 'center',
        fontSize: '0.875rem', // Smaller font size
      }}
    />
  );

  return (
    <div>
      {/* Loan Request Table */}
      <div className="bg-white shadow-md rounded-md mb-16 p-4">
        <h3 className="text-lg text-left font-semibold py-2 text-center">Loan Request</h3>
        <Box
          sx={{
            height: 200,
            overflowY: 'auto',
            border: '1px solid #ddd',
          }}
        >
          <Grid rows={displayedLoanRows} columns={loanColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button
          variant="contained"
          color="warning"
          sx={{ mt: 2, float: 'right', mr: 1, color: 'black' }}
          onClick={handleOpenLoanDialog}
        >
          Request
        </Button>
      </div>

      {/* Expense Request Table */}
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="text-lg text-left font-semibold py-2 text-center">Expense Request</h3>
        <Box
          sx={{
            height: 200,
            overflowY: 'auto',
            border: '1px solid #ddd',
          }}
        >
          <Grid rows={displayedExpenseRows} columns={expenseColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button
          variant="contained"
          color="warning"
          sx={{ mt: 2, float: 'right', mr: 1, color: 'black' }}
          onClick={handleOpenExpenseDialog}
        >
          Request
        </Button>
      </div>

      {/* Loan Request Dialog */}
      <Dialog open={openLoanDialog} onClose={handleCloseLoanDialog}>
        <DialogTitle>New Loan Request</DialogTitle>
        <DialogContent>
          <TextField className='my-4' label="Type" name="type" fullWidth value={loanFormData.type} onChange={handleLoanInputChange} />
          <TextField className='my-4' label="Amount" name="amount" fullWidth value={loanFormData.amount} onChange={handleLoanInputChange} />
          <TextField className='my-4' label="Guarantor" name="guarantor" fullWidth value={loanFormData.guarantor} onChange={handleLoanInputChange} />
          <TextField className='my-4' label="Reason" name="reason" fullWidth value={loanFormData.reason} onChange={handleLoanInputChange} />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoanDialog} color="primary">Cancel</Button>
          <Button onClick={handleLoanFormSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Expense Request Dialog */}
      <Dialog open={openExpenseDialog} onClose={handleCloseExpenseDialog}>
        <DialogTitle>New Expense Request</DialogTitle>
        <DialogContent>
          <TextField className='my-4' label="Type" name="type" fullWidth value={expenseFormData.type} onChange={handleExpenseInputChange} />
          <TextField className='my-4' label="Voucher" name="voucher" fullWidth value={expenseFormData.voucher} onChange={handleExpenseInputChange} />
          <TextField className='my-4' label="Amount" name="amount" fullWidth value={expenseFormData.amount} onChange={handleExpenseInputChange} />
          <TextField className='my-4' label="Reason" name="reason" fullWidth value={expenseFormData.reason} onChange={handleExpenseInputChange} />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExpenseDialog} color="primary">Cancel</Button>
          <Button onClick={handleExpenseFormSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoanRequestTables;
