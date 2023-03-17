import * as React from 'react'
import { Modal, Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import OrdersModal from './OrdersModal'

const rows = [
  {
    id: 1,
    idUser: 2,
    fullNameUser: 'Usuario inventado 456',
    totalAmount: '123123',
    totalItems: '4',
    status: 'pending',
  },
  {
    id: 2,
    idUser: 1,
    fullNameUser: 'Usuario inventado 123',
    totalAmount: '32203',
    totalItems: '3',
    status: 'confirm',
  },
  {
    id: 3,
    idUser: 2,
    fullNameUser: 'Usuario inventado 456',
    totalAmount: '12323',
    totalItems: '1',
    status: 'cancel',
  },
  {
    id: 4,
    idUser: 3,
    fullNameUser: 'Usuario inventado 789',
    totalAmount: '45678',
    totalItems: '5',
    status: 'confirm',
  },
]
const columns = [
  { id: 'id', label: 'ID', minWidth: 10 },
  { id: 'idUser', label: 'idUser', minWidth: 10 },
  { id: 'fullNameUser', label: 'Full Name User', minWidth: 100 },
  {
    id: 'totalAmount',
    label: 'Total Amount',
    minWidth: 20,
  },
  {
    id: 'totalItems',
    label: 'Total Items',
    minWidth: 20,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 10,
  },
]

export default function OrdersTable() {
  const [selectedRow, setSelectedRow] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(20)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [open, setOpen] = React.useState(false)

  const handleOpen = (e, row) => {
    setSelectedRow(row)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      onClick={e => handleOpen(e, row)}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map(column => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
          }}
        >
          <OrdersModal row={selectedRow} />
        </Box>
      </Modal>
    </>
  )
}
