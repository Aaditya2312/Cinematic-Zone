import React,{useState,useEffect} from 'react'
import { NavLink,useParams } from 'react-router-dom'
import { API_URL } from './context'

const SingleMovie = () => {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState("")
  const getMovies = async(url) => {
    setIsLoading(true)
      try{
          const res = await fetch(url)
          const data = await res.json()
          console.log(data)
          if(data.Response === "True")
          {
              setIsLoading(false)
              setMovie(data)
          }
      }catch(error){
          console.log(error)
      }
  }
 
  useEffect(() => {
      let timerOut = setTimeout(()=>{
          getMovies(`${API_URL}&i=${id}`)
      },800)
      return () => clearTimeout(timerOut)
   },[id])
   
   if(isLoading){
    return(
      <div className='movie-section'>
        <div className='loading'>Loading...</div>
      </div>
    )
  }
  
  return (
    <>
    <section className='movie-section'>
      <div className='movie-card'>
        <figure>
          <img src={movie.Poster} alt='movie-poster'></img>
        </figure>

        <div className='card-content'>
          <p className='title'>{movie.Title}</p>
          <p className=''></p>
          {movie.imdbRating > 6.9 && (
    <p className='card-text'style={{color:'black', fontWeight:'bold', fontSize:'30px'}}>Recommended For A Watch</p>
  )}
          <p className='card-text'>{movie.Released}</p>
          <p className='card-text'>{movie.Genre}</p>
          <p className='card-text'>{movie.Plot}</p>
          <p className=''></p>
          <p className='card-text'>Imdb Rating: {movie.imdbRating}</p>
          <p className='card-text'>{movie.Ratings[0].Source}: {movie.Ratings[0].Value}</p>
          <p className='card-text'>{movie.Country}</p>
          <NavLink to="/" className="back-btn"> Go Back </NavLink>
          <NavLink to="/signin" className="back-btn" style={{marginBottom:10}}> I want to Recommended </NavLink>
          </div>
      </div>
    </section>
    </>
  )
}

export default SingleMovie