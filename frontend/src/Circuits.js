import React, { Component } from 'react';
import {DI} from './DomainInfo';

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

//Referenced https://codesandbox.io/s/custom-markers-example-1btd7?from-embed=&file=/src/MapChart.js
class Circuits extends Component {
	
	constructor(props){
	    super(props);
        this.state = { loading: true, thecircuits: []};
    }
	
	async componentDidMount(){
		const response = await fetch(DI + "/get_circuits");
	    const data = await response.json();
		this.setState({ the_circuits: data, loading: false});
		
    }
	
	
	render(){
		if (this.state.loading){
			return <div>loading...</div>;
		}
	
	
	const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
	
	const CircuitList = this.state.the_circuits.map((c, i) => (
	    <div className="four wide column" key = {c.circuitId}>
		    <a href={c.url}>
		    <button className="ui inverted button">{c.name + '-' 
			+ c.location + ', ' + c.country}</button>
			</a>
		</div>
	) );
	
	const TheMarkers = this.state.the_circuits.map(c => (
	    <a href={c.url}>
	    <Marker key = {c.circuitId} coordinates = {[c.lng, c.lat]}>
		    <circle r={1} fill="red" opacity={.6}/>
			<text textAnchor="middle" y={-1}
            style={{ fontFamily: "system-ui", 
			fill: "#4a4141", fontSize: "1px"}}>
			  {c.name}
            </text>
		</Marker>
		</a>
	) );
	
	
        return (
            <div className="Circuits">
			<h1>Track Locations:</h1>
			<div class="ui raised container inverted segment">
      <ComposableMap>
	    <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo}
                fill="white"
                stroke="gray"
				/>
              ))
            }
          </Geographies>
		  {TheMarkers}
		</ZoomableGroup>
      </ComposableMap>
	  </div>
	  <div className="ui grid">
			{CircuitList}
			</div>
		</div>
        );
	}
}

export default Circuits;