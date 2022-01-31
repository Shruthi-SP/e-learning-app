import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux"
import RegisterForm from './RegisterForm';
import { Typography } from '@mui/material';
import { asyncUpdateUser } from '../../actions/usersAction';


const ModalAdmin = (props) => {
    const { user, handleClose, open } = props
    let { academy } = user
    let { name, website } = academy
    console.log(name, website)
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(asyncUpdateUser(formData))
        //handleUpdate()
        handleClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Info</DialogTitle>
                <DialogContent>
                    <Typography variant="h5" mb={1}>Update </Typography>
                    <RegisterForm {...user} name={name} website={website} formSubmission={formSubmission} handleClose={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ModalAdmin