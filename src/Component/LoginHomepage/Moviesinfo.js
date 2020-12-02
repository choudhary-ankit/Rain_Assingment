import React, { Component } from 'react'
import Style from './Moviesinfo.module.css'
import NavApp from '../NavApp/NavApp'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import MovieDetails from '../../StaticData/MoviesCollection'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export default class Moviesinfo extends Component {
    constructor(props){
        super(props)
        this.state={
            Title:'',
            Type:'',
            Poster:'',
            Search:'',
            Tabvalue:0,
            Modal_open:false,
            Modal_Title:'',
            Movie_Title:'',
            Movie_Type:'',
            Movie_Img:'',
            Movie_Array:[],
            Movie_Id:"1",
            Movie_Data:[],
            Login_Status:false,
            err_modal:false,
            spane:'',
        }
    }
    componentDidMount=()=>{
        var user= localStorage.getItem('loggedInUser')
        
            if(user==='Abxhdgfanh'){
                this.setState({
                    Login_Status:true,
                })
            }
            else{
                this.setState({
                    Login_Status:false
                })
            }
            MovieDetails.map((e)=>{
                if(e.Id=="01"){
                    this.setState({
                        Title:e.Title,
                        Type:e.Type,
                        Poster:e.poster,

                    })
                }
            })
    
    }
    movieInfo=(id)=>{
        MovieDetails.map((e)=>{
            if(e.Id==id){
                this.setState({
                    Title:e.Title,
                    Type:e.Type,
                    Poster:e.poster
                })
            }
        })
    }
    modalOpen=()=>{
        this.setState({
            Modal_open:true,
            Modal_Title:"Add Movie"
        })
    }
    handleClose=()=>{
        this.setState({
            Modal_open:false,
        })
    }
    handleChange=(e)=>{
        if(e.target.name==="Movie_Img"){
            var file=e.target.files[0]
            var reader= new FileReader();
            var url = reader.readAsDataURL(file)
            reader.onloadend= (e) => {
                this.setState({
                    Movie_Img:[reader.result]
                })
            }
        }
        else{

            this.setState({
                spane:'',
                [e.target.name]:e.target.value
            })
        }
    }
    addMovie=()=>{
        if(this.state.Title!=''&& this.state.Type!=''&& this.state.Movie_Img!=""){
            let data={
                Id:this.state.Movie_Id,
                Title:this.state.Movie_Title,
                Type:this.state.Movie_Type,
                Img:this.state.Movie_Img
            }
            this.state.Movie_Array.push(data)
            this.setState({
                Movie_Id:Number(this.state.Movie_Id)+1,
                Modal_open:false,
                Movie_Title:'',
                Movie_Type:'',
            })
        }
        else{
            this.setState({
                spane:"Invalid"
                
            })
        }
    }
    editMovie=(Id)=>{
        this.state.Movie_Array.map((e,i)=>{
            if(e.Id===Id){
                this.setState({
                    Modal_open:true,
                    dialog_title:"Edit Movie",
                    Movie_Title:e.Title,
                    Movie_Type:e.Type,
                    Movie_Img:e.Img
                })
                this.state.Movie_Array.splice(i,1)
            }
        })
        this.forceUpdate();
    }
    deleteMovie=(Id)=>{
        this.state.Movie_Array.map((e,i)=>{
            if(e.Id===Id){
                this.state.Movie_Array.splice(i,1)
            }
        })
        this.forceUpdate();
        
    }
    onSearch=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
            
        })
    }
    axiosSearch=()=>{
        this.setState({Movie_Data:''})
        axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=504c060f&s=${this.state.Search}`)
        .then(response =>{
            if(response.data.Response==="True"){
                this.setState({Movie_Data: response.data.Search, Search:'',Tabvalue:1})
            }
            else if(response.data.Response=== "False"){
                this.setState({
                    err_modal:true
                })
                
            }
        })

    }
    errModal=()=>{
        this.setState({
            err_modal:false
        })
    }
    render() {
        console.log(this.state.err_modal)
        return (
            <div>
                {
                this.state.Login_Status===true?
                <div className={Style.body}>
                    <div className={Style.main_body}>
                        <img src={this.state.Poster} className={Style.poster_img}></img>
                        <div className={Style.navapp}>
                            <NavApp/>
                        </div>
                        <div className={Style.title}>
                            <h3 className={Style.title_heading}>{this.state.Title}</h3>
                            <p>{this.state.Type}</p>
                        </div>
                        <div className={Style.movie_card}>
                            <div className={Style.card_arrng}>
                                {
                                    MovieDetails.map((e)=>{
                                        return(
                                            <Button onClick={()=>this.movieInfo(e.Id)}>
                                                <Card className={Style.card_size}>
                                                    <img src={e.image} className={Style.movie_img}></img>
                                                </Card>
                                            </Button>
                                        )
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className={Style.body_searchbox}>
                        <input className={Style.searchbox} placeholder="Search Movie" name="Search" onChange={this.onSearch}></input>
                        <Button  variant="outlined" color='secondary' style={{color:"black", border:"1.5px solid #e50914", height:"55px"}} onClick={this.axiosSearch}>Search</Button>
                    </div>
                    <div className={Style.tabbar}>
                        <div style={{width:"100%", display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <Tabs value={this.state.Tabvalue} aria-label="simple tabs example" className={Style.tabs_arrng}>
                                <Tab label="Added Movies"  onClick={this.tabChange=()=>{this.setState({Tabvalue:0})}}/>
                                <Tab label="Searched Movie" onClick={this.tabChange=()=>{this.setState({Tabvalue:1})}}/>   
                            </Tabs>
                        </div>
                    </div>
                    <div className={Style.contain}>
                        {
                        this.state.Tabvalue===0?
                            <div className={Style.contain_box}>
                                <div>
                                    <Button variant="contained" color="primary" style={{marginTop:"25px"}} onClick={this.modalOpen}>Add Movie</Button>
                                    <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.Modal_open}>
                                        <div className={Style.modal_title}>
                                            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>Add Movies</DialogTitle>
                                            <IconButton onClick={this.handleClose}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </div>
                                        <DialogContent dividers className={Style.modal_content}>
                                        <div style={{marginLeft:"45%", color:"red"}}>
                                                <spane>{this.state.spane}</spane>
                                            </div>
                                            <div className={Style.input_arrng}>
                                                <lable>Movie Title:</lable>
                                                <input placeholder="Movie Title" className={Style.text_area} value={this.state.Movie_Title} name="Movie_Title" onChange={this.handleChange}></input>
                                            </div>
                                            <div className={Style.input_arrng}>
                                                <lable>Movie Type:</lable>
                                                <input placeholder="Type: Action | Comedy" className={Style.text_area} value={this.state.Movie_Type} name="Movie_Type" onChange={this.handleChange}></input>
                                            </div>
                                            <div className={Style.input_arrng}>
                                                <lable>Movie image:</lable>
                                                <input placeholder="movie image" style={{width:"200px"}} type="file"  name="Movie_Img" onChange={this.handleChange}></input>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={this.addMovie} color="primary">Submit</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <div className={Style.add_movie}>
                                    {
                                        this.state.Movie_Array.map((e)=>{
                                            if(this.state.Search===''){
                                                return(
                                                    <div className={Style.add_card}>
                                                        <div>
                                                            <img src={e.Img} style={{width:"150px", height:"150px"}}></img>
                                                        </div>
                                                        <div>
                                                            <h2>{e.Title}</h2>
                                                            <p>{e.Type}</p>
                                                            <Divider/>
                                                            <div className={Style.edit_delete}>
                                                                <IconButton style={{color:'#3f51b5'}}>
                                                                    <EditIcon onClick={()=>this.editMovie(e.Id)}/>
                                                                </IconButton>
                                                                <IconButton style={{color:'red'}}>
                                                                    <DeleteForeverIcon onClick={()=>this.deleteMovie(e.Id)}/>
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            else{
                                                if(e.Title===this.state.Search){
                                                    return(
                                                        <div className={Style.add_card}>
                                                            <div>
                                                                <img src={e.Img} style={{width:"150px", height:"150px"}}></img>
                                                            </div>
                                                            <div>
                                                                <h2>{e.Title}</h2>
                                                                <p>{e.Type}</p>
                                                                <Divider/>
                                                                <div className={Style.edit_delete}>
                                                                    <IconButton style={{color:'#3f51b5'}}>
                                                                        <EditIcon onClick={()=>this.editMovie(e.Id)}/>
                                                                    </IconButton>
                                                                    <IconButton style={{color:'red'}}>
                                                                        <DeleteForeverIcon onClick={()=>this.deleteMovie(e.Id)}/>
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        :
                        this.state.Tabvalue===1?
                            <div className={Style.contain_box}>
                                {
                                    this.state.Movie_Data!=''?
                                    <div className={Style.add_movie}>
                                        {
                                            this.state.Movie_Data.map((e)=>{
                                                if(this.state.Search===''){
                                                    return(
                                                        <div className={Style.add_card}>
                                                            <div>
                                                                <img src={e.Poster} style={{width:"150px", height:"150px"}}></img>
                                                            </div>
                                                            <div>
                                                                <h2>{e.Title}</h2>
                                                                <p>{`Type:${e.Type}`}</p>
                                                                <p>{`Year:${e.Year}`}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                else{
                                                    if(e.Title===this.state.Search){
                                                        return(
                                                            <div className={Style.add_card}>
                                                                <div>
                                                                    <img src={e.Poster} style={{width:"150px", height:"150px"}}></img>
                                                                </div>
                                                                <div>
                                                                    <h2>{e.Title}</h2>
                                                                    <p>{`Type:${e.Type}`}</p>
                                                                    <p>{`Year:${e.Year}`}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            })
                                        }
                                    </div>
                                    :
                                    <div>
                                        <p>NO Record</p>
                                    </div>
                                }
                            </div>
                        :
                        <p>cb</p>
                        }
                    </div>
                </div>
                :
                <div className={Style.not_auth}>
                    <p style={{textAlign:"center"}}>**You are not Authorise, please login your account</p>
                </div>
                } 
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={Style.err_modal}
                    open={this.state.err_modal}
                    onClose={this.errModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={this.state.err_modal}>
                    <div className={Style.paper}>
                        <h4 id="transition-modal-title">Movie Search</h4>
                        <p id="transition-modal-description">Sorry, Movie is not found</p>
                        <Button color="primary" onClick={this.errModal}>close</Button>
                    </div>
                    </Fade>
                </Modal>
            </div>
        )
    }
}
