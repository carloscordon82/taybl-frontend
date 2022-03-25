import React, { useEffect, useState } from "react";
import apiService from '../../axios/api-service'
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";


export default function Suggestions() {
    const [restaurants, setRestaurants] = useState([]);

    let navigate = useNavigate(); 
    const routeChange = (path) =>{ 

  navigate(path);
}

    useEffect(() => {
    apiService.restaurants().then((status) => {
      if (status.success) {
        console.log("restaurants",status.restaurants)
        setRestaurants(status.restaurants);
      }
     });
  }, []);

//   return (
// <section className="bg-white">
//     <div className="px-8 py-10 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full sm:px-12 md:px-16 lg:py-20 sm:py-16">
//         <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3">
//             {restaurants.map((restaurant,i)=>{
//                 return (
//                     <div key={i} className="relative">
//                 <a href="#_" className="block overflow-hidden group rounded-xl">
//                     <img src={restaurant.headerImage} className="object-cover w-full h-56 transition-all duration-300 ease-out sm:h-64 group-hover:scale-110" alt=""/>
//                 </a>
//                 <div className="relative mt-5">
//                     <p className="uppercase font-semibold text-xs mb-2.5 text-purple-600">July 20th 2021</p>
//                     <Link to={`/restaurants/`+restaurant._id}>
//                       <div className="block mb-3 hover:underline">
//                         <h2 className="text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-700">{restaurant.name}</h2>
//                       </div>
//                       </Link>
//                     <p className="mb-4 text-gray-700">{restaurant.cuisines.join(", ")}</p>
//                     <a href="#_" className="font-medium underline">Make Reservation</a>
//                 </div>
//             </div>
//                 )
//             })}
//         </div>
//     </div>
// </section>
//   )

return (
  <section className="bg-white">
      <div className="px-8 py-10 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full sm:px-12 md:px-16 lg:py-5 sm:py-16">
          <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant,i)=>{
                  return (
                      <div key={i} className="relative">
                      <Link to={`/restaurants/`+restaurant.location_id}>

                  <a className="block overflow-hidden group rounded-xl">
                      <img src={restaurant.photo.images.medium.url} className="object-cover w-full h-56 transition-all duration-300 ease-out sm:h-64 group-hover:scale-110" alt=""/>
                  </a>
                  </Link>

                  <div className="relative mt-5">
                      <p className="uppercase font-semibold text-xs mb-2.5 text-purple-600">July 20th 2021</p>
                      <Link to={`/restaurants/`+restaurant.location_id}>
                        <div className="block mb-3 hover:underline">
                          <h2 className="text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-700">{restaurant.name}</h2>
                        </div>
                        </Link>
                      {/* <p className="mb-4 text-gray-700">{restaurant.cuisines.join(", ")}</p> */}
                      <Link to={`/restaurants/`+restaurant.location_id}>
                      <a className="font-medium underline">Make Reservation</a>
                      </Link>
                      {/* ../restaurants/${restaurant.location_id} */}
                  </div>
              </div>
                  )
              })}
          </div>
      </div>
  </section>
    )


}
