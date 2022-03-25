import React from 'react'
import SearchBar from './SearchBar';
import { useParams } from "react-router-dom";
import Results from './Results';

export default function Search() {
  const  params  = useParams();
  const [search, setSearch] = React.useState(params.search);
  const [location, setLocation] = React.useState(params.location);
  React.useEffect(() => {
   
      
 console.log("refresh searchbar")
  
  }, [search]);

const update = () =>{
  console.log("receive update")
  setSearch("")
  setLocation("")
  setSearch(params.search)
  setLocation(params.location)
}


  console.log("SEARCHhhh",search)
  return (
    <div>
    {/* <SearchBar search={search} location={location} update={update}/> */}
    <Results search={search} location={location}/>
    </div>
  )
}
