'use strict';

import { Platform, Dimensions, PixelRatio, StyleSheet } from 'react-native';

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

export default styles
