import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
 const userLogout = async() => {
    try {
        const res = await fetch('/logout', {
            method:'GET',
        })
        if(res.status === 200){
            window.alert('Logout Successfull')
            console.log('Logout Successfull')
            navigate('/')
        }else{
            window.alert('Logout Failed')
            console.log('Logout Failed')
        }
    } catch (error) {
        console.log(error)
    }
}
return (
    <>
    <div className='zero'>
    <h2  style={{color:"Background", fontWeight:'bold', marginTop:30}}> Are You Sure You Want To Logout? Click LOGOUT Below To Get Logged Out.</h2>
    </div>
    <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding:20 }}>
      <button onClick={userLogout} className='logout-button'>Logout</button>
    </div>
    </>
  );
}


export default Logout
