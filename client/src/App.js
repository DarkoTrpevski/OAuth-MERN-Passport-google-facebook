import React,{useEffect} from 'react';
import Header from './components/Header';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import {connect} from 'react-redux'
import {fetchUserAction} from './actions/authActions'

const App = ({ fetchUserAction }) => {

  useEffect(()=>{
    fetchUserAction()
  },[])

  return (
    // <div className="App">
    //   <h1>Coders never quit!</h1>
    //   <a href="/auth/google">sign up with google</a>
    // </div>
    <BrowserRouter>
     <Header />
     <Route exact path="/" component={Home} />
     <Route path="/profile" component={Profile} />
    </BrowserRouter>
  );
}



export default connect(null, { fetchUserAction })(App);