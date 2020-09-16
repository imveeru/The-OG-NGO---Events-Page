import React,{ Component } from 'react';
import './style_events.css';
import "./Modal.css";
import Modal from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const style=("display: inline font-size: 1rem padding-bottom: 20px");

class Event extends Component {
  constructor (props){
    super(props);
    this.state={
      readMore: false,
      showModal: 0
    }
    this.toggle = this.toggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  
  toggle() {
    this.setState({ readMore: !this.state.readMore })
  }

  openModal = value => {
    this.setState({ showModal: value });
  };

  hideModal = value => {
    this.setState({ showModal: 0 });
  };
  
  render(){
    return (

      <div className="event">
        <section key={this.props.id}  name="content" className={this.state.readMore?"showcontent":"box"}>

                      <i className="far fa-calendar-alt"></i>  <span style={{style}} className="date">{this.props.date}</span>
                      <h3>{this.props.name}</h3>
                      <p>{this.props.details}</p>    
                      <button name="readmore" id={this.props.id} className="readmore" onClick={this.toggle}>{this.state.readMore?"Read Less":"Read More"}</button> <button type="button" className="enrollbtn"  onClick={()=>this.openModal(this.props.id)}>Enroll</button>
        </section>             
              <Modal
              show={this.state.showModal === this.props.id}
              onHide={() => this.hideModal(this.props.id)}
              name={this.props.name}
              eventid={this.props.id}
              />
      </div>
    )
  }
}

export default Event