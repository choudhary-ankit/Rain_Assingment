import React, { Component } from 'react';
import Style from './SigninSingup.module.css';
import NavApp from '../NavApp/NavApp';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from '../../Firebase';
require('firebase/auth')

export default class SigninSingup extends Component {
    constructor(props){
        super(props)
        this.state={
            userUID:'',
            Login_status:false,
            passmatch:false,
            Name:'',
            Email:'',
            Pass:'',
            Repass:'',
            Login_E:'',
            Login_P:'',
            span_value:'',
            span_color:'',
            message:'',
            Loader:false,
        }
    }
   passmatch=(e)=>{
       let repass=e.target.value
        if(this.state.Pass.length>0 && repass.length>0){
            if(this.state.Pass===repass){
                this.setState({
                    span_value:'your password is match',
                    span_color:"green",
                    passmatch:true,
                    message:'',
                })
            }
            else{
                this.setState({
                    span_value:"your password does't match",
                    span_color:"#e50914",
                    passmatch:false,
                    message:'',
                })
            }
        }
   }
    singUp=()=>{
        if(this.state.Login_status==false){
            this.setState({
                Login_status:true,
                message:'',
            })
        }
        else{
            this.setState({
                Login_status:false,
                message:'',
            })
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }
    
    createaccount=()=>{
        this.setState({
            message:'',
            span_value:'',
            Loader:true,
        })
        if(this.state.passmatch===true && this.state.Name!=''){
            firebase.auth().createUserWithEmailAndPassword(this.state.Email, this.state.Pass)
            .then(()=>{
                var user = firebase.auth().currentUser;
                user.updateProfile({
                displayName: this.state.Name,
                })
                window.localStorage.setItem('loggedInUser', 'Abxhdgfanh')
                    setTimeout(() => {
                        window.location.replace("/moviesinfo")
                        this.setState({Loader:false})
                    }, 5000);
            })
            .catch((error)=>{
                let errormsg=error.message
                this.setState({
                    Loader:false,
                    message:errormsg
                })
            })
        }
        else{
            this.setState({
                Loader:false,
                message:"you are not fill all details"
            })
        }
    }
    accountlogin=()=>{
        this.setState({
            message:'',
            span_value:'',
            Loader:true,
        })
        firebase.auth().signInWithEmailAndPassword(this.state.Login_E, this.state.Login_P)
        .then((responce)=>{
            window.localStorage.setItem('loggedInUser', 'Abxhdgfanh')
            window.location.replace("/moviesinfo")
        })
        .catch((error)=>{
            let errormsg=error.message
            this.setState({
                Loader:false,
                message:errormsg
            })
        }) 
    }
    render() {
        return (
            <div className={Style.body}>
                <img src="./netflix-background-9.jpg" className={Style.bg_img}></img>
                <div className={Style.navapp}>
                    <NavApp/>
                </div>
                <div className={Style.text_arrng}>
                {
                    this.state.Login_status==false?
                        <Card className={Style.card_size} variant="outlined">
                            <CardContent>
                                <div className={Style.title}>
                                    <p className={Style.title_arrng}>Sign In</p>
                                </div>
                                <div className={Style.inputbox}>
                                    <TextField variant="outlined" type="email" label="Email" name="Login_E" onChange={this.handleChange}/>
                                    <TextField variant="outlined" type="password" label="password" name="Login_P"onChange={this.handleChange} />
                                    <span style={{color:'#e50914', fontSize:"12"}}>{this.state.message}</span>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size="medium" variant="contained" style={{backgroundColor:"#e50914", color:"white"}} size="medium" onClick={this.accountlogin}>
                                {
                                    this.state.Loader ? 
                                        <CircularProgress color="inherit" style={{width:"25px", height:"25px"}}/>
                                    : 
                                        "Sign In"
                                }
                                </Button>
                            </CardActions>
                            <p>if you don't have <br/> account<Button size="small" color="primary" onClick={this.singUp}>Click Here</Button></p>
                        </Card>
                    :
                        <Card className={Style.card_size} variant="outlined">
                            <CardContent>
                                <div className={Style.title}>
                                    <p className={Style.title_arrng}>Sign Up</p>
                                </div>
                                <div className={Style.inputbox}>
                                    <TextField variant="outlined" label="Name" type="text" name="Name"onChange={this.handleChange}/>
                                    <TextField variant="outlined" label="Email" type="email" name="Email"onChange={this.handleChange}/>
                                    <TextField variant="outlined" label="password" type="password" name="Pass" onChange={this.handleChange}/>
                                    <TextField variant="outlined" label="Reenter password" type="password" name="Repass"onChange={this.passmatch}/>
                                    <span style={{color:`${this.state.span_color}`, fontSize:"12"}}>{this.state.span_value}</span>
                                    <span style={{color:'#e50914', fontSize:"12"}}>{this.state.message}</span>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="contained" style={{backgroundColor:"#e50914", color:"white"}} size="medium" onClick={this.createaccount}>
                                    {
                                        this.state.Loader ? 
                                            <CircularProgress color="inherit" style={{width:"25px", height:"25px"}}/>
                                        : 
                                            "Sign Up"
                                    }
                                </Button>
                            </CardActions>
                            <p>if you have a<br/> account<Button size="small" color="primary" onClick={this.singUp}>Click Here</Button></p>
                        </Card>
                    }
                </div>
            </div>
        )
    }
}
