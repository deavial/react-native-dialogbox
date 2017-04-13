'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform, PixelRatio } from 'react-native';
import styleShape from './style-shape';
import makeStyleProxy from './make-stylesheet';

export default class PopContent extends Component {

	static propTypes = {
		title: PropTypes.string,
		content: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.arrayOf(PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			])),
		]),
		btns: PropTypes.array,
		style: PropTypes.shape(styleShape),
	};

	render() {
		const {title, content, btns, style} = this.props;
		const styleSheet = makeStyleProxy(style, Dimensions, Platform, PixelRatio)();
		const btnNumber = btns.length;
		const btnContent = [];
		Array.prototype.forEach.call(btns, (btn, index) => {
			btnContent.push(
				<TouchableOpacity style={btnNumber > 2 ? styleSheet.btnTextBoxMulti : styleSheet.btnTextBox} onPress={btn.callback} key={`btnTextBox${index}`}>
 					<Text style={[btnNumber > 2 ? styleSheet.btnTextTextBoxMulti : styleSheet.btnText, btn.style]}>{btn.text}</Text>
 				</TouchableOpacity>
			);
			index !== btnNumber - 1 && btnContent.push(<View style={styleSheet.line} key={`btnLine${index}`} />);
		});

		return (
			<View style={styleSheet.tipBox}>
				{ title && <View style={styleSheet.tipTitleBox}><Text style={styleSheet.tipTitle}>{title}</Text></View> }
				<View style={styleSheet.tipContentBox}>
					{(() => {
						let tipContent = [];
						if (content instanceof Array) {
							content.forEach((item, index, arr) => {
								if (index > 9) {
									return;
								}
								item && ( tipContent[index] = (<Text style={styleSheet.tipContent} key={`tipContent${index}`}>{item}</Text>) );
							});
						} else {
							content && ( tipContent[0] = (<Text style={styleSheet.tipContent} key={'tipContent'}>{content}</Text>) );
						}
						return tipContent;
					})()}
				</View>
				<View style={styleSheet.line}></View>
				<View style={btnNumber > 2 ? styleSheet.btnBoxMulti : styleSheet.btnBox}>
					{ btnNumber > 2 ? (btnContent) : (
						<View style={btnNumber > 2 ? styleSheet.btnBoxMulti : styleSheet.btnBox}>
							{btnContent}
						</View>
					)}
				</View>
			</View>
		);
	}

};
