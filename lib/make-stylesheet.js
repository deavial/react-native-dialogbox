import React from 'react';
import { StyleSheet } from 'react-native';
import defaultStyleProxy from './styles';

export default (style, dimensions, platform, pixelRatio) => {
	const defaultStyle = defaultStyleProxy(dimensions, platform, pixelRatio);
	const override = style || {};
	let newStyle = defaultStyle;
	const hasOwnProperty = Object.prototype.hasOwnProperty;
	for (const name of Object.keys(override)) {
		if (hasOwnProperty.call(defaultStyle, name) && hasOwnProperty.call(override, name)) {
			newStyle = Object.assign({}, newStyle, { [name]: override[name] });
		}
	}
	const styleSheet = StyleSheet.create(newStyle);
	return (name) => {
		if (name && typeof name === 'string' && name.trim().length > 0) {
			return styleSheet[name];
		}
		return styleSheet;
	}
};
