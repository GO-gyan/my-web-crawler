import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
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
			open: false,
			xmlText: '',
			errorMessage: ''
		}
		this.submitData = this.submitData.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
	}
	handleChange(e) {
		this.setState({website: e.target.value})
	}
	handleRequestClose() {
    	this.setState({
      		open: false,
    	});
  	}
	submitData() {
		// Domain name regular expression
        var regex = new RegExp("^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
		if(regex.test(this.state.website)) {
			Crawler.crawl(this.state.website, (data) => {
				console.log(data);
				if(!data.error) {
					this.setState({
						plainText: data.text,
						xmlText: data.text,
						isText: true
					})
				} else {
					this.setState({
      					open: true,
      					isText: false,
      					plainText: '',
						xmlText: '',
						errorMessage: data.text
    				});
				}
			});
		}else {
			this.setState({
      			open: true,
      			isText: false,
      			plainText: '',
				xmlText: '',
				errorMessage: 'Please enter url in example.com format'
    		});
		}
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
    				<Snackbar
          				open={this.state.open}
          				message={this.state.errorMessage}
          				autoHideDuration={4000}
          				onRequestClose={this.handleRequestClose}
        			/>
    		</div>
			)
	}
}
export default AppTextInput;