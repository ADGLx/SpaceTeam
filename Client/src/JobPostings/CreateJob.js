import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";

export default function CreateJob() {
  const [open, setOpen] = React.useState(false);
  const [Position, setPosition]= React.useState('');
  const [PositionInfo,setPositionInfo]=React.useState('');
  const [publicationStatus, setPublicationStatus]= React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handlePublish = () => {

    const EmployerID = JSON.parse(localStorage.getItem('user-token'))['ID'];
   const CompanyName = JSON.parse(localStorage.getItem('user-token'))['username'];
   const Report = false;

  // console.log(EmployerID+"|"+CompanyName+"|"+ Position+"|"+PositionInfo+"|"+Report)

    Axios.post('/api/create-job', {EmployerID, CompanyName,Position,PositionInfo,Report})
    .then(response => {
    if(response.status===200){
      
      setPublicationStatus('Job posting created successfully!');
      handleClose();
    } else{
      throw new Error(`Failed to create job posting: ${response.statusText}`);
    }
  })
  .catch(error => {
   // console.error('Error creating job posting.', error);
    setPublicationStatus('Failed to publish.');
  })
  .finally(()=>{
    setTimeout(()=>{setPublicationStatus(null);},3000);
    handleClose();
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
            value= {PositionInfo}
            onChange={(event) => setPositionInfo(event.target.value)}
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePublish}>Publish</Button>
        </DialogActions>
      </Dialog>
      {publicationStatus && <p>{publicationStatus}</p>}{/*show message if it exists */}
    </div>
  );
}