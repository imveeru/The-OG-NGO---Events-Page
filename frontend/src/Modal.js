import React, { Component } from "react";
import "./Modal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const style_hr=("width:80%");

class Modal extends Component {

    constructor(props) {
      super(props)
      this.state = {
          name: '',
          email: '',
          mobile: '',
          eventid:'',
          msg:'',
          toast:false,
          alert:false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.logChange=this.logChange.bind(this);
  }

  handleSubmit(event,eventid) {
      event.preventDefault();
      var data = {
          name: this.state.name,
          email: this.state.email,
          mobile:this.state.mobile,
          eventid:eventid
      }
      console.log(data);
      fetch("/", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      }).then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          console.log(data)    
          if(data.toast === true){
            console.log("Successfully Enrolled !");
            toast('🥳Enrolled Sucessfully !',{position: "top-center",autoClose: 3000});
            //this.setState({msg: "Enrolled Successfully!"}); 
          }
          if(data.alert===true){
            console.log("Mobile Number has been already enrolled.");
            toast.error('Oops! This mobile number has been already enrolled.',{position: "top-center",autoClose: 3000});
          }
      }).catch(function(err) {
          console.log(err)
      });
  }

  logChange(e) {
      this.setState({[e.target.name]: e.target.value});  
  }

 

  render() {
    console.log(this.props.show);
    console.log(this.props.eventid);
    return (
      <React.Fragment>
        {this.props.show && (
           <div className="popup-window"> 
                <div className="popup">
                    <h3>Enroll for {this.props.name}</h3>
                    <hr style={{style_hr}}></hr>

                    <form onSubmit={event=>this.handleSubmit(event,this.props.eventid)} method="POST" >
                      <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input type="text" className="form-control" id="name" name="name" onChange={this.logChange}  placeholder="Enter name..." required/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="email">eMail</label>
                          <input type="email" className="form-control" id="email" name="email" onChange={this.logChange}  placeholder="Enter email..." required/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="name">Mobile Number</label>
                          <input type="tel" minLength="10" pattern="[0-9]{10}" maxLength="10" className="form-control" id="mobile" name="mobile" onChange={this.logChange}  placeholder="Enter mobile number..." required/>
                      </div>

                      <input hidden name="eventid" defaultValue={this.props.eventid} ref="eventid" ></input>
                      
                      <hr style={{style_hr}}></hr>
                  
                      <button className="closeform" onClick={this.props.onHide}>Close</button> <button className="submitform" type="submit">Enroll</button>

                    </form>
                </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Modal;
