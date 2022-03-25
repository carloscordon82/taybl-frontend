import React, { useEffect, useState } from "react";
import apiService from '../../axios/api-service'
import Suggestions from "./Suggestions";
import SearchBarHome from "./SearchBarHome";

export default function Home() {
    const [user, setUser] = useState();


    useEffect(() => {
    // apiService.status().then((status) => {
    //   console.log("User Status",status);
    //   if (status.success) {
    //     setUser(status.user);
    //   }
 
    // });
  }, []);


  return (
    <div>
    <SearchBarHome />
    <Suggestions />
    </div>
  )
}
