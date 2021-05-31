import React, { Component } from 'react';
import './App.css';
import RaceArchivesLogo from './RaceArchivesLogo';
import Header from './Header';
//import 'semantic-ui-css/semantic.min.css';
//import 'semantic-ui-react';

export default class App extends Component {
	
	
	render(){
        return (
            <div className="App">
			<RaceArchivesLogo/>
			<Header/>
	        </div>
        );
	}
}
