import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";

export default function CreateJob() {
  const [open, setOpen] = React.useState(false);
  const [Position, setPosition]= React.useState('');
  const [Description,setDescription]=React.useState('');
  const [Report,setReport] = React.useState(0); // all new job posting start at 0

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handlePublish = () => {

    //Removed the ID, since it is assigned automatically by the db,
    const createdAt = new Date().toISOString;

    Axios.post('/create-job', {Position,Description,Report, createdAt})
    .then(response => {
    if(response.status===200){
      handleClose();
    } else{
      throw new Error('Failed to create job posting: ${response.statusText');
    }
  })
  .catch(error => {
    console.error('Error creating job posting', error);
  });
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Posting
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Job Posting</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Position"
            type="name"
            fullWidth
            variant="standard"
            value= {Position}
            onChange={(event) => setPosition(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Des"
            label="Description"
            type="Des"
            fullWidth
            variant="standard"
            value= {Description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePublish}>Publish</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}