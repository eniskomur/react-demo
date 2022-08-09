import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
export default function Detail({type}) {
  const id = window.location.href.split("?")[1];
  const [veri,setVeri]=useState([]);

  const getData=async()=>{

   await axios.get("https://api.themoviedb.org/3/"+type+"/"+id+"?api_key=83d022f2c33f1e4497785115d76b8f33&language=en-US")
   .then((res)=>setVeri([res.data]))
   .catch((err)=>console.log(err))

  }


  useEffect(()=>{
     getData();
  },[])

  console.log(veri);
  console.log(type);
  return <div className="text-white">
   <div>
    {
        veri.map((movie)=>{
          return (<div className="container">
            
           <div className="detail-row">
            <div className="detail-col">
              <img className="detail-img" src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt="" />
            </div>
            <div className="detail-col2">
              <h2>{
             type==="movie"? movie.title+" (":movie.name+" ("}

             {type==="movie"? movie.release_date.split("-")[0]+")" : movie.first_air_date.split("-")[0]+")"} 
            </h2><br />


              <h5>Overview:</h5>
              <p>{movie.overview}</p>
            </div>
           </div>
            
            </div>)
        })
    }
    </div>
    
    
    </div>;
}
