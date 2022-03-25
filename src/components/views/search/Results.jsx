import * as React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  Marker,
  InfoBox,
} from "@react-google-maps/api";
import { InfoWindow } from "@react-google-maps/api";
import apiService from "../../axios/api-service";
import { Link , useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import PaidIcon from '@mui/icons-material/Paid';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import gps from './gps.png'



const mapContainerStyle = {
  height: "800px",
//   width: "1800px",
};

const exampleMapStyles = [
    {
      featureType: "poi",
      elementType: "",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
  ];
  const divStyle = {
    background: "white",
    // border: "1px solid #ccc",
    padding: 5,
    margin: 5,
  };



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
 

export default function Results(props) {
  const [search, setSearch] = React.useState(props.search || "");
  const [location, setLocation] = React.useState(props.location || "");

if (search === " ") setSearch("")
if (location === " ") setLocation("")

const [cuisineName, setCuisineName] = React.useState([]);
const [priceName, setPriceName] = React.useState([]);

const [cuisines, setCuisines] = React.useState([]);
const [prices, setPrices] = React.useState([]);


const [refresh, setRefresh] = React.useState(false);
let filteredRes

const handleChangeCuisine = (event) => {
  const {
    target: { value },
  } = event;
  console.log("Cuisines",value)
  setCuisines(value)
  setRefresh(!refresh)

  setCuisineName(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};

const handleChangePrice = (event) => {
  const {
    target: { value },
  } = event;
  console.log("Cuisines",value)
  setPrices(value)
  setRefresh(!refresh)

  setPriceName(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};

const handleSearchChange = (e) => {
  e.preventDefault();
  console.log(search)
      setSearch(e.target.value);
    };

    const handleLocationChange = (e) => {
  e.preventDefault();
  console.log(location)
      setLocation(e.target.value);
    };
    let navigate = useNavigate(); 
      const routeChange = (path) =>{ 
  
    navigate(path);
  }
    const [vent, setVent] = React.useState(false);
  const [ventInfo, setVentInfo] = React.useState({});
  const [map, setMap] = React.useState(false);
  const [restaurants, setRestaurants] = React.useState({});

let filterList = () => {
setRefresh(!refresh)
}




    React.useEffect(() => {
      console.log("Looking for",search,"and",location,map)
    apiService.restaurants().then((status) => {
      if (status.success) {

        console.log(status.restaurants[0]);
         filteredRes=[...status.restaurants]
         console.log("Before all",filteredRes)

         if (search || location) {    
          
          if (search) filteredRes = filteredRes.filter(restaurant => (restaurant.cuisine.filter(e => e.name.includes(search)).length > 0) || (restaurant.name.includes(search)))          
          if (location) filteredRes = filteredRes.filter(restaurant => (restaurant.address.includes(location)))

         }

         console.log("after search",filteredRes)

          if (cuisines.length) {
          
            filteredRes = filteredRes.filter(restaurant => (restaurant.cuisine.some(e => cuisines.includes(e.name))))          
          }
          console.log("after cuisines",filteredRes)
          if (prices.length) {
            filteredRes = filteredRes.filter(restaurant => (prices.some(e => restaurant.price_level.includes(e))))     
            }

          
          

          setRestaurants(filteredRes);
          if (!filteredRes.length) {setMap(false); console.log("erasing map") } else {   setMap(true)}

        

          
        
        

        
        
      }
 
    });
  }, [refresh]);

    const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyATkgLhwNcPkVVh2yIF2FpquIsoIRduynE",
  });

  const centers = [
    {
      lat: 25.792240,
      lng: -80.134850,
    },
    {
      lat: 37.672,
      lng: -122.219,
    },
    {
      lat: 37.832,
      lng: -122.424,
    },
    {
      lat: 0,
      lng: 0,
    },
  ];

  const cuisinesList = [
"Pizza",
"Italian",
"Sea",
"Cuban"
];

const priceList = [
  "$$",
  "$$$",
  "$$$$",
  ];

 

  return isLoaded ? (<div>
<section className="relative" style={{backgroundSize: "contain", backgroundImage: "url('https://cdn.otstatic.com/cfe/7/images/dtp-desktop-efc049.png')"}}>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-30"></div>
      <div className="relative z-20 px-4 py-12 mx-auto text-center text-white max-w-7xl lg:py-12">
          <div className="flex flex-wrap text-white">
              <div className="relative w-full px-4 mx-auto text-center xl:flex-grow-0 xl:flex-shrink-0">
              </div>
          </div>
      </div>
  
      <div className="relative z-30 h-16 px-10 bg-white lg:h-16">
          <form className="flex flex-col items-center h-auto max-w-lg p-6 mx-auto space-y-3 overflow-hidden transform -translate-y-12 bg-white rounded-lg shadow-md lg:h-24 lg:max-w-6xl lg:flex-row lg:space-y-0 lg:space-x-3">
              <div className="w-full h-12 border-2 border-gray-200 rounded-lg lg:border-0 lg:w-auto lg:flex-1">
                  <input type="text" value={search} onChange={handleSearchChange} className="w-full h-full px-4 font-medium text-gray-700 rounded-lg sm:text-lg focus:bg-gray-50 focus:outline-none" placeholder="What Are You Searching For?"/>
              </div>
              <div className="w-0.5 bg-gray-100 h-10 lg:block hidden"></div>
              <div className="relative flex items-center w-full h-12 border-2 border-gray-200 rounded-lg lg:w-auto lg:border-0 lg:flex-1">
                  <input type="text" value={location} onChange={handleLocationChange} className="w-full h-full px-4 font-medium text-gray-700 rounded-lg sm:text-lg focus:bg-gray-50 focus:outline-none" placeholder="Location?"/>
                  <svg className="absolute right-0 w-6 h-6 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
             
              <div className="w-full h-full lg:w-auto">
                  <Button variant="contained" onClick={filterList} className="inline-flex items-center justify-center w-full h-full px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 lg:w-64">SEARCH</Button>
              </div>
          </form>
      </div>
  
  </section>


  <div className="flex justify-center mb-2">
  <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">    <RestaurantIcon/>   Cuisine  </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={cuisineName}
          onChange={handleChangeCuisine}
          input={<OutlinedInput label="Cuisine        Cuis" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {cuisinesList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={cuisineName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label2">    <PaidIcon/>  Price  </InputLabel>
    
        <Select
          labelId="demo-multiple-checkbox-label2"
          id="demo-multiple-checkbox"
          multiple
          value={priceName}
          onChange={handleChangePrice}
          input={<OutlinedInput label="Price    Pri   " />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {priceList.map((name) => (
            
            <MenuItem key={name} value={name}>
           
              <Checkbox checked={priceName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
            
          ))}
        </Select>
        
      </FormControl>
      </div>
   <section className="box-border relative overflow-hidden leading-7 text-gray-900 bg-white border-0 border-gray-200 border-solid">
      <div style={{ height: '800px' }} className="overflow-y-scroll relative z-10 mx-auto ">
          <div className="flex flex-col items-center justify-center text-left border-solid w-2/5 md:items-start ">
          {map ? restaurants.map((restaurant,i)=>{
    return (
            
              <div onMouseEnter={()=>{setVent(true);  setVentInfo({name:restaurant.name, price_level:restaurant.price_level, address:restaurant.address, lat:+restaurant.latitude, lng:+restaurant.longitude, img:restaurant.photo.images.medium.url,id:restaurant.location_id})} } className="pl-10 w-full flex py-5 items-center border-b border-gray-900 hover:bg-gray-100">
                    <a className="w-1/3 h-24 overflow-hidden">
                        <img className="w-full transition duration-300 ease-out transform scale-100 bg-cover hover:scale-105" src={restaurant.photo.images.medium.url}/>
                    </a>
                    <div className="w-2/3 pl-5">
                        <h2 className="relative text-2xl font-bold leading-tight text-black"><a href="#_">{restaurant.name}</a></h2>
                        {/* <p className="text-xs text-black opacity-50">{restaurant.cuisines.join(", ")}</p> */}
                        <div className="relative mt-3 text-xs text-black opacity-90">
                            <span className="mr-1 text-center font-semibold">{restaurant.address}</span>
                        </div>
                        <div className="mb-3 relative text-xs text-black opacity-90">
                            <span className="mr-1 font-semibold">Price Range: {restaurant.price_level}</span>
                        </div>
                    <div>
                        <div className="z-1000 h-full lg:w-auto">
                        <Stack spacing={2} direction="row">
                          <Button variant="contained" onClick={()=>routeChange(`../restaurants/${restaurant.location_id}`)} className="m-12 ">Make Reservation</Button>
                          {/* <Button variant="outlined" onClick={()=>routeChange(`../restaurants/${restaurant.location_id}`)} className=" ">Info</Button>     */}
                        </Stack>
                 
              </div>
              
              </div>
                    </div>
                </div>
    )
            }) : <div>No Results</div>}
          </div>
      </div>
      <div className="z-20 absolute top-0 flex right-0 h-full md:block w-3/5">
    <GoogleMap
        featureType={"poi"}
        elementType={"geometry"}
        options={{
          styles: exampleMapStyles,
        }}
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={centers[0]}
        onZoomChanged={(zoom) => console.log("FINALLY", map)}
        onClick={() => setVent(false)}
      >

      
        {vent ? (
          <InfoWindow
            options={{ pixelOffset: { width: 0, height: -30 } }}
            onCloseClick={() => setVent(false)}
            position={{lat:ventInfo.lat, lng: ventInfo.lng}}
          >
              <div style={{minWidth:"300px"}} className="flex justify-center text-center items-center">
                  
                    <div className="w-full">
                        <h2 className="relative text-2xl font-bold leading-tight text-black"><a href="#_">{ventInfo.name}</a></h2>
                        <p className="text-xs text-black opacity-50">{ventInfo.address}</p>
                        <span className="relative mt-3 text-xs text-black opacity-90">
                            <span className="mr-1 text-center font-semibold">{ventInfo.price_level}</span>
                        </span><br/>
                    
                    <div >
                        <div className="z-1000  h-full mt-2 lg:w-auto">
                        <Stack  className="justify-center" spacing={2} direction="row">
                        <Button variant="contained" onClick={()=>routeChange(`../restaurants/${ventInfo.id}`)} className="m-12 ">Make Reservation</Button>
    </Stack>
                 
              </div>
              
              </div>
                    </div>
                </div>
          </InfoWindow>
        ) : (
          <></>
        )}

{map ? restaurants.map((restaurant,i)=>{
    return (
        <Marker key={i}
          icon={
            gps
          }
          position={{lat:Number(restaurant.latitude), lng:Number(restaurant.longitude)}}
          onClick={(e) => {
              // setVentInfo({name:restaurant.name, address:restaurant.address, lat:restaurant.cords.lat, lng:restaurant.cords.lng, img:restaurant.headerImage,id:restaurant._id})
              setVentInfo({name:restaurant.name, address:restaurant.address, price_level:restaurant.price_level, lat:+restaurant.latitude, lng:+restaurant.longitude, img:restaurant.photo.images.medium.url,id:restaurant.location_id})

            setVent(true);
            console.log(vent);
          }}
        />
    )
}) : <div>No Results</div>}                 
      </GoogleMap>
      </div>
  </section>
      </div>
  ) : <></>
}
