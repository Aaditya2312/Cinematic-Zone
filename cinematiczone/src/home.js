import Search from './Search'
import MovieList from './MovieList.js'
import Header from './Header.js'

const Home = () => {
  return (
    <> 
      <div>
        <div className='specific'>
        <Header/>
        <Search />
        </div>
        <MovieList />
      </div>

    </>
  )
}
export default Home


