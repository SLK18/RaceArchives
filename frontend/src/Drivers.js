import React, { Component } from 'react';
import {DI} from './DomainInfo';


class Drivers extends Component {
	
	constructor(props){
	    super(props);
        this.state = { loading: true, thedrivers: [],
		selectedname: ''};
    }
	
	async componentDidMount(){
		const response = await fetch(DI + "/get_drivers");
	    const data = await response.json();
		this.setState({ the_drivers: data, loading: false});
    }
	
	render(){
		if (this.state.loading){
			return <div>loading...</div>;
		}
		
	const DriversList = this.state.the_drivers.map(driver => (
	    <div className="four wide column" key = {driver.driverId}>
		    <a href={driver.url}>
		    <button className="ui inverted button">{driver.forename + ' ' 
			+ driver.surname + ' - ' + driver.nationality}</button>
			</a>
		</div>
	) );
		
        return (
            <div className="Drivers">
			<div className="ui grid">
			{DriversList}
			</div>
		    </div>
        );
	}
}

export default Drivers;