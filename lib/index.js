import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, Dimensions, Platform, PixelRatio } from 'react-native';
import PopContent from './PopContent';
import DisplayPopup from './DisplayPopup';
import styleShape from './style-shape';
import makeStyleProxy from './make-stylesheet';

export default class DialogBox extends Component {

	static DisplayPopup = DisplayPopup;

	static propTypes = {
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
			this.close();
			if (onDismiss && typeof onDismiss === 'function') {
				onDismiss();
			}
		}
	}

	_pop = (args) => {
		if (this._resolve) {
			this._resolve({ index: -1, button: undefined });
		}
		const transformed = Object.assign({}, args, {
			btns: Array.prototype.map.call(args.btns, (item, index) => (Object.assign({}, item, {
				callback: () => {
					const resolve = this._resolve;
					this._resolve = null;
					const { callback, ...button} = item;
					if (callback) {
						callback();
					}
					resolve({ index, button });
				}
			})))
		});
		return new Promise((resolve, reject) => {
			this._resolve = resolve;
			this.setState({
				content: ( <PopContent {...transformed} style={this.props.style} /> ),
				isVisible: true,
			});
		});
	}

	alert = (...text) => {
		text = text.map(text => text);
		return this._pop({
			content: text || '',
			buttonFlow: 'column',
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
		return this._pop({
			title: title || 'Tip',
			buttonFlow: 'row',
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
		return this._pop({
			title,
			buttonFlow: 'row',
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
		return this._pop(args);
	}

	close = () => {
		if (this._resolve) {
			this._resolve({ index: -1, button: undefined });
			this._resolve = null;
		}
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
