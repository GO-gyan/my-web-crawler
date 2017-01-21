import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';

const paperStyle = {
  height: '60%',
  width: '60%',
  marginTop: '1%',
  marginLeft: '20%',
  textAlign: 'center',
  display: 'inline-block',
  background: '#e3f2fd'
};

class PlainTextDisplay extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const text = this.props.plainText;
		return(
				<Paper style={paperStyle} zDepth={1}>
					<List>
						<ListItem>{text}</ListItem>
						<ListItem>{text}</ListItem>
					</List>
				</Paper>
			)
	}
}

export default PlainTextDisplay;