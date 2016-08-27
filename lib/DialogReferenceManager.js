'use strict';

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

export default Object.freeze(new DialogReferenceManager())
