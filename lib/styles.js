export default (dimensions, platform, pixelRatio) => {
	const screen = {
		pixel: 1 / pixelRatio.get(),
		...dimensions.get('window'),
		isIOS: platform.OS === 'ios'
	};

	return {
		popupContainer: {
			position: 'absolute',
			top: 0,
			left: 0,
			justifyContent: 'center',
			alignItems: 'center',
			width: screen.width,
			height: screen.height,
			overflow: 'hidden',
			backgroundColor: 'rgba(00, 00, 00, 0)',
		},
		overlay: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: screen.width,
			height: screen.height,
			backgroundColor: '#000',
			opacity: .5,
		},
		tipBoxView: {
			backgroundColor: '#fff',
			justifyContent: 'center',
			alignItems: 'center',
			width: screen.width - 50,
			borderRadius: 12,
			overflow: 'hidden',
		},
		tipBox: {
			paddingTop: 15,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		tipTitleBox: {
			height: 30,
			width: screen.width - 50,
			justifyContent: 'center',
			alignItems: 'center',
		},
		tipTitle: {
			fontSize: screen.isIOS ? 20 : 19,
			fontWeight: '500',
			textAlign: 'center',
			color: 'black'
		},
		tipContentBox: {
			flexDirection: 'column',
			marginBottom: 15,
			marginTop: 10,
			justifyContent: 'center',
			alignItems: 'center',
		},
		tipContent: {
			fontSize: 16,
			margin: 5,
			marginTop: screen.isIOS ? 3 : 5,
			marginBottom: screen.isIOS ? 7 : 5,
			textAlign: 'center',
			color: 'black'
		},
		line: {
			height: screen.pixel,
			width: screen.width - 50,
			backgroundColor: '#ddd',
		},
		btnBox: {
			width: screen.width - 50,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			height: 50,
		},
		btnBoxMulti: {
			width: screen.width - 50,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			height: 'auto',
		},
		btnTextBox: {
			flexGrow: 1,
			height: 50,
			justifyContent: 'center',
			alignItems: 'center',
		},
		btnTextBoxMulti: {
			flexGrow: 1,
			flexDirection: 'row',
			height: 50,
			justifyContent: 'center',
			alignItems: 'center',
		},
		btnLineVertical: {
			height: 50,
			width: screen.pixel,
			backgroundColor: '#ddd',
		},
		btnLineHorizontal: {
			height: screen.pixel,
			width: '100%',
			backgroundColor: '#ddd',
		},
		btnText: {
			textAlign: 'center',
			fontSize: 16,
			color: '#149be0',
		},
		btnTextTextBoxMulti: {
			flex: 1,
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
	};
};

