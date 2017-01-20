import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout from './layout/Layout';
import Home from './home/Home';

class App extends Component {
	render() {
		return(
			<Router history={hashHistory}>
				<Route path="/" component={Layout}>
					<IndexRoute component={Home}></IndexRoute>
				</Route>
			</Router>
			)
	}
}

export default App;