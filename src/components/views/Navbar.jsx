import React from 'react'
import { Link , useNavigate} from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import apiService from '../axios/api-service'


export default function Navbar() {

    const [open, setOpen] = React.useState(false);
    const [openDialogue, setOpenDialogue] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);




    React.useEffect(() => {
     console.log("EFFECT NAVBAR")
      }, [openDialogue]);

    const handleLogin = () => {
      apiService.login(username,password).then((response)=>{
        console.log("INITIAL RES",response)
        if (!response.username) {
          setError(true)

        } else {
          setOpenDialogue(false);
          setOpen(true);
          setError(false)
setLoggedIn(true)
        }
      })
        
      };
 
      const handleUsername = (event) => {
        setUsername(event.target.value);
        console.log(username)
      };
      const handlePassword = (event) => {
        setPassword(event.target.value);
      };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
    setError(false)

  };
  const handleOpenDialogue = () => {
    setUsername("")
    setPassword("")
    setOpenDialogue(true);
  };

  return (
    <div class="border-b border-gray-800">


<Dialog open={openDialogue} onClose={handleCloseDialogue}>
    <DialogTitle>Login</DialogTitle>
    <DialogContent>
    {error ? <Alert severity="error">This is an error alert — check it out!</Alert> : <></>}

      <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally. <br/>
       
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Username"
        type="text"
        fullWidth
        variant="standard"
        value={username}
        onChange={handleUsername}
      />
       <TextField
        
        margin="dense"
        id="pass"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        value={password}
        onChange={handlePassword}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialogue}>Cancel</Button>
      <Button onClick={handleLogin}>Login</Button>
    </DialogActions>
  </Dialog>




            <div class="px-10 mx-auto max-w-7xl">
                <div class="relative flex items-center justify-center md:justify-between h-20 mx-auto">
                    <a  class="relative flex items-center text-xl font-bold text-black hidden md:flex">
                       Taybl
                        <span class="flex items-center justify-center h-4 px-2 ml-2 font-mono text-xs leading-none text-blue-700 bg-gray-100 rounded-full">Reservations</span>
                    </a>
                    <nav class="text-sm font-bold text-black sm:text-base">
                    <Link to={`/`}>

                        <a href="#about" class="relative inline-block px-0 pb-1 mr-2 group sm:mr-4">
                            <span>Home</span>
                            <span class="h-0.5 w-full absolute bottom-0 opacity-0 group-hover:opacity-100 transition ease-out duration-200 translate-y-1 group-hover:-translate-y-0 left-0 bg-black"></span>
                        </a>
                        </Link>
                        <Link to={`/search`}>
                        <a href="#projects" class="relative inline-block px-0 pb-1 mr-2 group sm:mr-4">
                            <span>Search</span>
                            <span class="h-0.5 w-full absolute bottom-0 opacity-0 group-hover:opacity-100 transition ease-out duration-200 translate-y-1 group-hover:-translate-y-0 left-0 bg-black"></span>
                        </a>
                        </Link>
                      
                       {loggedIn &&   <a ><a  class="relative inline-block px-0 pb-1 mr-2 group sm:mr-4">
                       <Link to={`/reservations`}>
                            <span>My Reservations</span>
                            </Link>

                            <span class="h-0.5 w-full absolute bottom-0 opacity-0 group-hover:opacity-100 transition ease-out duration-200 translate-y-1 group-hover:-translate-y-0 left-0 bg-black"></span>
                        </a> </a>}

                        {!loggedIn && <a onClick={handleOpenDialogue}> <a href="#" class="relative inline-block px-0 pb-1 mr-2 group sm:mr-4">
                            <span>Log In</span>
                            <span class="h-0.5 w-full absolute bottom-0 opacity-0 group-hover:opacity-100 transition ease-out duration-200 translate-y-1 group-hover:-translate-y-0 left-0 bg-black"></span>
                        </a></a>}

                       
                       
                       
                    </nav>
                </div>
        </div>
        </div>
  )
}
