[![npm version](https://img.shields.io/npm/v/react-native-dialogbox.svg?style=flat-square)](https://www.npmjs.com/package/react-native-dialogbox)
[![npm downloads](https://img.shields.io/npm/dm/react-native-dialogbox.svg?style=flat-square)](https://www.npmjs.com/package/react-native-dialogbox)
[![Dependencies](https://david-dm.org/victoriafrench/react-native-dialogbox.svg)](https://david-dm.org/victoriafrench/react-native-dialogbox)
[![React-Native](https://img.shields.io/badge/react--native-v0.30%20--%20v0.53-green.svg)]()
[![platforms](https://img.shields.io/badge/platforms-ios%20%7C%20android-blue.svg)]()
# react-native-dialogbox

[![Greenkeeper badge](https://badges.greenkeeper.io/victoriafrench/react-native-dialogbox.svg)](https://greenkeeper.io/)

This is a custom component for React Native, a simple popup, compatible with ios and android.

>This is a forked distro of react-native-popup that adds support for the current versions of react-native, and adds additional features (style overrides, promise support). The originating distro can be found [here](https://github.com/beefe/react-native-popup)

### Demo
![ui](./ui.gif)

[![NPM](https://nodei.co/npm/react-native-dialogbox.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-dialogbox/)

### Props
- <b>isOverlay</b> *bool* - *`default true`*
- <b>isOverlayClickClose</b> *bool* - *`default true`*
- <b>onDismiss</b> *function()* - *`optional callback called when overlay dismisses dialogbox`*
- <b>style</b> *object* - *`optional override for system styles`*

### Methods
- <b>alert</b>(<b>`message`</b>: *string*|*number*, [...]) : *Promise*
```javascript
	e.g.

		this.dialogbox.alert(1);

		this.dialogbox.alert(1, 'two', '10 messages at most');

		this.dialogbox.alert('promise example').then(() => this.dialogbox.alert('dismissed'));

```
- <b>tip</b>({ <b>`title`</b>: *string*, <b>`content`</b>: *string*|*number*|*array*<*string*|*number*> *`isRequired`*, <b>`btn`</b>: {<b>`title`</b>: *string* <b>*`default 'OK'`*</b>, <b>`style`</b>: *object*, <b>`callback`</b>: *function*}, }) : *Promise*
```javascript
	e.g.

		this.dialogbox.tip({
			content: 'come on!',
		});

		this.dialogbox.tip({
			title: 'TipTip',
			content: 'come on!',
		});

		this.dialogbox.tip({
			content: ['come on!', 'go!'],
			btn: {
				text: 'OKOK',
				callback: () => {
					this.dialogbox.alert('over!');
				},
			},
		});

		this.dialogbox.tip({
			content: 'promise example',
			btn: {
				text: 'done'
			}
		}).then(() => (this.dialogbox.alert('done')));

		this.dialogbox.tip({
			content: 'style example',
			style: {
				color: 'red';
			}
		});

```
- <b>confirm</b>({ <b>`title`</b>: *string*, <b>`content`</b>: *string*|*number*|*array*<*string*|*number*> *`isRequired`*, <b>`buttonFlow`</b>: *'auto' | 'row' | 'column'* *`default 'auto'`*, <b>`ok`</b>: {<b>`title`</b>: *string* *`default 'OK'`*, <b>`style`</b>: *object*, <b>`callback`</b>: *function*}, <b>`cancel`</b>: {<b>`title`</b>: *string* *`default 'Cancel'`*, <b>`style`</b>: *object*, <b>`callback`</b>: *function*}, }) : *Promise*
```javascript
	e.g.

		this.dialogbox.confirm({
			content: 'Are you ready?',
		});

		this.dialogbox.confirm({
			content: 'Are you ready?',
			ok: {
				callback: () => {
					this.dialogbox.alert('Very good!');
				},
			},
		});

		this.dialogbox.confirm({
			title: 'title',
			content: ['come on!', 'go!'],
			ok: {
				text: 'Y',
				style: {
					color: 'red'
				},
				callback: () => {
					this.dialogbox.alert('Good!');
				},
			},
			cancel: {
				text: 'N',
				style: {
					color: 'blue'
				},
				callback: () => {
					this.dialogbox.alert('Hurry up！');
				},
			},
		});

		this.dialogbox.confirm({
			title: 'title',
			content: ['come on!', 'go!'],
			ok: {
				text: 'Y',
				style: {
					color: 'red'
				}
			},
			cancel: {
				text: 'N',
				style: {
					color: 'blue'
				}
			},
		}).then((event) => {
			if (event.button) {
				this.dialogbox.alert(`You selected ${event.button.text}`);
			} else {
				this.dialogbox.alert('Dialog cancelled');
			}
		});
```

- <b>pop</b>({ <b>`title`</b>: *string*, <b>`content`</b>: *string*|*number*|*array*<*string*|*number*> *`isRequired`*, <b>`buttonFlow`</b>: *'auto' | 'row' | 'column'* *`default 'auto'`*, <b>`btns`</b>: [{<b>`title`</b>: *string* *`default 'OK'`*, <b>`style`</b>: *object*, <b>`callback`</b>: *function*}] }) : *Promise*
```javascript
	e.g.

		this.dialogbox.pop({
			title: 'Animals',
			content: 'Which animal do you like?',
			btns: [
				{
					text: 'Frog',
					callback: () => {
						this.dialogbox.alert('Ribbit!');
					},
				},
				{
					text: 'Dog',
					callback: () => {
						this.dialogbox.alert('Woof!');
					},
				},
				{
					text: 'Cat',
					callback: () => {
						this.dialogbox.alert('Meow!');
					},
				}
			]
		});

		this.dialogbox.pop({
			title: 'Animals',
			content: 'Which animal do you like?',
			btns: [
				{
					text: 'Frog'
				},
				{
					text: 'Dog'
				},
				{
					text: 'Cat'
				}
			]
		}).then(event => {
			if (event.button) {
				this.dialogbox.alert([
					`You selected ${event.button.text}`, 
					`It was button index ${event.index}`
				]);
			} else {
				this.dialogbox.alert([
					'Dialog was dismissed without selection', 
					'Index for this event is always -1'
				]);
			}
		});

		this.dialogbox.pop({
			title: 'Animals with Stacked Buttons',
			content: 'Which animal do you like?',
			buttonFlow: 'column',
			btns: [
				{
					text: 'Frog'
				},
				{
					text: 'Dog'
				},
				{
					text: 'Cat'
				}
			]
		}).then(event => {
			if (event.button) {
				this.dialogbox.alert([
					`You selected ${event.button.text}`, 
					`It was button index ${event.index}`
				]);
			} else {
				this.dialogbox.alert([
					'Dialog was dismissed without selection', 
					'Index for this event is always -1'
				]);
			}
		});
```

### Usage
#### Step 1 - install

```
	npm install react-native-dialogbox --save
```

#### Step 2 - import and use in project

```javascript
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DialogBox from 'react-native-dialogbox';

export default class App extends Component {

	handleOnPress = () => {
		// alert
		this.dialogbox.alert(1);
	},

	render() {
		return (
			<View style={styles.container}>

				<Text style={styles.btn} onPress={this.handleOnPress}>click me !</Text>

				{/** dialogbox component */}
				<DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/>

			</View>
		);
	},

};
```
