import React, {
    Component
}
from "react";

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from './Home';
import Drivers from './Drivers';
import Circuits from './Circuits';
import Laptimes from './Laptimes';

import {Button, Segment} from 'semantic-ui-react';

export default class Header extends Component {

    render() {
    return  (
		
		 <div className="Header">
		  <Segment inverted raised>
		    <Button.Group>
          <Button inverted color='red' as={Link} to="/">Home</Button>
          <Button inverted color='red' as={Link} to="/Drivers">Drivers</Button>
		  <Button inverted color='red' as={Link} to="/Circuits">Circuits</Button>
		  <Button inverted color='red' as={Link} to="/Laptimes">Laptimes</Button>
        </Button.Group>
		  </Segment>
		
		  <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/Drivers' component={Drivers}/>
		<Route exact path='/Circuits' component={Circuits}/>
		<Route exact path='/Laptimes' component={Laptimes}/>
      </Switch>
		
		 </div>
		 );
    }
}