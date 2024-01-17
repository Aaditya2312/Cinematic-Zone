import React from 'react'
import { useGlobalContext } from './context'

const Search = () => {
  const{query,setQuery,year,setYear,isError} = useGlobalContext()
  return (
    <>
    <section className='search-section'>
      <div>
      <h2 className='math'>Search Your Movie</h2>
      </div>
      <form action='#' onSubmit={(e)=>e.preventDefault()}>
        <div className='shift'>
          <input className='change'
          type="text"
          placeholder='Search By Name(universal search)'
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          /> 
          <input className='change'
          type="text"
          placeholder='Search by year(refined search)'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        </div>
      </form> 
      <div className='card-error'>
        <p>{isError.show && isError.msg}</p>
        </div>
    </section>
    </>
  )
}

export default Search
