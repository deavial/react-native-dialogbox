'use strict';

import React, { Component, PropTypes } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import PopContent from './PopContent';
import DisplayPopup from './DisplayPopup';
import styles from './Styles';
import DialogReferenceManager from './DialogReferenceManager';

export default class DialogBox extends Component {

	static DisplayPopup = DisplayPopup;

	static propTypes = {
		name: PropTypes.string,
		isOverlay: PropTypes.bool,
		isOverlayClickClose: PropTypes.bool
	};

	static defaultProps = {
		isOverlay: true,
		isOverlayClickClose: true,
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			isVisible: false,
			isOverlay: this.props.isOverlay,
			isOverlayClickClose: this.props.isOverlayClickClose,
			content: null,
		};
	}

	componentDidMount() {
		if (this.props.name) {
			DialogReferenceManager.register(this.props.name, this);
		}
	}

	componentWillUnmount() {
		if (this.props.name) {
			DialogReferenceManager.unregister(this.props.name);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.name !== nextProps.name) {
			if (this.props.name) {
				DialogReferenceManager.unregister(this.props.name);
			}
			if (nextProps.name) {
				DialogReferenceManager.register(nextProps.name, this);
			}
		}
	}

	_pop(args) {
		this.setState({
			content: ( <PopContent {...args}/> ),
			isVisible: true,
		});
	}

	alert(...text) {
		text = text.map((text) => text);
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

	tip(args) {
		let {title, content, btn,} = args;
		this._pop({
			title: title || 'Tip',
			content: content,
			btns: [{
				text: btn && btn.text || 'OK',
				callback: () => {
					this.close();
					btn && typeof btn.callback === 'function' && btn.callback();
				},
			}],
		});
	}

	confirm(args) {
		let {title, content, ok, cancel,} = args;
		this._pop({
			title: title,
			content: content,
			btns: [
				{
					text: cancel && cancel.text || 'Cancel',
					callback: () => {
						this.close();
						cancel && typeof cancel.callback === 'function' && cancel.callback();
					},
				},
				{
					text: ok && ok.text || 'OK',
					callback: () => {
						this.close();
						ok && typeof ok.callback === 'function' && ok.callback();
					},
				},
			],
		});
	}

	pop(args) {
		this._pop(args);
	}

	close() {
		this.setState({
			isVisible: false,
		});
	}

	_renderOverlay() {
		if(this.state.isOverlay) {
			return (
				<TouchableWithoutFeedback onPress={() => {
					if(this.state.isOverlayClickClose) {
						this.close();
					}
				}}>
					<View style={styles.overlay}></View>
				</TouchableWithoutFeedback>
			);
		}
	}

	_renderContent() {
		return (
			<View style={styles.tipBoxView}>
				{this.state.content}
			</View>
		);
	}

	render() {
		let { isVisible, } = this.state;
		if(isVisible) {
			return (
				<View style={styles.popupContainer}>
					{this._renderOverlay()}
					{this._renderContent()}
				</View>
			);
		}
		return <View style={styles.hidden}/>;
	}

}
