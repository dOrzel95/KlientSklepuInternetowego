import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
class Confirm extends Component {

    _isMount = false

    xxxx = false;
    state = {
        confirm: 0,
        
    }
    downloadData = () => {
        fetch("http://localhost:8080/montanashop/activate-account/" + this.props.match.params.id.slice(1, this.props.match.params.id.length)).then(res => res.text()).then(res => {
            
        if(res==="true"){
            this.setState({
                confirm:1
            })
        }else{
            this.setState({
                confirm:2
            })
        }
    });
    }

     componentDidMount(){
         this.downloadData()
    }

    componentWillUnmount(){
        this._isMount=false
    }

    render (){
        return(
            <div className="Loading">
                {this.state.confirm ===1?<Redirect to="/login"/>:""}
                {this.state.confirm ===2?<Redirect to="/register"/>:""}
            </div>
        )
    } 
  
}
export default Confirm