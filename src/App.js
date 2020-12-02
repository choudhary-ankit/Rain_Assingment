import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import HomePage from './Component/HomePage/HomePage'
import Moviesinfo from './Component/LoginHomepage/Moviesinfo';
import SigninSingup from './Component/SigninSingup/SigninSingup';
import Profile from './Component/Userprofile/Profile'

export default class App extends Component {
  render() {
    return (
      <div>
         <Route path ="/" exact component={HomePage}></Route>
         <Route path ="/signinsingup" exact component={SigninSingup}></Route>
         <Route path ="/moviesinfo" exact component={Moviesinfo}></Route>
         <Route path ="/userprofile" exact component={Profile}></Route>
      </div>
    )
  }
}
