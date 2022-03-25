import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from '../../axios/api-service'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

 const times = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",

]

 const partySize = [
  "1 Person",
  "2 People",
  "3 People",
  "4 People",
  "5 People",
  "6 People",
  "7 People",
  "8 People",
  "9 People",
  "10 People",
  "11 People",
  "12 People",
  "13 People",
  "14 People",
  "15 People",
  "16 People",
  "17 People",
  "18 People",
  "19 People",
  "20 People",
]

const primoOptions = [
  "Balcony - $5",
  "Ocean View - $10",
  "Private Room - $15",
]

function srcset(image, size, rows = 1, cols = 1) {

    
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}


export default function RestaurantDetails() {
    const [time, setTime] = useState('');
    const [date, setDate] = React.useState(null);
    const [party, setParty] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [primoSeating, setPrimoSeating] = React.useState("");
    const [window, setWindow] = React.useState(true);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);




    const [openDialogue, setOpenDialogue] = React.useState(false);

    const handleLogin = () => {
      apiService.login(username,password).then((response)=>{
        console.log("INITIAL RES",response)
        if (!response.username) {
          setError(true)

        } else {
          setOpenDialogue(false);
          setOpen(true);
          setError(false)

        }
      })
        
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

    const handleClickOpen = () => {
      apiService.status().then((response)=>{
        if (!response.username) {
          setUsername("")
          setPassword("")
          setOpenDialogue(true);

          
        } else {
          setOpen(true);
        }
      }).catch((err)=>{

      })
      
    };
  
    const handleClose = () => {
     setPrimoSeating("")
     setOpen1(true)
     setOpen(false);
    };

    const handleNext = () => {

      setOpen1(true)
      setOpen(false);
    };

    const handleClickOpen1 = () => {
      setOpen1(true);
    };
  
    const handleClose1 = () => {
      setOpen1(false);
    };

    const handleCancel = () => {
      setOpen1(false);
      setOpen(false);
    };

    const handleUsername = (event) => {
      setUsername(event.target.value);
      console.log(username)
    };

    const handlePassword = (event) => {
      setPassword(event.target.value);
    };

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const handleChangeParty = (event) => {
    setParty(event.target.value);
  };

  const handleChangePrimo = (event) => {
    setPrimoSeating(event.target.value);
  };

    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(false);


    useEffect(() => {
    apiService.restaurant(restaurantId).then((status) => {
      if (status.success) {
        setRestaurant(status.restaurant);
      }
     });
  }, []);

  const makeReservation  = () => {
    const reservationValues = {restaurantId,time,date,party}
    apiService.makeReservation(reservationValues).then((status) => {
      console.log(status)
      setOpen1(false);
   });


  }

  return restaurant ? (
    <div>

<section>
  {/* <div class="skew skew-top mr-for-radius">
    <svg class="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
      <polygon fill="currentColor" points="0 0 10 10 0 10"></polygon>
    </svg>
  </div>
  <div class="skew skew-top ml-for-radius">
    <svg class="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
      <polygon fill="currentColor" points="0 10 10 0 10 10"></polygon>
    </svg>
  </div> */}
  <div class="py-20 bg-gray-50 radius-for-skewed">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap items-center -mx-4">
        <div class="mb-12 lg:mb-0 w-full lg:w-1/2 px-4">
          <div class="max-w-lg">
            <span class="text-blue-500 font-bold">{restaurant.address}</span>
            <h3 class="mb-3 text-4xl lg:text-5xl font-bold font-heading">{restaurant.name}</h3>
            <p class="mb-6 max-w-sm text-gray-400 leading-loose">{restaurant.cuisiness}</p>
            <ul class="text-gray-500 font-bold">
              <li class="mb-2 flex items-center">
                <svg class="mr-2 w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>Price Range: {restaurant.price_level}</span>
              </li>
              <li class="mb-2 flex items-center">
                <svg class="mr-2 w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>Cuisines: {restaurant.cuisines}</span>
              </li>
              <li class="flex items-center">
                <svg class="mr-2 w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>Contact: {restaurant.email}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full lg:w-1/2">
          <div class="mb-4 flex flex-wrap items-end">
            <div class="mb-4 lg:mb-0 w-full lg:w-2/3 px-3">
              <img class="w-full h-32 lg:h-48 object-cover rounded" src={restaurant.photo.images.medium.url} alt=""/>
            </div>
            <div class="w-full lg:w-1/3 px-3">
              <img class="w-full h-32 object-cover rounded" src="https://images.unsplash.com/photo-1521581171443-58a6b508b9ac?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
            </div>
          </div>
          <div class="flex flex-wrap items-start">
            <div class="mb-4 lg:mb-0 w-full lg:w-1/3 px-3">
              <img class="w-full h-32 object-cover rounded" src="https://images.unsplash.com/photo-1501706649056-3cb79cccec52?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=701&amp;q=80" alt=""/>
            </div>
            <div class="w-full lg:w-2/3 px-3">
              <img class="w-full h-32 lg:h-48 object-cover rounded" src="https://images.unsplash.com/photo-1489058535093-8f530d789c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>
            </div>
          </div>
        </div>

        <Box className="mt-3" sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 2, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-label">Time </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label="Age"
          onChange={handleChange}
        >
          
          {times.map((time)=>{
            return (
              <MenuItem value={time}>{time}</MenuItem>
            )
          })}                           
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 140 }}>
      <LocalizationProvider  dateAdapter={AdapterDateFns}>
      <DatePicker sx={{ m: 1 }}
        label="Date"
        value={date}
        onChange={(newValue) => {
let newDate = (new Date(newValue)).toLocaleDateString('en-US');
          console.log("DATE",newDate)
          setDate(newDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </FormControl>
    <FormControl sx={{ m: 2, minWidth: 180 ,maxHeight:200 }}>
        <InputLabel  id="party-size">Party Size </InputLabel>
        <Select
          labelId="party-size"
          id="party"
          value={party}
          label="Party Size"
          onChange={handleChangeParty}
        >
          
          {partySize.map((party)=>{
            return (
              <MenuItem value={party}>{party}</MenuItem>
            )
          })}                           
        </Select>
        
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 180 }}>
      <Button style={{maxWidth: '300px', height: '55px'}} onClick={handleClickOpen} variant="contained">Make Reservation</Button>
</FormControl>

    <div className="mt-10 ml-4">
    {/*  */}
    <span class=" text-gray-600 ">{restaurant.description}</span>
    </div>
    </Box>
    
      </div>
     
    </div>
  </div>
  

</section>

{/* POP-UP DIALOGUE FOR LOGIN */}

<Dialog open={openDialogue} onClose={handleCloseDialogue}>
    <DialogTitle>Login</DialogTitle>
    <DialogContent>
    {error ? <Alert severity="error">There was an error</Alert> : <></>}

      <DialogContentText>
        Please login to be able to make reservations. <br/>
       
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



{/* POP-UP DIALOGUE FOR PRIMO SEATING */}
<div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          {"Primo Seating"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           With Primo Seating, you get to choose the best seat in the house!<span><br/></span>
          </DialogContentText>
          <FormControl sx={{ m: 2, minWidth: 180 }}>
        <InputLabel id="primo-seating">Options </InputLabel>
        <Select
          labelId="primo-seating"
          id="primo"
          value={primoSeating}
          label="Party Size"
          onChange={handleChangePrimo}
        >
          
          {primoOptions.map((option)=>{
            return (
              <MenuItem value={option}>{option}</MenuItem>
            )
          })}                           
        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleNext} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>


{/* POP-UP DIALOGUE FOR CONFIRMATION OF RESERVATION */}

      <Dialog
        open={open1}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Restaurant: <span class="text-black font-bold">{restaurant.name}<br/></span>
           Date: <span class="text-black font-bold">{date}<br/></span>
           Time: <span class="text-black font-bold">{time}<br/></span>
           Party Size: <span class="text-black font-bold">{party}<br/></span>
           {(primoSeating && <>Primo Seating: <span class="text-black font-bold">{primoSeating}<br/></span></>)}
          </DialogContentText>
          <img class="mt-5 w-full h-32 lg:h-48 object-cover rounded" src="https://images.unsplash.com/photo-1489058535093-8f530d789c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80" alt=""/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>No</Button>
          <Button onClick={makeReservation} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>


   {/* <ImageList
      sx={{ width: "full", height: 250 , overflow: 'hidden'}}
      variant="quilted"
      cols={8}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList> */}


    </div>
  ) : <div>Loading</div>
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];