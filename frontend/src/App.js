import React,{ Component } from 'react';
import './style_events.css';
import "./Modal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Event from './events'

class App extends Component{

    constructor(props){
      super(props);
      this.state={
        events:[]
      }
    }
  
    componentDidMount(){
  
      fetch("/events",{method: 'GET'}).then((res) => {
            if (res.status >= 400){
              console.log(res.status);
              }
            return res.json();
          }).then((data) => {
            this.setState({events:data});
          }).catch((err) => {
            console.log('ERROR!',err);
          });
  
    }
    render() {
      return(
        <div className="App"> 
        <div className="container">     
        {
          this.state.events.map((event) => <Event {...event} /> )
        }
        </div>
        </div>  
      )
  }
  
  }
  
  export default App