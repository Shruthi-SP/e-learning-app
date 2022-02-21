import * as React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { asyncDeleteStudent, asyncGetAllStudents } from "../../actions/studentsAction"
import StudentEdit from "./StudentEdit";
import { Dialog, DialogActions, DialogContent, IconButton, Typography, Button, Grid, TextField, InputAdornment, Tooltip } from '@mui/material';
import { Delete, Edit, RemoveRedEyeOutlined, PersonSearch, AddTaskRounded } from "@mui/icons-material";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const StudentList = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncGetAllStudents())
  }, [])

  const user = useSelector(state => {
    return state.user
  })

  const allStudents = useSelector(state => {
    return state.students
  })

  const [students, setStudents] = useState([])
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState('')
  const [remove, setRemove] = useState(false)
  const [obj, setObj] = useState({})
  const [search, setSearch] = useState('')
  const [tableData, setTableData] = useState(students)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log('state vars', edit, id, remove, obj, students.length, tableData.length)

  useEffect(() => {
    if (allStudents.length > 0) {
      setStudents(allStudents)
      setTableData(allStudents)
    } else {
      setStudents([])
      setTableData(students)
    }
  }, [allStudents])

  const handleEdit = (e, ele) => {
    edit ? setId('') : setId(ele._id)
    setEdit(!edit)
  }
  const handleRemove = (e, ele) => {
    setObj(ele)
    setRemove(!remove)
  }

  const handleYes = (e, obj) => {
    dispatch(asyncDeleteStudent(obj._id))
    setObj({})
    setRemove(false)
  }
  const handleClose = () => {
    setRemove(false)
    setObj({})
  }


  // Avoid a layout jump when reaching the last page with empty rows.
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  function createData(id, name, view, edit, remove) {
    return { id, name, view, edit, remove };
  }

  const rows = tableData.map(ele => {
    return createData(ele._id, ele.name, <Link style={{ color: 'green' }} to={`/admin/students/${ele._id}`}><RemoveRedEyeOutlined /></Link>, <IconButton variant="outlined" color="primary" size="small" onClick={(e) => { handleEdit(e, ele) }}><Edit /></IconButton>, <IconButton variant="outlined" color="error" size="small" onClick={(e) => { handleRemove(e, ele) }}><Delete /></IconButton>)
  })
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearchChange = (e) => {
    const userInput = e.target.value
    setSearch(userInput)
    const newList = students.filter(ele => ele.name.toLowerCase().includes(userInput))
    console.log('search list', newList)
    setTableData(newList)
  }

  return (
    <>
      <Grid container direction="row" sx={{ mt: 1 }}>
        <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", pt: 1 }}>
          {students.length > 0 ? <Typography component="h1" variant='h5'>Students - {students.length} </Typography> : <Typography component="h1" variant="h5" >No Students. Add Students!!</Typography>}
        </Grid>

        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link style={{ margin: '5px', fontSize: '23px', paddingTop: '3px' }} to={`/admin/create-student`}>Add Student</Link>
          <Button onClick={()=>{props.history.push(`/admin/create-student`)}}><Tooltip title="Add Course"><AddTaskRounded color="success" /></Tooltip></Button>
        </Grid>
      </Grid>
      {students.length > 0 && <>
        <TextField
          variant='filled'
          sx={{ mb: 2 }}
          size="small"
          placeholder="Search Students"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonSearch />
              </InputAdornment>
            ),
          }}
          type='search'
          name="search"
          value={search}
          onChange={handleSearchChange}
        />
        <TableContainer component={Paper}>
          <Table sx={{ mixWidth: 500 }} size='small' aria-label="custom pagination table">
            <TableHead>
              <TableRow >
                <TableCell style={{ width: '40%', fontSize: '16px' }} ><b>Student Name</b></TableCell>
                <TableCell style={{ width: '20%', fontSize: '16px' }} ><b>View</b></TableCell>
                <TableCell style={{ width: '20%', fontSize: '16px' }} ><b>Update</b></TableCell>
                <TableCell style={{ width: '20%', fontSize: '16px' }} ><b>Delete</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ fontSize: '16px' }} >{row.name}</TableCell>
                  <TableCell >{row.view}</TableCell>
                  <TableCell >{row.edit}</TableCell>
                  <TableCell >{row.remove}</TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>}
      {edit && <StudentEdit id={id} edit={edit} handleEdit={handleEdit} />}
      {remove && <Dialog open={remove} onClose={handleClose}>
        <DialogContent>Are you sure want to delete?</DialogContent>
        <DialogActions><Button onClick={(e) => { handleYes(e, obj) }}>Yes</Button><Button onClick={handleClose}>No</Button></DialogActions>
      </Dialog>}
    </>
  );
}
export default StudentList