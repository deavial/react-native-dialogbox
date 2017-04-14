'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, Platform, PixelRatio } from 'react-native';
import PopContent from './PopContent';
import DisplayPopup from './DisplayPopup';
import styleShape from './style-shape';
import makeStyleProxy from './make-stylesheet';

export default class DialogBox extends Component {

	static DisplayPopup = DisplayPopup;

	static PropTypes = {
		isOverlay: PropTypes.bool,
		isOverlayClickClose: PropTypes.bool,
		onDismiss: PropTypes.func,
		style: PropTypes.shape(styleShape),
	}

	static defaultProps = {
		isOverlay: true,
		isOverlayClickClose: true,
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			isVisible: false,
			content: null,
		};
	}

	_onOverlayDismiss = () => {
		const { isOverlayClickClose, onDismiss } = this.props;
		if (isOverlayClickClose) {
			if (onDismiss && typeof onDismiss === 'function') {
				onDismiss();
			}
			this.close();
		}
	}

	_pop = (args) => {
		this.setState({
			content: ( <PopContent {...args} style={this.props.style} /> ),
			isVisible: true,
		});
	}

	alert = (...text) => {
		text = text.map(text => text);
		this._pop({
			content: text || '',
			btns: [{
				text: 'OK',
				callback: () => {
					this.close();
				},
			}],
		});
	}

	tip = (args) => {
		const { title, content, btn } = args;
		this._pop({
			title: title || 'Tip',
			content: content,
			btns: [{
				text: btn && btn.text || 'OK',
				style: btn && btn.style,
				callback: () => {
					this.close();
					btn && typeof btn.callback === 'function' && btn.callback();
				},
			}],
		});
	}

	confirm = (args) => {
		const {title, content, ok, cancel } = args;
		this._pop({
			title,
			content,
			btns: [
				{
					text: cancel && cancel.text || 'Cancel',
					style: cancel && cancel.style,
					callback: () => {
						this.close();
						cancel && typeof cancel.callback === 'function' && cancel.callback();
					},
				},
				{
					text: ok && ok.text || 'OK',
					style: ok && ok.style,
					callback: () => {
						this.close();
						ok && typeof ok.callback === 'function' && ok.callback();
					},
				},
			],
		});
	}

	pop = (args) => {
		this._pop(args);
	}

	close = () => {
		this.setState({
			isVisible: false,
		});
	}

	_renderOverlay = (styles) => {
		const { isOverlay } = this.props;

		if(isOverlay) {
			return (
				<TouchableWithoutFeedback onPress={this._onOverlayDismiss}>
					<View style={styles.overlay}></View>
				</TouchableWithoutFeedback>
			);
		}
		return null;
	}

	_renderContent = (styles) => {
		return (
			<View style={styles.tipBoxView}>
				{this.state.content}
			</View>
		);
	}

	render() {
		const { isVisible } = this.state;
		const { style } = this.props;
		const styles = makeStyleProxy(style, Dimensions, Platform, PixelRatio)();

		if(isVisible) {
			return (
				<View style={styles.popupContainer}>
					{this._renderOverlay(styles)}
					{this._renderContent(styles)}
				</View>
			);
		}
		return <View style={styles.hidden} />;
	}

};
