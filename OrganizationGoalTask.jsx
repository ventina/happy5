import React, { Component } from "react";
import { Link } from 'react-router';
import { Select } from 'antd';
import Col from '../components/Col.jsx';
import Axios from "axios";

class OrganizationGoalTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            showgoaltype: false,
            error: false,
            data: [],
            posts:""
        }
        this.handleChangeType = this.handleChangeType.bind(this)
        this.handleSaveButton = this.handleSaveButton.bind(this)
        this.getData = this.getData.bind(this)
        this.postData = this.postData.bind(this)
    }

    handleChangeType(value) {
        console.log(value)
        value === 'type' ?
        (
            this.setState({ showgoaltype: true})
        ) 
        : 
        (
            this.setState({ showgoaltype: false})
        )
    }

    handleSaveButton(e){
        console.log('event: ' , e.target)
        this.postData()
    }

    componentDidMount(){
        this.getData()
       
    }

    getBaseUrl(){
        return Config.axiosHost;
    }

    getConfig(){
        let token = getServerToken();
        let config = {
            headers : {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }
        return config;
    }

    getData(){
        Axios.get('http://www.mocky.io/v2/5d1045ba30000096034c9e98')
        .then(respond => {
            this.setState({
                data: respond.data.data
            })
        })
        .catch(error => {
            this.setState({
                error: true
            })
            
        })
    }

    postData(){
        const type = {
            name: this.state.name,
            weight: this.state.weight,
            color: this.state.color,
        }
        Axios.post(this.getBaseUrl()+ 'http://www.mocky.io/v2/5d1045ba30000096034c9e98', {
            // data: this.state.type
        }, this.getConfig())

            .then(res => {
            console.log("res", res);
            this.setState({
                data: res.data.data
            })
        })
    }
    
    render(){
        return (
            <Col id="dashboard_content" xs={10}>
                <div className = "goal-page-container">
                    <div className ="goal-page">
                        <div className = "goal-header"> <h2> Goal / Task </h2> </div>
                        <Link to="/logout" className="signout">Logout</Link>
                    </div>

                    <div className = "goal-weight-box">
                       <div className= "title-goal-page">Goal Weight</div> 
                        
                        <div className = "choose-goal-container">
                            <div className = "choose-goal"> Choose Goal Weight: </div>
                            
                            <Select defaultValue="Percentage" onChange={this.handleChangeType}>
                                <Option value="percentage"> Percentage </Option>
                                <Option value="type"> Type </Option>
                            </Select>
                        </div>

                        {this.state.showgoaltype && (<div className="container-weight-type">
                                {console.log("ventine", this.state.data)}
                                {
                                    this.state.data.map((value, index) => {
                                        return(
                                            <div className = "type-input-container">
                                                <div className = "type"> Type {index+1} : <input type="text" placeholder={value.name} /> </div>
                                                <div className = "weight"> Weight : <input type="text" placeholder ={value.weight}/> </div> 
                                                <div className = "color-container"> Color :  
                                                    <div className = "color" style={{backgroundColor: value.color}}> </div> 
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>)}
                        <div className = "save">
                            <button className="btn-save" onClick = {this.handleSaveButton}> Save </button>
                        </div>
                    </div>
                </div>
            </Col>
        );
    }
}

export default OrganizationGoalTask;