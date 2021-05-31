import React, { Component } from 'react';
import {DI} from './DomainInfo';

class Laptimes extends Component {
	
	constructor(props){
	    super(props);
        this.state = { loading: true, the_circuits: [],
		    the_races: [], the_laps: [], the_results: [],
			selectedName: "", selectedCircuitId: "", 
			selectedRaceId: ""};
		this.selectCircuit = this.selectCircuit.bind(this);
		this.selectRace = this.selectRace.bind(this);
    }
	
	async componentDidMount(){
		const response = await fetch(DI + "/get_circuits");
	    const data = await response.json();
		this.setState({ the_circuits: data, loading: false});
    }
	
	async retrieve_races(){
		const response = await fetch(DI + "/get_races",{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
              "circuitId": this.state.selectedCircuitId
            })
		});
		const data = await response.json();
		this.setState({ the_races: data});
	}
	
	async retrieve_laps(){
		const response = await fetch(DI + "/get_laps",{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
              "raceId": this.state.selectedRaceId
            })
		});
		const data = await response.json();
		this.setState({ the_laps: data});
	}
	
	async retrieve_results(){
		const response = await fetch(DI + "/get_results",{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
              "raceId": this.state.selectedRaceId
            })
		});
		const data = await response.json();
		this.setState({ the_results: data});
	}
	
	async selectCircuit(circuitId, circuitName) {
        await this.setState({selectedCircuitId: circuitId, 
		    selectedName: circuitName, 
			the_laps: [], the_results: []});
		this.retrieve_races();
    }
	
	async selectRace(raceId) {
        await this.setState({selectedRaceId: raceId});
		this.retrieve_laps();
		this.retrieve_results();
		
    }
	
	render(){
		if (this.state.loading){
			return <div>loading...</div>;
		}
		
		const CircuitList = this.state.the_circuits.map(c => (
	    <div className="four wide column" key = {c.circuitId}>
		    <button className="ui inverted button" onClick={() => this.selectCircuit(c.circuitId, c.name)}>
			{c.name + '-'+ c.location + ', ' + c.country}</button>
		</div>
	    ) );
		
		const RaceList = this.state.the_races.map(r => (
	    <div className="four wide column" key = {r.raceId}>
		    <button className="ui inverted button" onClick={() => this.selectRace(r.raceId)}>
			{r.name + '-'+ r.year}</button>
		</div>
	    ) );
		
		const LapsTable = (
			<div class="ui raised padded text container inverted segment">
			<table class="ui striped inverted table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Lap</th>
                <th>Time</th>
				<th>Position</th>
                </tr>
            </thead>
            <tbody>
    
	            {this.state.the_laps.map(l => (
				<tr>
                <td>{l.forename + ' ' + l.surname}</td>
                <td>{l.lap}</td>
                <td>{l.time}</td>
				<td>{l.position}</td>
                </tr>
                ))}

            </tbody>
            </table>
			</div>
		);
		
		const ResultsTable = (
			<div class="ui raised padded text container inverted segment">
			<table class="ui striped inverted table">
            <thead>
                <tr>
                <th>Name</th>
				<th>Time</th>
                <th>Fastest Laptime</th>
				<th>Position</th>
				<th>Nationality</th>
                </tr>
            </thead>
            <tbody>
    
	            {this.state.the_results.map(r => (
				<tr>
                <td>{r.forename + ' ' + r.surname}</td>
                <td>{r.time}</td>
                <td>{r.fastestLapTime}</td>
				<td>{r.position}</td>
				<td>{r.nationality}</td>
                </tr>
                ))}

            </tbody>
            </table>
			</div>
		);
		
		
		
        return (
            <div className="Simulator">
			<div className="ui grid">
			{CircuitList}
			</div>
		    <h1>{this.state.selectedName}</h1>
				<div className="ui grid">{RaceList}</div>
			
			<div class="ui two column grid">
			<div class="column" width="50%">
			<h1>Laptimes</h1>
			<div>{LapsTable}</div>
			</div>
			
			<div class="column" width="50%">
			<h1>Results</h1>
			<div>{ResultsTable}</div>
			</div>
			</div>
			
		    </div>
        );
	}
}

export default Laptimes;