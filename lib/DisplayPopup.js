import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableWithoutFeedback, PixelRatio, Platform } from 'react-native';
import PopContent from './PopContent';
import styleShape from './style-shape';
import makeStyleProxy from './make-stylesheet';

export default class DisplayPopup extends Component {

	static propTypes = {
		isOverlay: PropTypes.bool,
		isOverlayClickClose: PropTypes.bool,
		onDismiss: PropTypes.func,
		style: PropTypes.shape(styleShape),
		content: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.arrayOf(PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			])),
		]),
		title: PropTypes.string,
		btns: PropTypes.arrayOf(PropTypes.shape({
			text: PropTypes.string.isRequired,
			style: PropTypes.object,
			callback: PropTypes.func,
		})),
		buttonFlow: PropTypes.oneOf(['auto', 'column', 'row']),
	}

	static defaultProps = {
		isOverlay: true,
		isOverlayClickClose: true,
		buttonFlow: 'auto',
		btns: [{
			text: 'ok',
			callback: () => {},
		}],
		style: {}
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			isVisible: true,
		};

	}

	close = () => {
		this.setState({
			isVisible: false,
		});
	}

	_onOverlayPress = () => {
		const { isOverlayClickClose, onDismiss } = this.props;
		if (isOverlayClickClose) {
			this.close();
			if (onDismiss && typeof onDismiss === 'function') {
				onDismiss();
			}
		}
	}

	_renderOverlay = (styles) => {
		const { isOverlay } = this.props;
		if(isOverlay) {
			return (
				<TouchableWithoutFeedback onPress={this._onOverlayPress}>
					<View style={styles.overlay}></View>
				</TouchableWithoutFeedback>
			);
		}
	}

	render() {
		let { isVisible } = this.state;
		const { title, content, btns, style, buttonFlow } = this.props;
		const styles = makeStyleProxy(style, Dimensions, Platform, PixelRatio)();
		const buttons = btns.map((item) => {
			return {
				text: item.text,
				style: item.style || {},
				callback: () => {
					typeof item.callback === 'function' && item.callback();
					this.close();
				},
			};
		});
		if(isVisible) {
			return (
				<View style={styles.popupContainer}>
					{this._renderOverlay(style)}
					<View style={styles.tipBoxView}>
						<PopContent title={title} content={content} btns={buttons} style={this.props.style} buttonFlow={buttonFlow} />
					</View>
				</View>
			);
		}
		return <View style={styles.hidden}/>;
	}

};
