import React, { Component } from 'react'
import Style from './NavApp.module.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class NavApp extends Component {
    constructor(props){
        super(props)
        this.state={
            login_status:false,
            anchorEl:null,
        }
    }
    componentDidMount=()=>{
        var user= localStorage.getItem('loggedInUser')
        if(user==='Abxhdgfanh'){
            this.setState({
                login_status:true
            })
        }
        else{
            this.setState({
                login_status:false
            })
        }
    }
    handleClick=(e)=>{
        this.setState({
            anchorEl:e.currentTarget
        })
    }
    profile=()=>{
        this.setState({
            anchorEl:null,
        })
        window.location.replace('/userprofile');
    }
    logout=()=>{
        this.setState({
            anchorEl:null,
        })
        localStorage.removeItem('loggedInUser');
        window.location.replace('/');
    }
    render() {
        return (
            <div className={Style.body}>
                <AppBar position="static" color="transparent" >
                    {
                        this.state.login_status===false?
                        <Toolbar className={Style.navapp_arrng}>
                            <Link to="/" style={{textDecoration:"none", color:"#e50914"}}>
                                <h2 style={{marginLeft:"5%"}}>RAIN</h2>
                            </Link>
                            <Link to="/signinsingup" style={{textDecoration:"none",}}>
                                <button className={Style.btn}>Signin/Signup</button>
                            </Link>
                        </Toolbar>
                        :
                        <Toolbar className={Style.navapp_arrng}>
                            <Link to="/" style={{textDecoration:"none", color:"#e50914"}}>
                                <h2 style={{marginLeft:"5%"}}>RAIN</h2>
                            </Link>
                            <div className={Style.login_arrng}>
                                <Link to="/moviesinfo" style={{textDecoration:"none", color:"#e50914"}}>
                                    <h5>Movies</h5>
                                </Link>
                                <Button aria-controls="simple-menu" aria-haspopup="true" size="small" onClick={this.handleClick} style={{backgroundColor:"#e50914", color:"white", height:"50px"}}>
                                    User info
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleClose}
                                    >
                                    <MenuItem onClick={this.profile}>Profile</MenuItem>
                                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    }
                </AppBar>
            </div>
        )
    }
}
