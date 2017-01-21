import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Crawler from '../../services/app.service.js';
import PlainTextDisplay from './PlainTextDisplay';
import XMLTextDisplay from './XMLTextDisplay';

const paperStyle = {
  height: '60%',
  width: '60%',
  marginTop: '5%',
  marginLeft: '20%',
  textAlign: 'center',
  display: 'inline-block',
};
const buttonStyle = {
  margin: 12,
};

class AppTextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			website: '',
			plainText: '',
			isText: false,
			xmlText: ''
		}
		this.submitData = this.submitData.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({website: e.target.value})
	}
	submitData() {
		console.log('okoko', this.state.website);
		Crawler.crawl(this.state.website, (data) => {
			console.log(data);
			this.setState({
				plainText: data.plainText,
				xmlText: data.xmlText,
				isText: true
			})
		});
	}
	render() {
		return(
			<div>
				<Paper style={paperStyle} zDepth={3}>
					<TextField
      					hintText="example.com"
      					floatingLabelText="Enter Website URL"
      					floatingLabelFixed={true}
      					fullWidth={true}
      					onChange={this.handleChange}
    				/><br/>
    				<RaisedButton label="Crawl" primary={true} style={buttonStyle} onClick={this.submitData}/>
    			</Paper>
    			{ this.state.isText ? 
    				<div><PlainTextDisplay plainText={this.state.plainText} /><br/><XMLTextDisplay xmlText={this.state.xmlText} /></div> : ''}
    		</div>
			)
	}
}
export default AppTextInput;