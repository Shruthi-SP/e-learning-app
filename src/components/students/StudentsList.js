import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncDeleteStudent, asyncGetAllStudents } from "../../actions/studentsAction"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dialog, DialogActions, DialogContent, IconButton, Typography, Button } from '@mui/material';
import { Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalView from "./ModalView";
import StudentEdit from "./StudentEdit";

const StudentsList = (props) => {

  const [students, setStudents] = useState([])
  const [view, setView] = useState(false)
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState('')
  const [remove, setRemove] = useState(false)
  const [obj, setObj] = useState({})

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(asyncGetAllStudents())
  }, [])

  const allStudents = useSelector(state => {
    return state.students
  })

  useEffect(() => {
    if (allStudents.length > 0) {
      setStudents(allStudents)
    }
  }, [allStudents])

  const handleView = (e, ele) => {
    view ? setId('') : setId(ele._id)
    setView(!view)
  }
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
    setRemove(!remove)
  }
  const handleClose = () => {
    setRemove(false)
    setObj({})
  }

  function createData(id, name, view, edit, remove) {
    return { id, name, view, edit, remove };
  }

  const rows = students.map(ele => {
    return createData(ele._id, ele.name, <IconButton variant="outlined" color="success" size="small" onClick={(e) => { handleView(e, ele) }} ><RemoveRedEyeOutlined /></IconButton>, <IconButton variant="outlined" color="primary" size="small" onClick={(e) => { handleEdit(e, ele) }}><Edit /></IconButton>, <IconButton variant="outlined" color="error" size="small" onClick={(e) => { handleRemove(e, ele) }}><Delete /></IconButton>)
  })
  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Typography variant='h6'>{props.heading}</Typography>
        <Table sx={{ maxWidth: 850 }}>
          <TableHead>
            <TableRow>
              <TableCell >Student Name</TableCell>
              <TableCell >View</TableCell>
              <TableCell >Update</TableCell>
              <TableCell >Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.view}</TableCell>
                <TableCell >{row.edit}</TableCell>
                <TableCell >{row.remove}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <div>
      {students.length > 0 && <>
        <h1>Students - {students.length}</h1>
        <BasicTable />
        {view && <ModalView id={id} view={view} handleView={handleView} />}
        {edit && <StudentEdit id={id} edit={edit} handleEdit={handleEdit} />}
        {remove && <Dialog open={remove} onClose={handleClose}>
          <DialogContent>Are you sure want to delete?</DialogContent>
          <DialogActions><Button onClick={(e)=>{handleYes(e, obj)}}>Yes</Button><Button onClick={handleClose}>No</Button></DialogActions>
        </Dialog>}
      </>}
    </div>
  )
}
export default StudentsList