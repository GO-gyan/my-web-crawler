import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const styles = {
	paperStyle: {
		height: '60%',
  		width: '60%',
  		marginTop: '1%',
  		marginLeft: '20%',
  		display: 'inline-block',
  		background: '#e3f2fd'
	},
	headingStyle: {
		marginLeft: '5%'
	},
	mainStyle: {
		marginLeft: '10%'
	},
	urlStyle: {
		marginLeft: '15%'
	},
	locStyle: {
		marginLeft: '20%'
	}
};

class XMLTextDisplay extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const heading = "<?xml version='1.0' encoding='UTF-8'?>";
		const mainStart = "<sitemap>";
		const mainEnd = "</sitemap>";
		const urlStart = "<url>";
		const urlEnd = "</url>";
		const locStart = "<loc>"
		const locEnd = "</loc>";;
		const textList = this.props.xmlText.map((text, index) =>
			<div key={index}>
				<div style={styles.urlStyle}>{urlStart}</div>
					<div style={styles.locStyle}>{locStart}{text}{locEnd}</div>
				<div style={styles.urlStyle}>{urlEnd}</div>
			</div>
			);
		return(
				<Paper style={styles.paperStyle} zDepth={1}>
					<div style={styles.headingStyle}>{heading}</div>
					<div style={styles.mainStyle}>{mainStart}</div>
					{textList}
					<div style={styles.mainStyle}>{mainEnd}</div>
				</Paper>
			)
	}
}

export default XMLTextDisplay;