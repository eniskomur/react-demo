import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {Link,Routes,Route,useParams} from 'react-router-dom'
import Home from "./companents/Home";
import Detail from "./companents/Detail";
import Favorites from "./companents/Favorites";

function App() {
  const [veri, setVeri] = useState([]);
  const [movieType, setmovieType] = useState("movie");
  const [total_pages, setTotal_pages] = useState(1);
 

  const searchRef = useRef(null);
  const typeRef = useRef(null);

  const [page, setPage] = useState(1);

  function search(x) {
    axios
      .get(
        "https://api.themoviedb.org/3/search/"+movieType+"?api_key=83d022f2c33f1e4497785115d76b8f33&&language=en-USpage=" +
          page +
          "&query=" +
          x +
          ""
      )
      .then((res) => {
        console.log(res.data.total_pages);
        setTotal_pages(res.data.total_pages)
        page !== 1
          ? setVeri([...veri, res.data.results])
          : setVeri([res.data.results]);
      })
      .catch((err) => console.log(err));
  }

  const degisim = (x) => {
  if(x===true){
     setPage(1);
  }
    if (searchRef.current.value !== "") {
     
      return search(searchRef.current.value);
    } else {
      return getData(true);
    }
  };

  const getData = async (reset) => {
    if (reset === true) {
      setPage(1);
      searchRef.current.value="";
      setVeri([]);
    }

    await axios
      .get(
        "https://api.themoviedb.org/3/"+movieType+"/popular?api_key=83d022f2c33f1e4497785115d76b8f33&language=en-US&page=" +
          page +
          ""
      )
      .then((res) => {
        setTotal_pages(res.data.total_pages)
        reset === false
          ? setVeri([...veri, res.data.results])
          : setVeri([res.data.results]);
      })
      .catch((err) => console.log(err));
  };

  function changePage(x) {
    var myPage = page + x;

    if (myPage < 0) {
      return null;
    } else if (myPage > 500) {
      return null;
    } else {
      return setPage(myPage);
    }
  }

  function changeMovieType(){

    if(typeRef.current.checked ===true){
         setmovieType("tv");

    }else if(typeRef.current.checked ===false){
      setmovieType("movie");

    }

  }

  useEffect(()=>{

    getData(true);

  },[movieType])

  useEffect(() => {
    if (searchRef.current.value !== "") {
      degisim(false);
    } else {
      getData(false);
    }
  }, [page]);



 

  return (
    <div className="App">
      <header>
        <div className="container text-white">
          <div className="nav-menu">
            <Link className="link-style" to="/"><h3 style={{ cursor: "pointer" }} onClick={() => getData(true)}>
              HOME
            </h3></Link>
           <Link className="link-style" to="/favorites"> <h3  style={{ cursor: "pointer" }}>FAVORITES</h3></Link>
          </div>

          <div className="nav2">
            <div>
              <input
                type="text"
                placeholder="Ara"
                ref={searchRef}
                onChange={() => degisim(true)}
              />
            </div>

            <div>
              <p>Movies</p>
              <label className="switch">
                <input type="checkbox" ref={typeRef} onChange={()=>changeMovieType()}/>
                <span className="slider round"></span>
              </label>
              <p>TV Series</p>
            </div>
          </div>
        </div>
      </header>

      <section>

      <Routes>
          <Route path="/" element={<Home veri={veri} movieType={movieType} changePage={changePage} total_page={page===total_pages?false:true}/>} />
          <Route path="/detail" element={<Detail type={movieType}/>} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>

      </section>

     
    </div>
  );
}


export default App;
