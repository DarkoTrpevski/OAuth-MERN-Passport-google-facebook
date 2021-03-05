import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const Header = ({ user })=>{

    console.log('Inside Header.js, user is: ', user);
   const renderNavLinks = ()=>{
       switch(user) {
           case null:
               return <li><a href="/">Loading</a></li>
           case false:  
               return  <li><a href="/auth/google">Signup</a></li> 
           default:
                return(
                    <React.Fragment>
                      <li><a href="/api/logout">Logout</a></li>
                      <li><Link to="/profile">Profile</Link></li>
                    </React.Fragment>
                )    
       }
   }

    return (
         <nav>
            <div className="nav-wrapper deep-purple darken-2">
            <Link to={user ? '/profile' : '/'} className="brand-logo">CNQ</Link>
            <ul id="nav-mobile" className="right">
               {renderNavLinks()}
               {/* <li><a href="/auth/google">SignUp</a></li>
               <li><a href="/api/logout">Logout</a></li>
               <li><a href="/profile">Profile</a></li> */}
            </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    user:state.auth
})


export default connect(mapStateToProps)(Header);