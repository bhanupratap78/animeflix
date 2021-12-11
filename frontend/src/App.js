import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'

// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import mobiscroll from '@mobiscroll/react';
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';

// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import {
//     Table,
//     TableBody,
//     TableHeader,
//     TableHeaderColumn,
//     TableRow,
//     TableRowColumn,
//   } from 'material-ui/Table';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));


// const styles = {
//     title: {
//         position: 'center',
//         textAlign: 'center'
//     },
//     leftIcon: {
//       cursor: 'default',
//       color: 'green'
//     },
//   };

// import configInI from 'config.ini'
import configData from "./config.json";

class App extends Component {
  constructor() {
    super();
    /**
     * @type {object}
     * @property {array} data The data that comes from the REST API
     * @property {boolean} open Toggling Dialog Box for Create
     * @property {boolean} openDelete Toggling Dialog Box for Delete
     * @property {boolean} openUpdate Toggling Dialog Box for Update
     * @property {string} name Full Name
     * @property {int} age Age
     * @property {int} id Id
     */
    this.state = {
      data: [],
      open: false,
      openDelete: false,
      openUpdate: false,
      name: null,
      age: null,
      id: null,
      username: null,
      password: null,
      currentuserid: null,
      currentusername: null,
      currentloginstatus: "LogIn",
      currentlogoutstatus: "LogOut",
      openforaddingdata: false,
      title: null,
      description: null,
      photo: null,
      post_type: null,
      openforregistration: false,
      currentregistrationstatus: "Register",
      registrationusername: null,
      registrationpassword: null,
      registrationusertype: null,
      registrationname: null,
      adminaccess: false,
      registrationsuccessful: false,
      registrationunsuccessful: false,
      newusersuccessful:false
    }

    // Only Needed
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmitClose = this.handleSubmitClose.bind(this)
    this.handleRegistrationClose = this.handleRegistrationClose.bind(this)
    this.handleRegistrationSubmitClose = this.handleRegistrationSubmitClose.bind(this)
    // Only Needed




    this.displayTableData = this.displayTableData.bind(this)
    this.addData = this.addData.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)
    

    this.updateData = this.updateData.bind(this)
    this.handleUpdateOpen = this.handleUpdateOpen.bind(this)
    this.handleUpdateClose = this.handleUpdateClose.bind(this)
    
    this.handleDeleteOpen = this.handleDeleteOpen.bind(this)
    this.handleDeleteClose = this.handleDeleteClose.bind(this)
    
    // New
    this.loginform = this.loginform.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    
    this.handleAddingDataOpen = this.handleAddingDataOpen.bind(this)
    this.handleAddingDataClose = this.handleAddingDataClose.bind(this)
    
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handlePhotoChange = this.handlePhotoChange.bind(this)
    this.handlePostTypeChange = this.handlePostTypeChange.bind(this)
    this.displayLogOutButton = this.displayLogOutButton.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleRegistrationOpen = this.handleRegistrationOpen.bind(this)
    
    this.registrationform = this.registrationform.bind(this)
    this.handleRegistrationNameChange = this.handleRegistrationNameChange.bind(this)
    this.handleRegistrationUserNameChange = this.handleRegistrationUserNameChange.bind(this)
    this.handleRegistrationPasswordChange = this.handleRegistrationPasswordChange.bind(this)
    this.handleRegistrationOwnerTypeChange = this.handleRegistrationOwnerTypeChange.bind(this)
    
    this.handleRegistrationSuccessfullClose = this.handleRegistrationSuccessfullClose.bind(this)
    this.handleRegistrationSuccessfullOpen = this.handleRegistrationSuccessfullOpen.bind(this)
    this.handleRegistrationUnSuccessfullClose = this.handleRegistrationUnSuccessfullClose.bind(this)
    this.registrationsuccessfullform = this.registrationsuccessfullform.bind(this)
    this.registrationunsuccessfullform = this.registrationunsuccessfullform.bind(this)
    this.handleNewRegistrationUnSuccessfullClose = this.handleNewRegistrationUnSuccessfullClose.bind(this)
    this.newuserform = this.newuserform.bind(this)
}

/**
     * Toggler for Delete Dialog Box - Open
     * @param {int} pid Id
     * @param {string} pname Name
     * @param {int} page Age
     */
handleDeleteOpen(pid, pname, page){
    this.setState({
        openDelete: true,
        id: pid,
        name: pname,
        age: page
    });
};

/**
     * Toggler for Delete Dialog Box - Close
     */
handleDeleteClose(){
    this.setState({openDelete: false});
};

handleNewRegistrationUnSuccessfullClose(){
    this.setState({newusersuccessful: false})
}

/**
     * Toggler for Update Dialog Box - Open
     * @param {int} pid Id
     * @param {string} pname Name
     * @param {int} page Age
     */
handleUpdateOpen(pid, pname, page){
    this.setState({
        openUpdate: true,
        id: pid,
        name: pname,
        age: page
    });
};

/**
     * Toggler for Update Dialog Box - Close
     */
handleUpdateClose(){
    this.setState({openUpdate: false});
};


/**
     * Saving the name to the State Object
     * @param {Synthetic Event} event
     */
handleNameChange(event){
    this.setState({
        name: event.target.value,
    });
}

/**
     * Saving the age to the State Object
     * @param {Synthetic Event} event
     */
handleAgeChange(event){
    this.setState({
        age: event.target.value
    })
}

handleUserNameChange(event){
    this.setState({
        username: event.target.value
    })
}
handlePasswordChange(event){
    this.setState({
        password: event.target.value
    })
}
handleTitleChange(event){
    this.setState({
        title: event.target.value
    })
}
handleDescriptionChange(event){
    this.setState({
        description: event.target.value
    })
}
handlePhotoChange(event){
    console.log('photo event target value')
    console.log(event.target.value)
    this.setState({
        photo: event.target.value
    })
}
handlePostTypeChange(event){
    this.setState({
        post_type: event.target.value
    })
}
handleRegistrationUserNameChange(event){
    this.setState({
        registrationusername: event.target.value
    })
}
handleRegistrationPasswordChange(event){
    this.setState({
        registrationpassword: event.target.value
    })
}
handleRegistrationOwnerTypeChange(event){
    this.setState({
        registrationusertype: event.target.value
    })
}
handleRegistrationNameChange(event){
    this.setState({
        registrationname: event.target.value
    })
}

/**
     * Toggler for Create Dialog Box - Open
     */
handleOpen(){
    this.setState({open: true});
};
handleRegistrationOpen(){
    this.setState({openforregistration: true});
};

/**
     * Toggler for Create Dialog Box - Close
     */


handleAddingDataOpen(){
    this.setState({openforaddingdata: true});
}
handleAddingDataClose(){
    this.setState({openforaddingdata: false});
}





/**
     * TextField for Creating new Data
     * @return {ReactElement} Name Field and Age Field
     */
addData(){
    return (
        <div>
            <TextField
                hintText="Name"
                onChange={this.handleNameChange}
            /><br />
            <br />
            <TextField
                hintText="Age"
                onChange={this.handleAgeChange}
            /><br />
        </div>
    )
}


newuserform(){
    return(
        <div>
            <p> New User Successfully Created </p>
        </div>
    )
}

registrationsuccessfullform(){
    return(
        <div>
            <p>User Successful</p>
        </div>
    )
}

registrationunsuccessfullform(){
    return(
        <div>
            <p>User unsuccessful</p>
        </div>
    )
}

/**
     * TextField for Updating new Data
     * @return {ReactElement} Name Field and Age Field
     */
updateData(){
    return(
        <div>
            <TextField
                hintText="Name"
                onChange={this.handleNameChange}
                defaultValue = {this.state.name}
            /><br />
            <br />
            <TextField
                hintText="Age"
                onChange={this.handleAgeChange}
                defaultValue = {this.state.age}
            /><br />
        </div>
    )
}

handleLogOut(){
    window.location.reload()
}
handleRegistrationSuccessfullOpen(){
    this.setState({registrationsuccessful: true})
}
handleRegistrationSuccessfullClose(){
    this.setState({registrationsuccessful: false});
}
handleRegistrationUnSuccessfullClose(){
    this.setState({registrationunsuccessful: false})
}

displayLogOutButton(){
    if(this.state.currentloginstatus !== "LogIn"){
        // return (<RaisedButton label="LogOut" onClick={this.handleLogOut} />)
        return (
            <BottomNavigation
                // value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                // showLabels
                // className={classes.root}
                >
                <BottomNavigationAction label="Recents" onClick={this.handleLogOut}  icon={<ExitToAppIcon />} />
                {/* <BottomNavigationAction label="Favorites" onClick={this.handleLogOut} icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" onClick={this.handleLogOut} icon={<LocationOnIcon />} /> */}
                </BottomNavigation>
        )
    }
}

















// Forms
loginform(){
    return(
        <div>
            <TextField
                hintText="Email"
                inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                onChange={this.handleUserNameChange}
            /><br/>
            <br/>
            <TextField
                hintText="Password"
                type="password"
                onChange={this.handlePasswordChange}
            /><br/>
        </div>
    )
}
registrationform(){
    return(
        <div>
            <TextField
                hintText="Name"
                onChange={this.handleRegistrationNameChange}
            /><br/>
            <br/>
            <TextField
                hintText="Email"
                onChange={this.handleRegistrationUserNameChange}
            /><br/>
            <br/>
            <TextField
                hintText="Password"
                type="password"
                onChange={this.handleRegistrationPasswordChange}
            /><br/>
            <br/>
            <TextField
                hintText="Owner Type"
                onChange={this.handleRegistrationOwnerTypeChange}
            /><br/>
        </div>
    )
}

// Handlers
handleClose(){
    this.setState({open: false});
};
handleRegistrationClose(){
    this.setState({openforregistration: false});
}
handleSubmitClose(){
    axios.post('http://localhost:5000/authenticate', {
        "username": this.state.username,
        "password": this.state.password,
      })
      .then((response) => {
        console.log("response of HandleSubmitClose - Main Page")
        console.log(response);

        // console.log("type off")
        // console.log(typeof(response.data))
        // console.log(typeof(response.data.rows_affected))

        if (response.data.status === 'Success'){
            console.log('LogIn Successfull')
            this.setState({adminaccess: true})
            // Remove 'LogIn' and 'Register' Icon
            this.setState({currentloginstatus: ""})
            this.setState({currentregistrationstatus: ""})
            // Enable LogOut
            this.setState({currentlogoutstatus: "LogOut"})
            // Add name
            this.setState({currentusername: this.state.username});
        }else{
            console.log('Login unsuccessful')
            this.setState({ registrationunsuccessful: true })
            this.setState({adminaccess: false})
            
        }

        // if (response.data.user_id == 0){
        //     this.setState({ registrationunsuccessful: true })
        // }else{
        //     if (response.data.user_id == 1){
        //         this.setState({adminaccess: true})
        //     }
        //     this.setState({currentusername: this.state.username});
        //     this.setState({currentuserid: response.data.user_id});
        //     this.setState({currentloginstatus: ""})
        //     this.setState({currentregistrationstatus: ""})
        //     this.setState({ registrationsuccessful: true })
        // }
    
      })
      .catch((error) => {
        this.setState({currentloginstatus: "LogIn"})
        this.setState({ registrationunsuccessful: true })
        console.log(error);
      });
    
    this.setState({open: false});
    // window.location.reload()
}
handleRegistrationSubmitClose(){
    console.log('registrationclose')
    console.log(this.state.registrationusername)
    console.log(this.state.registrationusertype)
    console.log(this.state.registrationpassword)
    console.log(this.state.registrationname)

    axios.post('http://localhost:5000/adduser', {
        "admin": false,
        "name": this.state.registrationname,
        "username": this.state.registrationusername,
        "password": this.state.registrationpassword,
        "owner_type": this.state.registrationusertype
      })
      .then((response) => {
        console.log("response of RegistrationSubmitForm - Main Page")
        console.log(response);
        this.setState({ newusersuccessful: true})
        
      })
      .catch((error) => {
        console.log(error);
      });
    
    this.setState({openforregistration: false});
}

/**
     * Function for Organizing Data on the Table
     * @return {Array} Table Data in the form of array
     */
displayTableData(){
    let tempArrayList = []
    let tempAdminAccess = this.state.adminaccess
    console.log('Display Data Status')
    console.log(tempAdminAccess)
    if (tempAdminAccess == false){
        tempArrayList.push(
            <div key='0'>
                {/* <center><img src={"./logo0.jpg"} width = "50%" height="50%"></img></center>
                <center><p>AnimeFlix</p> <br /></center> */}
                <center><img src={"./a.jpg"} className="hover-zoom" width = "100%"></img></center>
            </div>
        )
    }else{
        tempArrayList.push(
            <div key='1'>
                <center><a href={configData.vid_1}><img src={"./a.jpg"} className="hover-zoom" width = "100%"></img></a></center>
                {/* <center><p>Attack on Titan</p> <br /></center> */}
                {/* <hr /> */}
                <center><a href={configData.vid_2}><img src={'./b.jpg'} width = "100%"></img></a></center>
                
                <center><a href={configData.vid_3}><img src={'./c.jpg'} width = "100%"></img></a></center>
                
                <center><a href={configData.vid_4}><img src={'./d.jpg'} width = "100%"></img></a></center>
                <center><a href={configData.vid_5}><img src={'./e.jpg'} width = "100%"></img></a></center>
                <center><a href={configData.vid_6}><img src={'./f.jpg'} width = "100%"></img></a></center>
            </div>
        )
    }
    return(
        tempArrayList
    )
}
// console.log("Check config here")
// console.log()
/**
     * Default Render Method of React
     * @return {ReactElement} HTML Codes
     */
render() {
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleSubmitClose}
        />,
      ];
    const registrationactions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleRegistrationClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleRegistrationSubmitClose}
        />,
    ];
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" >
                    {this.state.currentusername}
                </Typography>
                
                <Button color="inherit" onClick={this.handleOpen}>
                    {this.state.currentloginstatus}
                    <Dialog
                        title="Login"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        >
                        {this.loginform()}
                        </Dialog>
                    </Button>
                    <Button color="inherit" onClick={this.handleRegistrationOpen}>
                    {this.state.currentregistrationstatus}
                    <Dialog
                        title="Registration"
                        actions={registrationactions}
                        modal={false}
                        open={this.state.openforregistration}
                        onRequestClose={this.handleRegistrationClose}
                        >
                        {this.registrationform()}
                        </Dialog>
                    </Button>

                    <Typography variant="h6" >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

AnimeFlex
                </Typography>

                </Toolbar>
            </AppBar>
            <br />
            {this.displayTableData()}
            <br />
            
            {this.displayLogOutButton()}
            
            <Dialog
                title="Login Successful"
                modal={false}
                open={this.state.registrationsuccessful}
                onRequestClose={this.handleRegistrationSuccessfullClose}
                >
                {this.registrationsuccessfullform()}
                </Dialog>
            <Dialog
                title="Login UnSuccessful"
                modal={false}
                open={this.state.registrationunsuccessful}
                onRequestClose={this.handleRegistrationUnSuccessfullClose}
                >
                {this.registrationunsuccessfullform()}
                </Dialog>
            <Dialog
                title="New Registration Successful"
                modal={false}
                open={this.state.newusersuccessful}
                onRequestClose={this.handleNewRegistrationUnSuccessfullClose}
                >
                {this.newuserform()}
                </Dialog>
        </div>
    )
}
}

export default App;
