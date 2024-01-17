import React from 'react'
import {NavLink} from "react-router-dom"
import { useGlobalContext } from './context'
// import { useAuth } from './login'

const MovieList = () => {
  const {movie, isLoading} = useGlobalContext();
  // const {loggedIn} = useAuth()
  
  if(isLoading){
    return(
      <div className=''>
        <div className='loading'>Loading...</div>
      </div>
    )
  }
  return (
    <>
    <section className='movie-page'>
    {/* {loggedIn ? ( */}
      <div className='container grid grid-4-col'>{movie.map((curMovie) => {
        const {imdbID,Title,Poster} = curMovie
        const movieName = Title.substring(0,15)
        return (<NavLink to={`movie/${imdbID}`}>
          <div className='card'>
            <div className='card-info'>
              <h2>
                {movieName.length >= 15 ? `${movieName}...` : movieName}
                </h2>
              <img src={Poster} alt='{imdbID}'/>
              </div>
              </div>
        </NavLink>
        )
      })}</div>
      {/* ) : (
        <div className='not-authorized'>You are not authorized to view this content.</div>
    )} */}
      </section>
   
    </>
   )
}
export default MovieList


