import React from 'react'
import apiService from '../../axios/api-service'
import Button from '@mui/material/Button';
import { Link , useNavigate} from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

export default function Reservations() {
    const [data, setData] = React.useState({});
    const [loaded,setLoaded] = React.useState(false)
    const [openDialogue, setOpenDialogue] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");
    const [error, setError] = React.useState(false);

    const [refresh, setRefresh] = React.useState(false);

    React.useEffect(() => {
        apiService.user().then((status) => {
            console.log("return",status)
          if (status.success) {
              
            setData(status.results);
            setLoaded(true)
          }
         });
      }, [refresh]);

      const deleteReservation =  () => {
apiService.deleteReservation(deleteId).then((status) => {
    console.log("return",status)
  if (status.success) {
      setOpenDialogue(false)
      setRefresh(!refresh)
  }
 });
      }

      const openDeleteDialogue = (id) => {
        console.log(id)

setDeleteId(id)
setOpenDialogue(true)
      }

      const handleCloseDialogue = () => {
          setOpenDialogue(false)
      }

  return loaded ? (
    <div>

<Dialog open={openDialogue} onClose={handleCloseDialogue}>
    <DialogTitle>Cancel Reservation</DialogTitle>
    <DialogContent>
    {error ? <Alert severity="error">There was an error</Alert> : <></>}

      <DialogContentText>
        Are you sure you want to cancel this reservation?. <br/>
       This cannot be undone.
      </DialogContentText>
      
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialogue}>No</Button>
      <Button onClick={deleteReservation} >Yes</Button>
    </DialogActions>
  </Dialog>

<section class="py-8">
  <div class="container border-black border-line px-4 mx-auto">
  <div class="mb-16 flex flex-wrap items-center">
        <div class="w-full lg:w-1/2">
          <span class="text-blue-600 font-bold">Username: {data[0].user.username}</span>
          <h3 class="text-4xl lg:text-3xl font-bold font-heading">Your Reservations</h3>
        </div>

        <Link to={`/search`} class="hidden lg:block text-right w-1/2"><a class="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-blue-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200" href="#">Make new reservation</a></Link>

      </div>
    <div class="flex flex-wrap -m-4">



    {data.map(each => 
      <div class="w-full lg:w-1/3 p-4">
        <div class="p-4 rounded">
          <div class="relative h-40 w-full mb-4">
            <img class="w-full h-full object-cover rounded" src={each.info.photo.images.medium.url} alt=""/>
            <span class="absolute top-0 right-0 py-1 px-2 mt-2 mr-2 bg-indigo-500 rounded text-xs text-white">{each.info.price_level}</span>
          </div>
          <div class="flex mb-6 justify-between items-center">
            <div>
              <h3 class="text-sm font-medium">{each.info.name}</h3>
              <span class="text-xs text-gray-500">{each.info.address}</span>
            </div>
           
          </div>
          <div class="flex mb-2 justify-between items-center">
            <h4 class="text-xs font-medium">Date</h4>
            <span class="inline-block py-1 px-2 rounded-full bg-green-50 text-xs text-green-500">{each.reservation.date}</span>
          </div>
          <div class="flex mb-2 justify-between items-center">
            <h4 class="text-xs font-medium">Time</h4>
            <span class="inline-block py-1 px-2 rounded-full bg-red-50 text-xs text-red-500">{each.reservation.time}</span>
          </div>
          <div class="flex mb-5 justify-between items-center">
            <h4 class="text-xs font-medium">Party Size</h4>
            <span class="text-xs text-indigo-500 font-medium">{each.reservation.party}</span>
          </div>
          <div class="flex items-center justify-center border-t  pt-4">
           
            <a onClick={() => openDeleteDialogue(each.reservation._id)} class="py-2 px-3 bg-red-500 hover:bg-red-600 rounded text-md text-white transition duration-200" href="#">Delete</a>
          </div>
        </div>
      </div>
    )}
      
    </div>
  </div>
</section>






    
    
    
    
    
    
    
    



    </div>

  ) : <></>
}
