import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';

const Profile = ({ user }) => {

    const [userdata, setUserData] = useState({
        name: "loading",
        picture: ""
    })

    useEffect(()=>{
        if(user) setUserData({ name: user.username, picture: user.picture })
    },[user])

    return (
         <div>
            <div className = "card" style = {{ margin:"10%", padding:"10px", textAlign:"center" }}>
            <h4 style = {{ textAlign: 'start' }}>Your Profile Name:</h4>
               <h2>{userdata.name}</h2>
               <img className = "circle" src = {userdata.picture} alt=""/>  
            </div>
           
         </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth
})

export default connect(mapStateToProps)(Profile);