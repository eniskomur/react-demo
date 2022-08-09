import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { remove, save } from "../redux/MovieSlice";

export default function Home({ veri, movieType, changePage, total_page }) {
  const movieData = useSelector((state) => state.movie.movie);

  const dispatch = useDispatch();

  const saveMovie = (data) => {
    dispatch(save(data));
  };
  useEffect(() => {}, [movieData]);

  function handleChange(id, to, title, img, imdb, overview) {
    const found = movieData.find((obj) => {
      return obj[0] === id;
    });

    if (found === undefined) {
      saveMovie([id, to, title, img, imdb, overview]);
    } else {
      dispatch(remove(id));
    }
  }

  function myCard(id, to, title, img, imdb, overview) {
    const found = movieData.find((obj) => {
      return obj[0] === id;
    });

    return (
      <div className="mycard text-white">
        <img
          src={"https://image.tmdb.org/t/p/w500" + img}
          className="mycard-img"
        />
        <div className="mycard-imdb">{imdb}</div>

        <img
          src={found === undefined ? "img/plus.png" : "img/remove.png"}
          className={
            found === undefined ? "mycard-favorite2" : "mycard-favorite"
          }
          onClick={(event) => {
            handleChange(id, title, img, imdb, overview);
            event.target.src =
              event.target.src === window.location.href + "img/plus.png"
                ? "img/remove.png"
                : "/img/plus.png";
            event.target.className =
              event.target.className === "mycard-favorite2"
                ? "mycard-favorite"
                : "mycard-favorite2";
          }}
        ></img>

        <div className="intro">
          <h3>{title}</h3>

          <p>{overview}</p>
          <div className="favorite-div">
            <Link
              className="link-style"
              to={to}
              style={{ color: "black", width: "100%" }}
            >
              <button>Detail</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="container mycards">
        <div className="cards-row" style={{ paddingLeft: 60 }}>
          {veri.map((item) => {
            return item.length !== 0 ? (
              item.map((movies) => {
                return movies.poster_path !== null
                  ? myCard(
                      movies.id,
                      "/detail?" + movies.id,
                      movieType === "movie" ? movies.title : movies.name,
                      movies.poster_path,
                      movies.vote_average,
                      movies.overview
                    )
                  : "";
              })
            ) : (
              <div className="empty">Not found</div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="container text-center mb-5 mt-5">
          {total_page !== false ? (
            <button
              className={
                veri[0] !== undefined
                  ? veri[0].length !== 0
                    ? "myBtn"
                    : "myBtn-hide"
                  : ""
              }
              onClick={() => {
                changePage(1);
              }}
            >
              view more
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
}
