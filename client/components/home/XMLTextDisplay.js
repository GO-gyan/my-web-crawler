import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const paperStyle = {
  height: '60%',
  width: '60%',
  marginTop: '1%',
  marginLeft: '20%',
  textAlign: 'center',
  display: 'inline-block',
  background: '#e3f2fd'
};

class XMLTextDisplay extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const text = this.props.xmlText;
		return(
				<Paper style={paperStyle} zDepth={1}>
					<h2>{text}</h2>
				</Paper>
			)
	}
}

export default XMLTextDisplay;