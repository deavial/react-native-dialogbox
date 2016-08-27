'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';

export default class PopContent extends Component{

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
							content.forEach((item, index) => {
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

}
