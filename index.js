'use strict';

import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	TouchableWithoutFeedback,
	PixelRatio,
	Platform,
} from 'react-native';

const _references = new WeakMap();

class DialogReferenceManager {
	constructor() {
		_references.set(this, {});
	}

	register(name, component) {
		if (component === void 0) {
			throw new Error('A DialogBox component is required to register it with the registry');
		}
		if (typeof name === 'string' && name.length > 0) {
			const storage = _references(this);
			if (storage) {
				if (storage[name] === void 0) {
					storage[name] = component;
					_references.set(this, storage);
				} else {
					throw new Error('A dialogbox with the name "' + name + '" was previously registered. Names must be unique and only one can act as "default"');
				}
			}
		} else {
			throw new Error('Attempt to register a dialogbox without a name occurred');
		}
	}

	unregister(name) {
		if (typeof name === 'string' && name.length > 0) {
			const storage = _references(this);
			if (storage && storage[name]) {
				delete storage[name];
				_references.set(this, storage);
			}
		} else {
			throw new Error('Attempt to unregister a dialogbox without a name occurred');
		}
	}

	dialogbox(name) {
		const id = (typeof name === 'string' && name.length > 0) ? name : 'default';
		const storage = _references(this);
		if (storage && storage[id]) {
			return storage[id];
		}
		return void 0;
	}

	alert(...text) {
		const component = this.dialogbox('default');
		if (component) {
			component.alert(...text);
		} else {
			console.warn('An alert request to the default dialogbox was made, but no dialogbox was registered as default');
		}
	}

	tip(args) {
		const component = this.dialogbox('default');
		if (component) {
			component.tip(args);
		} else {
			console.warn('A tip request to the default dialogbox was made, but no dialogbox was registered as default');
		}
	}

	confirm(args) {
		const component = this.dialogbox('default');
		if (component) {
			component.confirm(args);
		} else {
			console.warn('A confirm request to the default dialogbox was made, but no dialogbox was registered as default');
		}
	}

	close() {
		const component = this.dialogbox('default');
		if (component) {
			component.close();
		} else {
			console.warn('A close request to the default dialogbox was made, but no dialogbox was registered as default');
		}
	}
}

const dialogReferenceManager = Object.freeze(new DialogReferenceManager());
export { dialogReferenceManager as DialogReferenceManager }

class PopContent extends Component{

	static propTypes = {
		title: PropTypes.string,
		content: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.arrayOf(PropTypes.oneOfType({
				PropTypes.string,
				PropTypes.number
			})),
		]),
		btns: PropTypes.array,
	};

  constructor(props, context) {
    super(props, context);
  }

	render() {
		let {title, content, btns} = this.props;
		let btnNumber = btns.length;
		return (
			<View style={styles.tipBox}>
				{ title && <View style={styles.tipTitleBox}><Text style={styles.tipTitle}>{title}</Text></View>}
				<View style={styles.tipContentBox}>
					{(() => {
						let tipContent = [];
						if(content instanceof Array){
							content.forEach((item, index, arr) => {
								if(index > 9){
									return;
								}
								item && ( tipContent[index] = (<Text style={styles.tipContent} key={'tipContent' + index}>{item}</Text>) );
							});
						}else{
							content && ( tipContent[0] = (<Text style={styles.tipContent} key={'tipContent'}>{content}</Text>) );
						}
						return tipContent;
					})()}
				</View>
				<View style={styles.line}></View>
				<View style={[styles.btnBox, btnNumber > 2 ? {flexDirection: 'column',} : {}]}>
					{(() => {
						let btnContent = [];
						btns.forEach((btn, index,) => {
							btnContent.push(
								<TouchableOpacity style={styles.btnTextBox} onPress={btn.callback} key={'btnTextBox' + index}>
									<Text style={styles.btnText}>{btn.text}</Text>
								</TouchableOpacity>
							);
							index != btnNumber - 1 && btnContent.push( <View style={styles.btnLine} key={'btnLine' + index} /> );
						});
						return btnContent;
					})()}
				</View>
			</View>
		);
	}

};

class DisplayPopup extends Component{

	static defaultProps = {
		isOverlay: true,
		isOverlayClickClose: true,
		btns: [{
			text: 'ok',
			callback: () => {},
		}],
	};

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
		let { isVisible, isOverlay, } = this.state;
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

};

export default class DialogBox extends Component{

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
			dialogReferenceManager.register(this.props.name, this);
		}
	}

	componentWillUnmount() {
		if (this.props.name) {
			dialogReferenceManager.unregister(this.props.name);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.name !== nextProps.name) {
			if (this.props.name) {
				dialogReferenceManager.unregister(this.props.name);
			}
			if (nextProps.name) {
				dialogReferenceManager.register(nextProps.name, this);
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
			title: args.title,
			content: args.content,
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
		let { isVisible, isOverlay, } = this.state;
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

};

let styles = StyleSheet.create({
	popupContainer: {
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		overflow: 'hidden',
		backgroundColor: 'rgba(00, 00, 00, 0)',
	},
	overlay: {
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		backgroundColor: '#000',
		opacity: .5,
	},
	tipBoxView: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('window').width - 50,
		borderRadius: 12,
		overflow: 'hidden',
	},
	tipBox: {
		flex: 1,
		paddingTop: 15,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tipTitleBox: {
		height: 30,
		width: Dimensions.get('window').width - 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tipTitle: {
		fontSize: 19,
		fontWeight: '500',
		textAlign: 'center',
	},
	tipContentBox: {
		flex: 1,
		flexDirection: 'column',
		marginBottom: 15,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tipContent: {
		fontSize: 16,
		marginBottom: 5,
		textAlign: 'center',
	},
	line: {
		height: 1 / PixelRatio.get(),
		width: Dimensions.get('window').width - 50,
		backgroundColor: '#ddd',
	},
	btnBox: {
		width: Dimensions.get('window').width - 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
	},
	btnTextBox: {
		flex: 1,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnLine: {
		height: 50,
		width: 1 / PixelRatio.get(),
		backgroundColor: '#ddd',
	},
	btnText: {
		textAlign: 'center',
		fontSize: 16,
		color: '#149be0',
	},
	hidden: {
		position: 'absolute',
		height: 0,
		width: 0,
		top: 0,
		left: 0,
	},
});

if(Platform.OS === 'ios'){
	styles = {
		...styles,
		tipTitle: {
			fontSize: 20,
			fontWeight: '500',
			textAlign: 'center',
		},
		tipContent: {
			fontSize: 16,
			marginTop: 3,
			marginBottom: 7,
			textAlign: 'center',
		},
	}
}
