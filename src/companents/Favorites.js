import React from 'react'
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import {save,remove} from '../redux/MovieSlice'
export default function Favorites() {

    const movieData=useSelector((state)=>state.movie.movie);

  const dispatch=useDispatch();
   console.log(movieData)

    function myCard(id,to, title, img, imdb, overview) {
        return (
          <div className="mycard text-white">
            <img
              src={"https://image.tmdb.org/t/p/w500" + img}
              className="mycard-img"
            />
            <div className="mycard-imdb">{imdb}</div>
            <img  src="img/remove.png" className="mycard-favorite"onClick={()=>{
              dispatch(remove(id));
            }}></img>
            <div className="intro">
              <h3>{title}</h3>
      
              <p>{overview}</p>
              <div className="favorite-div">
                <Link className="link-style" to={to} style={{ color: "black",width:"100%" }}>
                  <button>Detail</button>
                </Link>
        
              </div>
            </div>
          </div>
        );
      }
  return (
    <div className='container mycards'>
        <div className='cards-row'>
 
     
        {
          
          movieData.length!==0? movieData.map((movie)=>{
                console.log(movie)
              return(
                myCard(movie[0],"/detail?"+movie[0],movie[1],movie[2],movie[3],movie[4])
              )
            }):<div className='empty'>Empty</div>
        }
        </div>
    </div>
  )
}
