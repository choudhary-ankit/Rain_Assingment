import { Typography } from '@material-ui/core'
import React, { Component } from 'react'
import Style from './HomePage.module.css'
import NavApp from '../NavApp/NavApp'


export default class HomePage extends Component {
    render() {
        return (
            <div className={Style.body}>
                <div className={Style.bg_arrng}>
                    <img src="./netflix-background-9.jpg" className={Style.bg_img}></img>
                </div>
                <div className={Style.navapp}>
                    <NavApp/>
                </div>
                <div className={Style.text_arrng}>
                    <h2>Unlimited Movies,TV <br/>Show and more.</h2>
                    <h6>Get movie information anywhere.</h6>
                </div>
                <div className={Style.section_two}>
                    <div className={Style.section_heading}>
                        <h2>Movies Info</h2>
                        <p>Get all details about movie web series and T.v shows without any cost</p>
                    </div>
                    <div className={Style.img_section}>
                        <div>
                            <img src='./tickets.jpg' className={Style.img_size}></img>
                            <h5>50% off in Movie Ticket</h5>
                            <p>Buy 2 Ticket and Get 3rd Ticket on 50% off</p>
                        </div>
                        <div>
                            <img src='./popcorns.jpg' className={Style.img_size}></img>
                            <h5>Buy 1 Get 1 Free</h5>
                            <p> Buy 1 popcorns and Get 1 is free</p>
                        </div>
                        <div>
                            <img src='./primer.png' className={Style.img_size}></img>
                            <h5>premimum Quaility</h5>
                            <p>You feel everything is premimum here</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
