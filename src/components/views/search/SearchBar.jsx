import React, { useEffect, useState } from "react";
import apiService from '../../axios/api-service'
import { Link , useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';

export default function SearchBar(props) {
    const [search, setSearch] = useState(props.search);
    const [location, setLocation] = useState(props.location);

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

      const routeChange = () =>{ 
          console.log("pushing update")
        //   props.update();
    let path = `../search/${search}/${location}`; 
    navigate(path);
  }


  

  return (
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
                  <Button onClick={routeChange} className="inline-flex items-center justify-center w-full h-full px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 lg:w-64">SEARCH</Button>
              </div>
          </form>
      </div>
  
  </section>
  )
}
