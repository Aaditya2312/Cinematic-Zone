import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Review = () => {
  // const {login} = useAuth
  const [name, setName] = useState("")
  const [recommendation,setRecommendation] = useState("")
  const [info, setInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

    const PostReccom = async(e) => {
    e.preventDefault()
    const res = await fetch('/review', {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, recommendation
      })
    })
    const data = await res.json()
    if(res.status === 422 || !data){
      window.alert("Invalid Submission")
    }else{
      window.alert("Posted Successfully")
      FetchData()
    }
  }

  const FetchData = async () => {
    try {
      const response = await fetch(`/review${searchTerm ? `?searchTerm=${searchTerm}` : ''}`);
      const data = await response.json();
      setInfo(data);
      console.log("Data received:", data); // Add this line for debugging
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      FetchData();
    }, 500)   
    return () => clearTimeout(timeOut)
  }, [searchTerm]);

  return (
    <>
    <div className='zero'>
    <h2 style={{color:"Background", fontWeight:'bold'}}>Share Your Movie Experiences With Us. Recommend movies which you feel are meant for WATCHING.</h2>
    </div>
    <div>
    <input className='refine'
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search movies...'
        />
        {/* <button onClick={() => FetchData()}>Search</button> */}
      </div>
    <div className='"sign-in-container"'>
      <section>
        <form method='POST'>
          <div className='review'>
            <div className='first'>
            <label for="name" style={{color:"Background", marginBottom:20}}>Your Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}required className='plus'></input><br />
            </div>

            <div className='second'>
            <label for="recommendation" className='reco' style={{color:"snow"}}>Movie Recommendation:</label><br />
            <textarea id="recommendation" name="recommendation" rows="5" cols="40" value={recommendation}  onChange={(e)=>{setRecommendation(e.target.value)}} required></textarea><br />
            </div>
            
            <button type="submit" onClick={PostReccom} className='s-btn'>Post</button>
          </div>

        </form>
      </section>
      <div className='suggest'>
      {info && info.length > 0 ? (
    info.map((item) => (
      <div key={item._id} className='real'>
        <div className='user-info'>
          <h3 style={{ fontSize: 16, color: 'whitesmoke' }}>{item.name}</h3>
        </div>
        <div className='comment'>
          <p style={{ fontSize: 16, color: 'whitesmoke' }}>{item.recommendation}</p>
        </div>
      </div>
    ))
  ) : (
    <div className='render'  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:10, height:40 }}>
    <h1 style={{color:"Background", alignItems:"center"}}>Reviews not found. Either you are not logged in or search result is not present</h1>
    </div>
  )}
</div>
    </div>
    <div className='last'>
    <NavLink to='/logout' style={{fontSize:14,padding:18,color:"GrayText"}}>I want to logout</NavLink>
    <NavLink to='/'  style={{fontSize:14,padding:18,color:"GrayText"}}>Go To Home</NavLink>
    </div>
     {/* Search functionality */}
     {/* <div>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search movies...'
        />
        <button onClick={() => FetchData()}>Search</button>
      </div> */}
    </>
  )
}

export default Review
