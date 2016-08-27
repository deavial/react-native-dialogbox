'use strict';

import React, { Component, PropTypes } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import PopContent from './PopContent';
import styles from './Styles';

export default class DisplayPopup extends Component{

	static defaultProps = {
		isOverlay: true,
		isOverlayClickClose: true,
		btns: [{
			text: 'ok',
			callback: () => {},
		}],
	};

	static propTypes = {
		isOverlay: PropTypes.bool,
		isOverlayClickClose: PropTypes.bool,
		title: PropTypes.string,
		content: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.arrayOf(PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			])),
		]),
		btns: PropTypes.array
	}

	constructor(props, context) {
		super(props, context);

		this.state = {
			isVisible: true,
		};

	}

	close() {
		this.setState({
			isVisible: false,
		});
	}

	_renderOverlay() {
		if(this.props.isOverlay) {
			return (
				<TouchableWithoutFeedback onPress={() => {
					if(this.props.isOverlayClickClose) {
						this.close();
					}
				}}>
					<View style={styles.overlay}></View>
				</TouchableWithoutFeedback>
			);
		}
	}

	render() {
		let { isVisible, } = this.state;
		let { title, content, btns, } = this.props;
		btns = btns.map((item) => {
			return {
				text: item.text,
				callback: () => {
					typeof item.callback === 'function' && item.callback();
					this.close();
				},
			};
		});
		if(isVisible) {
			return (
				<View style={styles.popupContainer}>
					{this._renderOverlay()}
					<View style={styles.tipBoxView}>
						<PopContent title={title} content={content} btns={btns} />
					</View>
				</View>
			);
		}
		return <View style={styles.hidden}/>;
	}

}
