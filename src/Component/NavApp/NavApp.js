import React, { Component } from 'react'
import Style from './NavApp.module.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class NavApp extends Component {
    render() {
        return (
            <div className={Style.body}>
                <AppBar position="static" color="transparent" >
                    <Toolbar className={Style.navapp_arrng}>
                        <h2 style={{marginLeft:"5%"}}>RAIN</h2>
                        <button className={Style.btn}>Signin/Signup</button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
