import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import AppTextInput from './AppTextInput';

class Home extends Component {
	render() {
		return(
			<div>
				<AppBar
    				title="Web Crawler"
    				iconClassNameRight="muidocs-icon-navigation-expand-more"
  				/>
  				<AppTextInput/>
  			</div>
			)
	}
}
export default Home;